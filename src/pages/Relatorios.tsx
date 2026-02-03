import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Line,
  LineChart,
  Pie,
  PieChart,
} from 'recharts'
import { ArrowUpRight, ArrowDownRight, Users, DollarSign } from 'lucide-react'

const turnOverData = [
  { month: 'Jan', rate: 2.4 },
  { month: 'Fev', rate: 1.8 },
  { month: 'Mar', rate: 3.2 },
  { month: 'Abr', rate: 2.1 },
  { month: 'Mai', rate: 1.5 },
  { month: 'Jun', rate: 1.2 },
]

const headcountData = [
  { department: 'Engenharia', count: 45, fill: 'var(--color-eng)' },
  { department: 'Vendas', count: 30, fill: 'var(--color-sales)' },
  { department: 'Marketing', count: 20, fill: 'var(--color-mkt)' },
  { department: 'Produto', count: 15, fill: 'var(--color-prod)' },
  { department: 'RH', count: 8, fill: 'var(--color-rh)' },
]

const chartConfig = {
  rate: {
    label: 'Turnover %',
    color: 'hsl(var(--chart-1))',
  },
  eng: { label: 'Engenharia', color: 'hsl(var(--chart-1))' },
  sales: { label: 'Vendas', color: 'hsl(var(--chart-2))' },
  mkt: { label: 'Marketing', color: 'hsl(var(--chart-3))' },
  prod: { label: 'Produto', color: 'hsl(var(--chart-4))' },
  rh: { label: 'RH', color: 'hsl(var(--chart-5))' },
}

export default function Relatorios() {
  return (
    <div className="p-6 md:p-8 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Relatórios & Métricas
        </h1>
        <p className="text-muted-foreground text-sm">
          Visão geral dos KPIs de Recursos Humanos.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Headcount Total
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">118</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
              +12% desde mês passado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Turnover Anual
            </CardTitle>
            <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2%</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowDownRight className="h-3 w-3 text-emerald-500 mr-1" />
              -0.4% abaixo da meta
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custo Folha</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 482k</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              +2.1% devido a novas contratações
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Turnover (Últimos 6 meses)</CardTitle>
            <CardDescription>Taxa de rotatividade mensal</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="min-h-[200px] w-full"
            >
              <BarChart accessibilityLayer data={turnOverData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="rate" fill="var(--color-rate)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Distribuição por Departamento</CardTitle>
            <CardDescription>Headcount atual por área</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <Pie
                  data={headcountData}
                  dataKey="count"
                  nameKey="department"
                  innerRadius={60}
                  strokeWidth={5}
                />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <ChartLegend
                  content={<ChartLegendContent nameKey="department" />}
                  className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
