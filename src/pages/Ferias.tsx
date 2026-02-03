import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Check, X, Plane, Calendar } from 'lucide-react'

const requests = [
  {
    id: 1,
    name: 'Mariana Costa',
    role: 'Gerente de RH',
    type: 'Férias (30 dias)',
    period: '01/03/2026 - 30/03/2026',
    status: 'Pendente',
    image: 'female',
  },
  {
    id: 2,
    name: 'Lucas Pereira',
    role: 'Backend Dev',
    type: 'Férias (15 dias)',
    period: '15/04/2026 - 30/04/2026',
    status: 'Pendente',
    image: 'male',
  },
]

const upcomingVacations = [
  {
    id: 3,
    name: 'Fernanda Alves',
    start: '10 Fev',
    end: '25 Fev',
    days: 15,
    color: 'bg-blue-500',
    image: 'female',
  },
  {
    id: 4,
    name: 'Carlos Lima',
    start: '20 Fev',
    end: '05 Mar',
    days: 15,
    color: 'bg-purple-500',
    image: 'male',
  },
]

export default function Ferias() {
  return (
    <div className="p-6 md:p-8 space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Gestão de Férias
          </h1>
          <p className="text-muted-foreground text-sm">
            Visualize o cronograma e aprove solicitações.
          </p>
        </div>
        <Button>
          <Plane className="mr-2 h-4 w-4" /> Nova Solicitação
        </Button>
      </div>

      {/* Timeline Visualization (Simplified Gantt) */}
      <Card className="border-none shadow-sm bg-gradient-to-br from-white to-slate-50 dark:from-zinc-900 dark:to-zinc-950">
        <CardHeader>
          <CardTitle>Cronograma (Fevereiro 2026)</CardTitle>
          <CardDescription>Próximas férias agendadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {upcomingVacations.map((v) => (
              <div key={v.id} className="flex items-center gap-4">
                <div className="w-32 text-sm text-right text-muted-foreground shrink-0 flex flex-col items-end">
                  <span className="font-medium text-foreground">{v.start}</span>
                  <span className="text-xs">até {v.end}</span>
                </div>
                <div className="relative flex-1 h-12 bg-muted/30 rounded-lg flex items-center px-4">
                  {/* Bar simulation */}
                  <div
                    className={`absolute left-0 top-2 bottom-2 rounded-md ${v.color} opacity-20 w-full md:w-1/3`}
                  />
                  <div className="relative z-10 flex items-center gap-3">
                    <Avatar className="h-8 w-8 border-2 border-background">
                      <AvatarImage
                        src={`https://img.usecurling.com/ppl/thumbnail?gender=${v.image}&seed=${v.id}`}
                      />
                      <AvatarFallback>{v.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{v.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {v.days} dias
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Requests */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Solicitações Pendentes</h3>
          {requests.map((req) => (
            <Card key={req.id} className="overflow-hidden">
              <div className="p-4 flex items-start gap-4">
                <Avatar>
                  <AvatarImage
                    src={`https://img.usecurling.com/ppl/thumbnail?gender=${req.image}&seed=${req.id}`}
                  />
                  <AvatarFallback>{req.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{req.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {req.role}
                      </p>
                    </div>
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                      {req.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                    <Calendar className="h-3.5 w-3.5" />
                    {req.period}
                  </div>
                  <p className="text-xs font-medium mt-1">{req.type}</p>
                </div>
              </div>
              <div className="bg-muted/30 p-2 flex gap-2 justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                >
                  <X className="h-4 w-4 mr-1" /> Recusar
                </Button>
                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <Check className="h-4 w-4 mr-1" /> Aprovar
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Saldo de Banco de Horas</h3>
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Equipe de Design</span>
                  <span className="text-muted-foreground">85% utilizado</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Equipe de Engenharia</span>
                  <span className="text-muted-foreground">45% utilizado</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Equipe de Vendas</span>
                  <span className="text-muted-foreground">60% utilizado</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
