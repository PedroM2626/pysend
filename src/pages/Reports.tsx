import { useState, useEffect } from 'react'
import { SalesMetrics } from '@/components/SalesMetrics'
import { SalesTable } from '@/components/SalesTable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RefreshCw, Download, Calendar, TrendingUp } from 'lucide-react'

interface SalesData {
  store: string
  revenue: number
  quantity: number
  averageTicket: number
}

const Reports = () => {
  const [salesData, setSalesData] = useState<SalesData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  // Mock data simulation
  useEffect(() => {
    const loadMockData = () => {
      setIsLoading(true)
      
      // Simulate loading time
      setTimeout(() => {
        const mockData: SalesData[] = [
          { store: "Loja Centro", revenue: 125000, quantity: 850, averageTicket: 147.06 },
          { store: "Loja Shopping Norte", revenue: 98500, quantity: 720, averageTicket: 136.81 },
          { store: "Loja Zona Sul", revenue: 87300, quantity: 650, averageTicket: 134.31 },
          { store: "Loja Outlet", revenue: 65400, quantity: 480, averageTicket: 136.25 },
          { store: "Loja Online", revenue: 156000, quantity: 1200, averageTicket: 130.00 },
        ]
        
        setSalesData(mockData)
        setLastUpdate(new Date())
        setIsLoading(false)
      }, 1500)
    }

    loadMockData()
  }, [])

  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate refresh with slight data variation
    setTimeout(() => {
      const refreshedData = salesData.map(item => ({
        ...item,
        revenue: item.revenue * (0.95 + Math.random() * 0.1), // ±5% variation
        quantity: Math.floor(item.quantity * (0.95 + Math.random() * 0.1))
      })).map(item => ({
        ...item,
        averageTicket: item.revenue / item.quantity
      }))
      
      setSalesData(refreshedData)
      setLastUpdate(new Date())
      setIsLoading(false)
    }, 1000)
  }

  const handleExport = () => {
    // Mock export functionality
    const csvContent = [
      'Loja;Receita;Quantidade;Ticket Médio',
      ...salesData.map(item => 
        `${item.store};${item.revenue.toFixed(2)};${item.quantity};${item.averageTicket.toFixed(2)}`
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `relatorio-vendas-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Relatórios de Vendas</h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Última atualização: {lastUpdate.toLocaleString('pt-BR')}
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isLoading}
            className="transition-smooth"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
          
          <Button
            onClick={handleExport}
            disabled={isLoading || salesData.length === 0}
            className="bg-gradient-primary shadow-card hover:shadow-glow transition-smooth"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-card shadow-card border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status do Sistema</p>
                <Badge className="bg-success/10 text-success border-success/20 mt-2">
                  Operacional
                </Badge>
              </div>
              <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Processamentos Hoje</p>
                <p className="text-2xl font-bold text-foreground mt-1">12</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Emails Enviados</p>
                <p className="text-2xl font-bold text-foreground mt-1">47</p>
              </div>
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                <RefreshCw className="w-4 h-4 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Metrics Cards */}
      <SalesMetrics data={salesData} isLoading={isLoading} />

      {/* Data Table */}
      <SalesTable data={salesData} isLoading={isLoading} />

      {/* Empty State */}
      {!isLoading && salesData.length === 0 && (
        <Card className="bg-gradient-card shadow-card border-border/50">
          <CardContent className="p-12 text-center">
            <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nenhum dado disponível
            </h3>
            <p className="text-muted-foreground mb-6">
              Faça upload de um arquivo Excel na seção "Upload" para visualizar os relatórios
            </p>
            <Button variant="outline" onClick={() => window.location.href = '/upload'}>
              Ir para Upload
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default Reports