import {
  Briefcase,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'

const suggestions = [
  {
    title: 'Aprovar solicitações de férias',
    subtitle: '3 pendentes',
    icon: CheckCircle2,
    color: 'text-emerald-500',
    link: '/ferias',
  },
  {
    title: 'Visualizar candidatos',
    subtitle: 'Recrutamento ativo',
    icon: Briefcase,
    color: 'text-indigo-500',
    link: '/recrutamento',
  },
  {
    title: 'Relatório de Ponto',
    subtitle: 'Fechamento mensal',
    icon: Clock,
    color: 'text-amber-500',
    link: '/ponto',
  },
  {
    title: 'Avaliações Pendentes',
    subtitle: 'Ciclo anual',
    icon: AlertCircle,
    color: 'text-rose-500',
    link: '/avaliacoes',
  },
]

export default function Index() {
  const navigate = useNavigate()

  return (
    <div className="flex h-full flex-col items-center justify-center p-6 md:p-12 animate-fade-in">
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground pl-1">
          Acesso Rápido
        </h2>
        <div className="grid gap-4">
          {suggestions.map((item, index) => (
            <Card
              key={index}
              onClick={() => navigate(item.link)}
              className="group cursor-pointer hover:shadow-md transition-all duration-200 border-border/60 bg-white/50 dark:bg-zinc-900/50"
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-full bg-background border shadow-sm ${item.color}`}
                  >
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
