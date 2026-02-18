import {
  Briefcase,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Copy,
  Building,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'
import { useUserRole } from '@/hooks/use-user-role'
import { toast } from 'sonner'

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
  const { isAdmin, organizationId, organizationName } = useUserRole()

  const copyInviteLink = () => {
    if (!organizationId) return
    const link = `${window.location.origin}/signup?orgId=${organizationId}`
    navigator.clipboard.writeText(link)
    toast.success('Link copiado!', {
      description: 'Envie para novos colaboradores se cadastrarem.',
    })
  }

  return (
    <div className="flex flex-col gap-6 p-6 md:p-12 animate-fade-in">
      {isAdmin && organizationId && (
        <Card className="w-full max-w-2xl mx-auto border-dashed border-2 border-primary/20 bg-primary/5">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Convidar Colaboradores</CardTitle>
            </div>
            <CardDescription>
              Compartilhe o link abaixo para adicionar membros à{' '}
              <strong>{organizationName || 'sua organização'}</strong>.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Input
                readOnly
                value={`${window.location.origin}/signup?orgId=${organizationId}`}
                className="bg-background font-mono text-xs md:text-sm"
              />
              <Button
                size="icon"
                variant="outline"
                onClick={copyInviteLink}
                title="Copiar link"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

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
