import { useState } from 'react'
import {
  Mic,
  Send,
  Briefcase,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

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
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
      // Logic to route based on search or pass state
      console.log('Searching for:', searchValue)
    }
  }

  return (
    <div className="flex h-full flex-col items-center justify-center p-6 md:p-12 animate-fade-in">
      <div className="w-full max-w-3xl space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Olá, Giam!
          </h1>
          <p className="text-lg text-muted-foreground">
            O que você deseja gerenciar hoje? Escolha um módulo ou pesquise
            abaixo.
          </p>
        </div>

        {/* Command Bar */}
        <div className="relative w-full max-w-2xl mx-auto">
          <form
            onSubmit={handleSearch}
            className="relative flex items-center w-full rounded-full border bg-background px-2 shadow-elevation hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center pl-4 py-3 gap-2">
              <button
                type="button"
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <span className="text-lg">✨</span>
              </button>
            </div>

            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="flex-1 border-none shadow-none focus-visible:ring-0 text-base md:text-lg h-14 bg-transparent placeholder:text-muted-foreground/50"
              placeholder="O que posso fazer por você?"
            />

            <div className="flex items-center pr-2 gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden md:flex gap-2 rounded-full h-9 text-xs font-medium text-muted-foreground"
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    Ferramentas
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Exportar Dados</DropdownMenuItem>
                  <DropdownMenuItem>Configurações</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden md:flex gap-2 rounded-full h-9 text-xs font-medium text-muted-foreground"
                  >
                    <span className="text-xs">🧠</span>
                    Experts
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>RH Expert</DropdownMenuItem>
                  <DropdownMenuItem>Legal Expert</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="h-6 w-px bg-border mx-2 hidden md:block" />

              <Button
                size="icon"
                variant="ghost"
                className="rounded-full text-muted-foreground hover:text-primary"
              >
                <Mic className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                type="submit"
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 ml-1 h-10 w-10"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>

        {/* Suggestions */}
        <div className="w-full pt-8 text-left max-w-2xl mx-auto">
          <h3 className="text-sm font-semibold text-foreground mb-4 pl-1">
            Sugestões de Ações:
          </h3>
          <div className="grid gap-3">
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
    </div>
  )
}
