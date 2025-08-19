import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'

interface FileUploadProps {
  onFileUpload: (file: File) => void
  isProcessing?: boolean
}

export const FileUpload = ({ onFileUpload, isProcessing = false }: FileUploadProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const { toast } = useToast()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    if (!file.name.toLowerCase().endsWith('.xlsx') && !file.name.toLowerCase().endsWith('.xls')) {
      toast({
        title: "Formato inválido",
        description: "Por favor, selecione um arquivo Excel (.xlsx ou .xls)",
        variant: "destructive"
      })
      return
    }

    setUploadedFile(file)
    setUploadProgress(0)
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          onFileUpload(file)
          toast({
            title: "Upload concluído",
            description: "Arquivo carregado com sucesso!",
            className: "bg-success text-success-foreground"
          })
          return 100
        }
        return prev + 10
      })
    }, 100)

  }, [onFileUpload, toast])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    maxFiles: 1,
    disabled: isProcessing
  })

  return (
    <Card className="bg-gradient-card shadow-card border-border/50">
      <CardContent className="p-6">
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300
            ${isDragActive 
              ? 'border-primary bg-primary/5 shadow-glow' 
              : 'border-border hover:border-primary/50 hover:bg-muted/30'
            }
            ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} />
          
          {!uploadedFile ? (
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {isDragActive ? 'Solte o arquivo aqui' : 'Carregar arquivo Excel'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  Arraste e solte seu arquivo Vendas.xlsx ou clique para selecionar
                </p>
                <Button variant="outline" disabled={isProcessing}>
                  Selecionar Arquivo
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-success rounded-full flex items-center justify-center">
                {uploadProgress === 100 ? (
                  <CheckCircle className="w-8 h-8 text-white" />
                ) : (
                  <FileSpreadsheet className="w-8 h-8 text-white" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {uploadedFile.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
                {uploadProgress < 100 && (
                  <div className="space-y-2">
                    <Progress value={uploadProgress} className="w-full" />
                    <p className="text-sm text-muted-foreground">
                      Carregando... {uploadProgress}%
                    </p>
                  </div>
                )}
                {uploadProgress === 100 && (
                  <div className="flex items-center justify-center gap-2 text-success">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Upload concluído</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Formatos suportados: .xlsx, .xls • Tamanho máximo: 10MB
          </p>
        </div>
      </CardContent>
    </Card>
  )
}