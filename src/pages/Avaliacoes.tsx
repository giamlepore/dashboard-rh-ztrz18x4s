import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Target, Users, TrendingUp, ChevronRight } from 'lucide-react'

const cycles = [
  {
    id: 1,
    title: 'Avaliação 90 Dias',
    type: 'Período de Experiência',
    due: 'Vence em 5 dias',
    progress: 80,
    color: 'bg-blue-500',
  },
  {
    id: 2,
    title: 'Avaliação Anual 2025',
    type: 'Desempenho Geral',
    due: 'Em andamento',
    progress: 45,
    color: 'bg-indigo-500',
  },
  {
    id: 3,
    title: 'Feedback 360º',
    type: 'Liderança',
    due: 'Agendado',
    progress: 10,
    color: 'bg-purple-500',
  },
]

export default function Avaliacoes() {
  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Avaliações de Desempenho
          </h1>
          <p className="text-muted-foreground text-sm">
            Acompanhe os ciclos de feedback e desenvolvimento.
          </p>
        </div>
        <Button>
          <Target className="mr-2 h-4 w-4" /> Novo Ciclo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cycles.map((cycle) => (
          <Card
            key={cycle.id}
            className="border-none shadow-sm hover:shadow-md transition-shadow"
          >
            <CardHeader>
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${cycle.color} bg-opacity-10 text-primary`}
              >
                {cycle.id === 1 ? (
                  <TrendingUp className="h-5 w-5" />
                ) : cycle.id === 2 ? (
                  <Target className="h-5 w-5" />
                ) : (
                  <Users className="h-5 w-5" />
                )}
              </div>
              <CardTitle className="text-lg">{cycle.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{cycle.type}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span>Progresso</span>
                  <span>{cycle.progress}%</span>
                </div>
                <Progress value={cycle.progress} className="h-2" />
                <p className="text-xs text-muted-foreground pt-1">
                  {cycle.due}
                </p>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button
                variant="ghost"
                className="w-full justify-between text-sm font-normal"
              >
                Ver Detalhes <ChevronRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="space-y-4 mt-8">
        <h2 className="text-lg font-semibold">
          Avaliações Individuais Recentes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 bg-card rounded-lg border shadow-sm"
            >
              <Avatar>
                <AvatarImage
                  src={`https://img.usecurling.com/ppl/thumbnail?gender=${i % 2 === 0 ? 'female' : 'male'}&seed=${i}`}
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">Nome do Colaborador</p>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div
                      key={star}
                      className={`h-1.5 w-1.5 rounded-full ${star <= 4 ? 'bg-amber-400' : 'bg-gray-200'}`}
                    />
                  ))}
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
