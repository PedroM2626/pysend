import { useState } from 'react'
import { FileUpload } from '@/components/FileUpload'
import { EmailConfig, EmailConfig as EmailConfigType } from '@/components/EmailConfig'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { CheckCircle, Send, FileSpreadsheet, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const Upload = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [emailConfig, setEmailConfig] = useState<EmailConfigType | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStep, setProcessingStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const { toast } = useToast()

  const processingSteps = [
    'Carregando arquivo Excel...',
    'Processando dados de vendas...',
    'Calculando métricas...',
    'Gerando relatório...',
    'Enviando email...',
    'Concluído!'
  ]

  const handleFileUpload = (file: File) => {
    setUploadedFile(file)
    toast({
      title: "Arquivo carregado",
      description: `${file.name} foi carregado com sucesso`,
      className: "bg-success text-success-foreground"
    })
  }

  const handleConfigSave = (config: EmailConfigType) => {
    setEmailConfig(config)
  }

  const handleProcessReport = async () => {
    if (!uploadedFile || !emailConfig) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, carregue um arquivo e configure o email",
        variant: "destructive"
      })
      return
    }

    setIsProcessing(true)
    setProcessingStep(0)
    setIsComplete(false)

    // Simulate processing steps
    for (let i = 0; i < processingSteps.length; i++) {
      setProcessingStep(i)
      await new Promise(resolve => setTimeout(resolve, 1500))
    }

    setIsComplete(true)
    setIsProcessing(false)
    
    toast({
      title: "Relatório processado!",
      description: `Email enviado para ${emailConfig.toEmail}`,
      className: "bg-success text-success-foreground"
    })
  }

  const canProcess = uploadedFile && emailConfig && !isProcessing

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Upload de Arquivo</h1>
        <p className="text-muted-foreground">
          Carregue seu arquivo Excel e configure as opções de email para gerar o relatório automaticamente
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <FileUpload 
            onFileUpload={handleFileUpload}
            isProcessing={isProcessing}
          />
          
          <EmailConfig 
            onConfigSave={handleConfigSave}
            isProcessing={isProcessing}
          />
        </div>

        <div className="space-y-6">
          {/* Process Status Card */}
          <Card className="bg-gradient-card shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-md flex items-center justify-center">
                  <FileSpreadsheet className="w-4 h-4 text-white" />
                </div>
                Status do Processamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Arquivo Excel</span>
                  <div className="flex items-center gap-2">
                    {uploadedFile ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span className="text-success font-medium">Carregado</span>
                      </>
                    ) : (
                      <span className="text-muted-foreground">Pendente</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Configuração Email</span>
                  <div className="flex items-center gap-2">
                    {emailConfig ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span className="text-success font-medium">Configurado</span>
                      </>
                    ) : (
                      <span className="text-muted-foreground">Pendente</span>
                    )}
                  </div>
                </div>
              </div>

              {isProcessing && (
                <div className="space-y-3 pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span className="text-sm font-medium">
                      {processingSteps[processingStep]}
                    </span>
                  </div>
                  <Progress 
                    value={(processingStep / (processingSteps.length - 1)) * 100} 
                    className="w-full"
                  />
                </div>
              )}

              {isComplete && (
                <div className="pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2 text-success">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Relatório enviado com sucesso!</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    O email foi enviado para {emailConfig?.toEmail}
                  </p>
                </div>
              )}

              <Button
                onClick={handleProcessReport}
                disabled={!canProcess}
                className="w-full bg-gradient-primary shadow-card hover:shadow-glow transition-smooth mt-4"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Processar e Enviar Relatório
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* File Info Card */}
          {uploadedFile && (
            <Card className="bg-gradient-card shadow-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Arquivo Selecionado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Nome:</span>
                    <span className="text-sm font-medium">{uploadedFile.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Tamanho:</span>
                    <span className="text-sm font-medium">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Tipo:</span>
                    <span className="text-sm font-medium">Excel Spreadsheet</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default Upload