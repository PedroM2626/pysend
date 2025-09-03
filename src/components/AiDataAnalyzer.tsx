import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, Brain, BarChart3, Database, Code2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface AnalysisResult {
  question: string;
  sql_query: string;
  results: any[];
  insights: string;
  chart_config: {
    type: 'bar' | 'line' | 'pie' | 'table';
    data: any[];
    xAxis?: string;
    yAxis?: string;
    title?: string;
  };
  interpretation: string;
}

const AiDataAnalyzer = () => {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!question.trim()) {
      toast({
        title: "Pergunta necessária",
        description: "Por favor, digite uma pergunta sobre seus dados",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-data-analysis', {
        body: { question: question.trim() }
      });

      if (error) throw error;

      setResult(data);
      toast({
        title: "Análise concluída",
        description: "IA analisou seus dados com sucesso",
      });
    } catch (error: any) {
      console.error('Erro na análise:', error);
      toast({
        title: "Erro na análise",
        description: error.message || "Falha ao analisar os dados",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderChart = () => {
    if (!result?.chart_config) return null;

    const { chart_config } = result;
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444'];

    switch (chart_config.type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chart_config.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey={chart_config.xAxis} 
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey={chart_config.yAxis} fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chart_config.data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => entry.name}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chart_config.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      
      case 'table':
      default:
        if (!chart_config.data.length) {
          return <div className="text-center py-8 text-muted-foreground">Nenhum dado encontrado</div>;
        }
        
        const columns = Object.keys(chart_config.data[0]);
        return (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  {columns.map((col) => (
                    <th key={col} className="border border-border p-2 text-left font-semibold">
                      {col.toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chart_config.data.map((row, idx) => (
                  <tr key={idx} className="hover:bg-muted/50">
                    {columns.map((col) => (
                      <td key={col} className="border border-border p-2">
                        {typeof row[col] === 'number' 
                          ? row[col].toLocaleString('pt-BR')
                          : row[col]
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
    }
  };

  const parseInsights = (insights: string) => {
    const sections = insights.split(/\d+\.\s+/).filter(section => section.trim());
    return sections.map((section, index) => {
      const [title, ...content] = section.split(':');
      return {
        title: title.trim(),
        content: content.join(':').trim()
      };
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Faça sua Pergunta
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Ex: Quais são os 10 clientes mais ativos de 2025?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={3}
          />
          <Button 
            onClick={handleAnalyze} 
            disabled={loading || !question.trim()}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analisando...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                Consultar e Analisar
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Resultados e Análises
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="analysis" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="analysis" className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  Análise
                </TabsTrigger>
                <TabsTrigger value="chart" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Gráfico
                </TabsTrigger>
                <TabsTrigger value="technical" className="flex items-center gap-2">
                  <Code2 className="h-4 w-4" />
                  Técnico
                </TabsTrigger>
              </TabsList>

              <TabsContent value="analysis" className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary mb-2">Análise Inteligente dos Dados</h3>
                  <div className="space-y-3">
                    {parseInsights(result.insights).map((section, index) => (
                      <div key={index}>
                        <Badge variant="secondary" className="mb-2">
                          {section.title}
                        </Badge>
                        <p className="text-sm text-foreground leading-relaxed">
                          {section.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="chart" className="space-y-4">
                <div className="space-y-4">
                  <h3 className="font-semibold">
                    {result.chart_config.title || 'Visualização dos Dados'}
                  </h3>
                  {renderChart()}
                  
                  {result.results.length > 0 && (
                    <div className="text-sm text-muted-foreground text-center">
                      {result.results.length} registro(s) encontrado(s)
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="technical" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      Como interpretei sua pergunta:
                    </h4>
                    <p className="text-sm bg-muted p-3 rounded">
                      {result.interpretation}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Code2 className="h-4 w-4" />
                      Consulta SQL gerada:
                    </h4>
                    <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                      {result.sql_query}
                    </pre>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Explicação técnica:</h4>
                    <p className="text-sm text-muted-foreground">
                      Esta consulta junta as tabelas 'cliente' e 'processo' usando a chave estrangeira 'empresa' 
                      para contar o número de processos associados a cada cliente em 2025. A cláusula 
                      'WHERE YEAR(p.dt_recebimento) = 2025' filtra os processos para incluir apenas aqueles 
                      recebidos em 2025. A função 'COUNT(p.id)' conta o número de processos para cada cliente. 
                      'GROUP BY c.empresa' agrupa os resultados por empresa. 'ORDER BY numero_processos DESC' 
                      ordena os resultados em ordem decrescente pelo número de processos. 'LIMIT 10' limita 
                      os resultados aos 10 clientes com mais processos.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AiDataAnalyzer;