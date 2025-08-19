import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Store, TrendingUp, TrendingDown } from 'lucide-react'

interface SalesData {
  store: string
  revenue: number
  quantity: number
  averageTicket: number
}

interface SalesTableProps {
  data: SalesData[]
  isLoading?: boolean
}

export const SalesTable = ({ data, isLoading = false }: SalesTableProps) => {
  if (isLoading) {
    return (
      <Card className="bg-gradient-card shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-md flex items-center justify-center">
              <Store className="w-4 h-4 text-white" />
            </div>
            Dados por Loja
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse flex space-x-4 p-4 bg-muted/30 rounded-lg">
                <div className="h-4 bg-muted rounded w-1/4"></div>
                <div className="h-4 bg-muted rounded w-1/4"></div>
                <div className="h-4 bg-muted rounded w-1/4"></div>
                <div className="h-4 bg-muted rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Sort data by revenue (descending)
  const sortedData = [...data].sort((a, b) => b.revenue - a.revenue)
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0)

  const getPerformanceBadge = (revenue: number) => {
    const percentage = (revenue / totalRevenue) * 100
    if (percentage >= 25) {
      return (
        <Badge className="bg-success/10 text-success border-success/20">
          <TrendingUp className="w-3 h-3 mr-1" />
          Alta
        </Badge>
      )
    } else if (percentage >= 15) {
      return (
        <Badge className="bg-accent/10 text-accent border-accent/20">
          Média
        </Badge>
      )
    } else {
      return (
        <Badge className="bg-destructive/10 text-destructive border-destructive/20">
          <TrendingDown className="w-3 h-3 mr-1" />
          Baixa
        </Badge>
      )
    }
  }

  return (
    <Card className="bg-gradient-card shadow-card border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-md flex items-center justify-center">
            <Store className="w-4 h-4 text-white" />
          </div>
          Desempenho por Loja
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="font-semibold">Loja</TableHead>
                <TableHead className="text-right font-semibold">Receita</TableHead>
                <TableHead className="text-right font-semibold">Qtd. Vendida</TableHead>
                <TableHead className="text-right font-semibold">Ticket Médio</TableHead>
                <TableHead className="text-center font-semibold">Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((item, index) => (
                <TableRow 
                  key={item.store} 
                  className={`hover:bg-muted/50 transition-smooth ${
                    index === 0 ? 'bg-success/5' : ''
                  }`}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {index === 0 && (
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                      )}
                      {item.store}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {item.revenue.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {item.quantity.toLocaleString('pt-BR')}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {item.averageTicket.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </TableCell>
                  <TableCell className="text-center">
                    {getPerformanceBadge(item.revenue)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {sortedData.length === 0 && (
          <div className="text-center py-8">
            <Store className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">Nenhum dado disponível</p>
            <p className="text-sm text-muted-foreground mt-1">
              Faça upload de um arquivo Excel para visualizar os dados
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}