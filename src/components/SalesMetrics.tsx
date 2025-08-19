import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, ShoppingCart, DollarSign, Target } from 'lucide-react'

interface SalesData {
  store: string
  revenue: number
  quantity: number
  averageTicket: number
}

interface SalesMetricsProps {
  data: SalesData[]
  isLoading?: boolean
}

export const SalesMetrics = ({ data, isLoading = false }: SalesMetricsProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-gradient-card shadow-card border-border/50">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0)
  const totalQuantity = data.reduce((sum, item) => sum + item.quantity, 0)
  const averageTicket = totalRevenue / totalQuantity || 0
  const totalStores = data.length

  const metrics = [
    {
      title: 'Receita Total',
      value: totalRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      icon: DollarSign,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Produtos Vendidos',
      value: totalQuantity.toLocaleString('pt-BR'),
      icon: ShoppingCart,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Ticket Médio',
      value: averageTicket.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      icon: TrendingUp,
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Lojas Ativas',
      value: totalStores.toString(),
      icon: Target,
      color: 'text-primary-glow',
      bgColor: 'bg-primary/10'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="bg-gradient-card shadow-card border-border/50 hover:shadow-elevated transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {metric.value}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${metric.bgColor} flex items-center justify-center`}>
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}