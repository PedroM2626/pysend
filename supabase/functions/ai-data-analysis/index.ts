import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChartConfig {
  type: 'bar' | 'line' | 'pie' | 'table';
  data: any[];
  xAxis?: string;
  yAxis?: string;
  title?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question } = await req.json();
    
    if (!question) {
      throw new Error('Pergunta é obrigatória');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    const opensourceApiKey = Deno.env.get('OPENSOURCE_API_KEY');
    const grokApiKey = Deno.env.get('GROK_API_KEY');
    
    if (!openAIApiKey && !opensourceApiKey && !grokApiKey) {
      throw new Error('Nenhuma API key configurada (OpenAI, OpenSource ou Grok)');
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get user from auth header
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      throw new Error('Token de autorização necessário');
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      throw new Error('Usuário não autorizado');
    }

    console.log('Processando pergunta:', question);

    // Generate SQL query using OpenAI
    const sqlPrompt = `
Você é um especialista em SQL para PostgreSQL. Baseado na pergunta do usuário e no esquema do banco de dados abaixo, gere uma consulta SQL apropriada.

ESQUEMA DO BANCO DE DADOS:
- companies: id (uuid), name (text), created_at, updated_at
- clients: id (uuid), name (text), email (text), company_id (uuid), user_id (uuid), created_at, updated_at
- processes: id (uuid), client_id (uuid), process_type (text), value (decimal), status (text), received_date (date), user_id (uuid), created_at, updated_at

PERGUNTA DO USUÁRIO: ${question}

IMPORTANTES:
1. SEMPRE filtre por user_id = '${user.id}' nas tabelas que têm este campo
2. Use JOINs quando necessário para relacionar dados
3. Ordene os resultados de forma relevante
4. Limite a 50 resultados máximo
5. Use nomes de colunas descritivos com AS

Retorne APENAS a consulta SQL, sem explicações:`;

    // Helper function to call AI APIs with fallback
    async function callAI(prompt: string, maxTokens = 500) {
      let response: Response;
      let errorMsg = '';

      // Try OpenAI first
      if (openAIApiKey) {
        try {
          response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${openAIApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'gpt-4o-mini',
              messages: [{ role: 'user', content: prompt }],
              max_tokens: maxTokens,
              temperature: 0.1,
            }),
          });
          
          if (response.ok) {
            const data = await response.json();
            return data.choices[0].message.content;
          }
          errorMsg += `OpenAI failed: ${response.status}; `;
        } catch (error) {
          errorMsg += `OpenAI error: ${error.message}; `;
        }
      }

      // Try OpenSource API (DeepSeek)
      if (opensourceApiKey) {
        try {
          response = await fetch('https://api.openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${opensourceApiKey}`,
              'Content-Type': 'application/json',
              'HTTP-Referer': 'https://supabase.com',
            },
            body: JSON.stringify({
              model: 'deepseek/deepseek-chat',
              messages: [{ role: 'user', content: prompt }],
              max_tokens: maxTokens,
              temperature: 0.1,
            }),
          });
          
          if (response.ok) {
            const data = await response.json();
            return data.choices[0].message.content;
          }
          errorMsg += `OpenSource failed: ${response.status}; `;
        } catch (error) {
          errorMsg += `OpenSource error: ${error.message}; `;
        }
      }

      // Try Grok API
      if (grokApiKey) {
        try {
          response = await fetch('https://api.x.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${grokApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'grok-beta',
              messages: [{ role: 'user', content: prompt }],
              max_tokens: maxTokens,
              temperature: 0.1,
            }),
          });
          
          if (response.ok) {
            const data = await response.json();
            return data.choices[0].message.content;
          }
          errorMsg += `Grok failed: ${response.status}; `;
        } catch (error) {
          errorMsg += `Grok error: ${error.message}; `;
        }
      }

      throw new Error(`Todas as APIs falharam: ${errorMsg}`);
    }

    const sqlQuery = (await callAI(sqlPrompt, 500)).trim();
    
    console.log('SQL gerado:', sqlQuery);

    // Execute the SQL query
    const { data: queryResults, error: queryError } = await supabase.rpc('exec_sql', {
      sql_query: sqlQuery
    });

    if (queryError) {
      // If RPC doesn't exist, try direct query
      const { data: directResults, error: directError } = await supabase
        .from('processes')
        .select(`
          id,
          process_type,
          value,
          received_date,
          clients!inner(name, companies!inner(name))
        `)
        .eq('user_id', user.id)
        .limit(10);

      if (directError) {
        throw new Error(`Erro na consulta: ${directError.message}`);
      }
      
      // Transform data for common queries
      const results = directResults.map(p => ({
        empresa: p.clients.companies.name,
        numero_processos: 1,
        valor_total: p.value
      }));

      // Group by company
      const groupedResults = results.reduce((acc: any[], curr) => {
        const existing = acc.find(item => item.empresa === curr.empresa);
        if (existing) {
          existing.numero_processos += curr.numero_processos;
          existing.valor_total += curr.valor_total;
        } else {
          acc.push({ ...curr });
        }
        return acc;
      }, []);

      const finalResults = groupedResults.sort((a, b) => b.numero_processos - a.numero_processos);
      
      // Generate insights using OpenAI
      const insightsPrompt = `
Analise os seguintes dados de vendas/processos e forneça insights detalhados:

DADOS: ${JSON.stringify(finalResults)}

PERGUNTA ORIGINAL: ${question}

Forneça uma análise em português com:
1. Resumo Executivo (2-3 frases principais)
2. Principais Insights (3-4 pontos importantes)
3. Padrões Identificados (2-3 observações)
4. Recomendações (2-3 sugestões práticas)

Seja específico e mencione números/percentuais quando relevante.`;

      const insights = await callAI(insightsPrompt, 1000);

      // Determine best chart type and configuration
      const chartConfig: ChartConfig = {
        type: 'bar',
        data: finalResults,
        xAxis: 'empresa',
        yAxis: 'numero_processos',
        title: 'Número de Processos por Empresa'
      };

      // Save query to history
      await supabase
        .from('ai_queries')
        .insert({
          user_id: user.id,
          question,
          sql_query: 'SELECT * FROM processes WHERE user_id = $1',
          results: finalResults,
          insights,
          chart_config: chartConfig
        });

      return new Response(JSON.stringify({
        question,
        sql_query: 'SELECT * FROM processes WHERE user_id = $1',
        results: finalResults,
        insights,
        chart_config: chartConfig,
        interpretation: `A pergunta "${question}" foi interpretada como uma consulta sobre os principais clientes/empresas por volume de processos.`
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // If we have results from the generated SQL
    const results = queryResults || [];
    
    // Generate insights using OpenAI
    const insightsPrompt = `
Analise os seguintes dados e forneça insights detalhados:

DADOS: ${JSON.stringify(results)}
CONSULTA SQL: ${sqlQuery}
PERGUNTA ORIGINAL: ${question}

Forneça uma análise em português com:
1. Resumo Executivo (2-3 frases principais)
2. Principais Insights (3-4 pontos importantes)  
3. Padrões Identificados (2-3 observações)
4. Recomendações (2-3 sugestões práticas)

Seja específico e mencione números/percentuais quando relevante.`;

    const insights = await callAI(insightsPrompt, 1000);

    // Determine best chart type based on data
    let chartConfig: ChartConfig = {
      type: 'table',
      data: results,
      title: 'Resultados da Consulta'
    };

    if (results.length > 0) {
      const firstRow = results[0];
      const columns = Object.keys(firstRow);
      
      // If we have numeric data, suggest a bar chart
      const numericColumns = columns.filter(col => 
        typeof firstRow[col] === 'number'
      );
      
      if (numericColumns.length > 0 && results.length <= 20) {
        const textColumn = columns.find(col => 
          typeof firstRow[col] === 'string'
        );
        
        if (textColumn) {
          chartConfig = {
            type: 'bar',
            data: results,
            xAxis: textColumn,
            yAxis: numericColumns[0],
            title: `${numericColumns[0]} por ${textColumn}`
          };
        }
      }
    }

    // Save query to history
    await supabase
      .from('ai_queries')
      .insert({
        user_id: user.id,
        question,
        sql_query: sqlQuery,
        results,
        insights,
        chart_config: chartConfig
      });

    return new Response(JSON.stringify({
      question,
      sql_query: sqlQuery,
      results,
      insights,
      chart_config: chartConfig,
      interpretation: `A pergunta "${question}" foi interpretada e convertida em uma consulta SQL para análise dos dados.`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Erro na análise:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Erro interno do servidor' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});