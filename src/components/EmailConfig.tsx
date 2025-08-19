import { useState } from 'react'
import { Mail, User, Send, Settings } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'

interface EmailConfigProps {
  onConfigSave: (config: EmailConfig) => void
  initialConfig?: EmailConfig
  isProcessing?: boolean
}

export interface EmailConfig {
  toEmail: string
  fromName: string
  subject: string
  customMessage: string
  includeCharts: boolean
  autoSend: boolean
}

export const EmailConfig = ({ onConfigSave, initialConfig, isProcessing = false }: EmailConfigProps) => {
  const [config, setConfig] = useState<EmailConfig>(initialConfig || {
    toEmail: 'contato.pedromoratolahoz@gmail.com',
    fromName: 'Sistema Pysend',
    subject: 'Relatório de Vendas - {date}',
    customMessage: 'Segue em anexo o relatório de vendas processado automaticamente pelo sistema.',
    includeCharts: true,
    autoSend: false
  })

  const { toast } = useToast()

  const handleSave = () => {
    if (!config.toEmail || !config.subject) {
      toast({
        title: "Campos obrigatórios",
        description: "Email destinatário e assunto são obrigatórios",
        variant: "destructive"
      })
      return
    }

    if (!config.toEmail.includes('@')) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um email válido",
        variant: "destructive"
      })
      return
    }

    onConfigSave(config)
    toast({
      title: "Configurações salvas",
      description: "As configurações de email foram atualizadas com sucesso",
      className: "bg-success text-success-foreground"
    })
  }

  const updateConfig = (field: keyof EmailConfig, value: string | boolean) => {
    setConfig(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="bg-gradient-card shadow-card border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-md flex items-center justify-center">
            <Mail className="w-4 h-4 text-white" />
          </div>
          Configurações de Email
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="toEmail" className="text-sm font-medium">
              Email Destinatário *
            </Label>
            <Input
              id="toEmail"
              type="email"
              value={config.toEmail}
              onChange={(e) => updateConfig('toEmail', e.target.value)}
              placeholder="usuario@empresa.com"
              className="transition-smooth focus:shadow-glow"
              disabled={isProcessing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fromName" className="text-sm font-medium">
              Nome do Remetente
            </Label>
            <Input
              id="fromName"
              value={config.fromName}
              onChange={(e) => updateConfig('fromName', e.target.value)}
              placeholder="Sistema de Relatórios"
              className="transition-smooth"
              disabled={isProcessing}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject" className="text-sm font-medium">
            Assunto do Email *
          </Label>
          <Input
            id="subject"
            value={config.subject}
            onChange={(e) => updateConfig('subject', e.target.value)}
            placeholder="Relatório de Vendas - {date}"
            className="transition-smooth focus:shadow-glow"
            disabled={isProcessing}
          />
          <p className="text-xs text-muted-foreground">
            Use {'{date}'} para inserir a data atual automaticamente
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="customMessage" className="text-sm font-medium">
            Mensagem Personalizada
          </Label>
          <Textarea
            id="customMessage"
            value={config.customMessage}
            onChange={(e) => updateConfig('customMessage', e.target.value)}
            placeholder="Adicione uma mensagem personalizada para o email..."
            rows={4}
            className="transition-smooth resize-none"
            disabled={isProcessing}
          />
        </div>

        <div className="space-y-4 pt-4 border-t border-border/50">
          <h4 className="text-sm font-medium text-foreground">Opções Avançadas</h4>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-sm font-medium">Incluir Gráficos</Label>
              <p className="text-xs text-muted-foreground">
                Adicionar gráficos visuais ao relatório
              </p>
            </div>
            <Switch
              checked={config.includeCharts}
              onCheckedChange={(value) => updateConfig('includeCharts', value)}
              disabled={isProcessing}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-sm font-medium">Envio Automático</Label>
              <p className="text-xs text-muted-foreground">
                Enviar automaticamente após processamento
              </p>
            </div>
            <Switch
              checked={config.autoSend}
              onCheckedChange={(value) => updateConfig('autoSend', value)}
              disabled={isProcessing}
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button 
            onClick={handleSave}
            className="flex-1 bg-gradient-primary shadow-card hover:shadow-glow transition-smooth"
            disabled={isProcessing}
          >
            <Settings className="w-4 h-4 mr-2" />
            Salvar Configurações
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}