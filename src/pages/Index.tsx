import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  FileSpreadsheet, 
  Mail, 
  TrendingUp, 
  Users, 
  Upload,
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react'
import dashboardHero from '@/assets/dashboard-hero.jpg'

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const quickStats = [
    {
      title: 'Relatórios Processados',
      value: '1,247',
      change: '+12%',
      icon: FileSpreadsheet,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Emails Enviados',
      value: '2,891',
      change: '+8%',
      icon: Mail,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Taxa de Sucesso',
      value: '98.5%',
      change: '+0.2%',
      icon: TrendingUp,
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Usuários Ativos',
      value: '156',
      change: '+15%',
      icon: Users,
      color: 'text-primary-glow',
      bgColor: 'bg-primary/10'
    }
  ]

  const recentActivity = [
    {
      type: 'success',
      title: 'Relatório de Vendas processado',
      description: 'Arquivo: vendas_dezembro_2024.xlsx',
      time: '2 min atrás',
      icon: CheckCircle
    },
    {
      type: 'processing',
      title: 'Processando novo arquivo',
      description: 'Arquivo: vendas_janeiro_2025.xlsx',
      time: '5 min atrás',
      icon: Clock
    },
    {
      type: 'success',
      title: 'Email enviado com sucesso',
      description: 'Para: contato.pedromoratolahoz@gmail.com',
      time: '8 min atrás',
      icon: Mail
    },
    {
      type: 'warning',
      title: 'Arquivo com formato incorreto',
      description: 'Arquivo: dados.csv rejeitado',
      time: '15 min atrás',
      icon: AlertCircle
    }
  ]

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-success'
      case 'processing': return 'text-primary'
      case 'warning': return 'text-destructive'
      default: return 'text-muted-foreground'
    }
  }

  const getActivityBg = (type: string) => {
    switch (type) {
      case 'success': return 'bg-success/10'
      case 'processing': return 'bg-primary/10'
      case 'warning': return 'bg-destructive/10'
      default: return 'bg-muted/10'
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="relative bg-gradient-primary text-white rounded-lg overflow-hidden shadow-elevated">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={dashboardHero} 
            alt="Dashboard automation" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Bem-vindo ao Pysend</h1>
              <p className="text-white/90 text-lg">
                Sistema inteligente de automação de relatórios de vendas
              </p>
              <p className="text-white/70 text-sm mt-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {currentTime.toLocaleString('pt-BR')}
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="secondary" 
                className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm"
                onClick={() => window.location.href = '/upload'}
              >
                <Upload className="w-4 h-4 mr-2" />
                Novo Upload
              </Button>
              <Button 
                variant="secondary" 
                className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm"
                onClick={() => window.location.href = '/reports'}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Ver Relatórios
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="bg-gradient-card shadow-card border-border/50 hover:shadow-elevated transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-3 h-3 text-success" />
                    <span className="text-xs text-success font-medium">
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card className="bg-gradient-card shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-md flex items-center justify-center">
                <FileSpreadsheet className="w-4 h-4 text-white" />
              </div>
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full justify-start bg-gradient-primary shadow-card hover:shadow-glow transition-smooth"
              onClick={() => window.location.href = '/upload'}
            >
              <Upload className="w-4 h-4 mr-3" />
              Processar Novo Arquivo Excel
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start transition-smooth hover:bg-muted/50"
              onClick={() => window.location.href = '/reports'}
            >
              <BarChart3 className="w-4 h-4 mr-3" />
              Visualizar Relatórios
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start transition-smooth hover:bg-muted/50"
              onClick={() => window.location.href = '/settings'}
            >
              <Mail className="w-4 h-4 mr-3" />
              Configurar Email
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gradient-card shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-md flex items-center justify-center">
                <Clock className="w-4 h-4 text-white" />
              </div>
              Atividade Recente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg">
                <div className={`w-8 h-8 rounded-full ${getActivityBg(activity.type)} flex items-center justify-center flex-shrink-0`}>
                  <activity.icon className={`w-4 h-4 ${getActivityColor(activity.type)}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {activity.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                <Badge className="bg-success/10 text-success border-success/20">
                  Online
                </Badge>
              </div>
              <p className="text-sm font-medium text-foreground">Servidor Principal</p>
            </div>
            
            <div className="text-center p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <Badge className="bg-success/10 text-success border-success/20">
                  Conectado
                </Badge>
              </div>
              <p className="text-sm font-medium text-foreground">Email SMTP</p>
            </div>
            
            <div className="text-center p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <Badge className="bg-success/10 text-success border-success/20">
                  Ativo
                </Badge>
              </div>
              <p className="text-sm font-medium text-foreground">Processamento</p>
            </div>
            
            <div className="text-center p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <Badge className="bg-success/10 text-success border-success/20">
                  Funcionando
                </Badge>
              </div>
              <p className="text-sm font-medium text-foreground">Backup</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
};

export default Index;
