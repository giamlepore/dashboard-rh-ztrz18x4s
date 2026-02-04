import { useEffect, useState } from 'react'
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
  ChartConfig,
} from '@/components/ui/chart'
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Cell,
  Label,
} from 'recharts'
import {
  Users,
  DollarSign,
  Briefcase,
  TrendingUp,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { getReportsData, ReportsData } from '@/services/reports'
import { toast } from 'sonner'

const chartConfigPerformance: ChartConfig = {
  pontualidade: {
    label: 'Pontualidade',
    color: 'hsl(var(--chart-1))',
  },
  qualidade: {
    label: 'Qualidade',
    color: 'hsl(var(--chart-2))',
  },
  trabalho_equipe: {
    label: 'Trabalho em Equipe',
    color: 'hsl(var(--chart-3))',
  },
}

const chartConfigRecruitment: ChartConfig = {
  count: {
    label: 'Candidatos',
    color: 'hsl(var(--primary))',
  },
}

export default function Relatorios() {
  const [data, setData] = useState<ReportsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getReportsData()
        setData(result)
      } catch (error) {
        console.error('Failed to load reports', error)
        toast.error('Erro ao carregar dados dos relatórios.')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">
          Carregando relatórios...
        </span>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] text-muted-foreground">
        <AlertCircle className="h-10 w-10 mb-2" />
        <p>Não foi possível carregar os dados.</p>
      </div>
    )
  }

  // Create config dynamically for departments
  const chartConfigPayroll: ChartConfig = {}
  data.payroll.forEach((item, index) => {
    chartConfigPayroll[item.department] = {
      label: item.department,
      color: item.fill,
    }
  })

  return (
    <div className="p-6 md:p-8 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Relatórios & Métricas
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Visão geral estratégica de performance, financeiro e recrutamento.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custo Folha</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(data.stats.totalPayroll)}
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
              Total mensal (Ativos)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Headcount Total
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.stats.totalEmployees}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Colaboradores ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Candidatos no Funil
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.stats.totalCandidates}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Processos seletivos em andamento
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <Card className="flex flex-col md:col-span-2">
          <CardHeader>
            <CardTitle>Performance por Departamento</CardTitle>
            <CardDescription>
              Média das avaliações de Pontualidade, Qualidade e Trabalho em
              Equipe (escala 1-5).
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            {data.performance.length > 0 ? (
              <ChartContainer
                config={chartConfigPerformance}
                className="w-full h-[350px]"
              >
                <BarChart data={data.performance}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="department"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar
                    dataKey="pontualidade"
                    fill="var(--color-pontualidade)"
                    radius={4}
                  />
                  <Bar
                    dataKey="qualidade"
                    fill="var(--color-qualidade)"
                    radius={4}
                  />
                  <Bar
                    dataKey="trabalho_equipe"
                    fill="var(--color-trabalho_equipe)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                Dados insuficientes para exibir o gráfico.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payroll Distribution */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Distribuição da Folha Salarial</CardTitle>
            <CardDescription>
              Custo total por departamento e proporção do orçamento.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            {data.payroll.length > 0 ? (
              <ChartContainer
                config={chartConfigPayroll}
                className="mx-auto aspect-square max-h-[300px]"
              >
                <PieChart>
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => formatCurrency(Number(value))}
                      />
                    }
                  />
                  <Pie
                    data={data.payroll}
                    dataKey="cost"
                    nameKey="department"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold"
                              >
                                {data.stats.totalPayroll.toLocaleString(
                                  'pt-BR',
                                  {
                                    style: 'currency',
                                    currency: 'BRL',
                                    notation: 'compact',
                                  },
                                )}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground text-xs"
                              >
                                Total Folha
                              </tspan>
                            </text>
                          )
                        }
                      }}
                    />
                  </Pie>
                  <ChartLegend
                    content={<ChartLegendContent nameKey="department" />}
                    className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                  />
                </PieChart>
              </ChartContainer>
            ) : (
              <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                Dados insuficientes.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recruitment Funnel */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Funil de Recrutamento</CardTitle>
            <CardDescription>
              Quantidade de candidatos por etapa do processo seletivo.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            {data.recruitment.length > 0 ? (
              <ChartContainer
                config={chartConfigRecruitment}
                className="w-full h-[300px]"
              >
                <BarChart
                  accessibilityLayer
                  data={data.recruitment}
                  layout="vertical"
                  margin={{
                    left: 20,
                  }}
                >
                  <CartesianGrid horizontal={false} />
                  <YAxis
                    dataKey="status"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    width={80}
                  />
                  <XAxis dataKey="count" type="number" hide />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar
                    dataKey="count"
                    layout="vertical"
                    radius={5}
                    fill="var(--color-count)"
                  >
                    <Label
                      dataKey="count"
                      position="right"
                      offset={10}
                      className="fill-foreground font-bold"
                      fontSize={12}
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                Sem dados de recrutamento.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
