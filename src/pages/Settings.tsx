import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { 
  Settings as SettingsIcon, 
  Mail, 
  Bell, 
  Shield, 
  Database, 
  Palette,
  Save,
  RotateCcw,
  CheckCircle
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const Settings = () => {
  const [settings, setSettings] = useState({
    // Email Settings
    smtpServer: 'smtp.outlook.com',
    smtpPort: '587',
    defaultSender: 'sistema@empresa.com',
    emailTimeout: '30',
    
    // Notification Settings
    enableNotifications: true,
    notifyOnSuccess: true,
    notifyOnError: true,
    emailReports: false,
    
    // Processing Settings
    autoProcess: false,
    backupFiles: true,
    retryAttempts: '3',
    maxFileSize: '50',
    
    // Security Settings
    requireAuth: false,
    sessionTimeout: '60',
    enableLogging: true,
    logLevel: 'info'
  })

  const [hasChanges, setHasChanges] = useState(false)
  const { toast } = useToast()

  const updateSetting = (key: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const handleSave = () => {
    // Simulate save operation
    setTimeout(() => {
      setHasChanges(false)
      toast({
        title: "Configurações salvas",
        description: "Todas as configurações foram atualizadas com sucesso",
        className: "bg-success text-success-foreground"
      })
    }, 500)
  }

  const handleReset = () => {
    // Reset to default values
    setSettings({
      smtpServer: 'smtp.outlook.com',
      smtpPort: '587',
      defaultSender: 'sistema@empresa.com',
      emailTimeout: '30',
      enableNotifications: true,
      notifyOnSuccess: true,
      notifyOnError: true,
      emailReports: false,
      autoProcess: false,
      backupFiles: true,
      retryAttempts: '3',
      maxFileSize: '50',
      requireAuth: false,
      sessionTimeout: '60',
      enableLogging: true,
      logLevel: 'info'
    })
    setHasChanges(true)
    toast({
      title: "Configurações redefinidas",
      description: "Todas as configurações foram restauradas para os valores padrão",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie as configurações do sistema de automação de relatórios
          </p>
        </div>
        
        {hasChanges && (
          <Badge className="bg-accent/10 text-accent border-accent/20">
            Alterações pendentes
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Configuration */}
        <Card className="bg-gradient-card shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-md flex items-center justify-center">
                <Mail className="w-4 h-4 text-white" />
              </div>
              Configurações de Email
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtpServer">Servidor SMTP</Label>
                <Input
                  id="smtpServer"
                  value={settings.smtpServer}
                  onChange={(e) => updateSetting('smtpServer', e.target.value)}
                  placeholder="smtp.gmail.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtpPort">Porta</Label>
                <Input
                  id="smtpPort"
                  value={settings.smtpPort}
                  onChange={(e) => updateSetting('smtpPort', e.target.value)}
                  placeholder="587"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="defaultSender">Email Padrão do Remetente</Label>
              <Input
                id="defaultSender"
                type="email"
                value={settings.defaultSender}
                onChange={(e) => updateSetting('defaultSender', e.target.value)}
                placeholder="sistema@empresa.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="emailTimeout">Timeout (segundos)</Label>
              <Input
                id="emailTimeout"
                type="number"
                value={settings.emailTimeout}
                onChange={(e) => updateSetting('emailTimeout', e.target.value)}
                placeholder="30"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-gradient-card shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-md flex items-center justify-center">
                <Bell className="w-4 h-4 text-white" />
              </div>
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Habilitar Notificações</Label>
                <p className="text-xs text-muted-foreground">Receber alertas do sistema</p>
              </div>
              <Switch
                checked={settings.enableNotifications}
                onCheckedChange={(value) => updateSetting('enableNotifications', value)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Notificar Sucessos</Label>
                <p className="text-xs text-muted-foreground">Alerta para operações bem-sucedidas</p>
              </div>
              <Switch
                checked={settings.notifyOnSuccess}
                onCheckedChange={(value) => updateSetting('notifyOnSuccess', value)}
                disabled={!settings.enableNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Notificar Erros</Label>
                <p className="text-xs text-muted-foreground">Alerta para falhas no sistema</p>
              </div>
              <Switch
                checked={settings.notifyOnError}
                onCheckedChange={(value) => updateSetting('notifyOnError', value)}
                disabled={!settings.enableNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Relatórios por Email</Label>
                <p className="text-xs text-muted-foreground">Enviar resumos semanais</p>
              </div>
              <Switch
                checked={settings.emailReports}
                onCheckedChange={(value) => updateSetting('emailReports', value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Processing Settings */}
        <Card className="bg-gradient-card shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-md flex items-center justify-center">
                <Database className="w-4 h-4 text-white" />
              </div>
              Processamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Processamento Automático</Label>
                <p className="text-xs text-muted-foreground">Processar arquivos automaticamente</p>
              </div>
              <Switch
                checked={settings.autoProcess}
                onCheckedChange={(value) => updateSetting('autoProcess', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Backup de Arquivos</Label>
                <p className="text-xs text-muted-foreground">Manter cópia dos arquivos processados</p>
              </div>
              <Switch
                checked={settings.backupFiles}
                onCheckedChange={(value) => updateSetting('backupFiles', value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="retryAttempts">Tentativas de Reenvio</Label>
                <Input
                  id="retryAttempts"
                  type="number"
                  value={settings.retryAttempts}
                  onChange={(e) => updateSetting('retryAttempts', e.target.value)}
                  min="1"
                  max="10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxFileSize">Tamanho Máximo (MB)</Label>
                <Input
                  id="maxFileSize"
                  type="number"
                  value={settings.maxFileSize}
                  onChange={(e) => updateSetting('maxFileSize', e.target.value)}
                  min="1"
                  max="100"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-gradient-card shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-md flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              Segurança
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Requer Autenticação</Label>
                <p className="text-xs text-muted-foreground">Login obrigatório para acesso</p>
              </div>
              <Switch
                checked={settings.requireAuth}
                onCheckedChange={(value) => updateSetting('requireAuth', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Habilitar Logs</Label>
                <p className="text-xs text-muted-foreground">Registrar atividades do sistema</p>
              </div>
              <Switch
                checked={settings.enableLogging}
                onCheckedChange={(value) => updateSetting('enableLogging', value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Timeout de Sessão (min)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => updateSetting('sessionTimeout', e.target.value)}
                min="15"
                max="480"
                disabled={!settings.requireAuth}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card className="bg-gradient-card shadow-card border-border/50">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="text-center sm:text-left">
              <h3 className="font-semibold text-foreground mb-1">Salvar Configurações</h3>
              <p className="text-sm text-muted-foreground">
                As alterações serão aplicadas imediatamente após salvar
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleReset}
                className="transition-smooth"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Redefinir
              </Button>
              
              <Button
                onClick={handleSave}
                disabled={!hasChanges}
                className="bg-gradient-primary shadow-card hover:shadow-glow transition-smooth"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card className="bg-gradient-card shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-8 h-8 bg-success rounded-md flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            Status do Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-success/5 rounded-lg border border-success/20">
              <div className="w-3 h-3 bg-success rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium text-success">Servidor Online</p>
            </div>
            
            <div className="text-center p-4 bg-success/5 rounded-lg border border-success/20">
              <div className="w-3 h-3 bg-success rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium text-success">Email Configurado</p>
            </div>
            
            <div className="text-center p-4 bg-success/5 rounded-lg border border-success/20">
              <div className="w-3 h-3 bg-success rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium text-success">Backup Ativo</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Settings