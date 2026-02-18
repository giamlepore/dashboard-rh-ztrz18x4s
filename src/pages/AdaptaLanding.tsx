import { Link } from 'react-router-dom'
import {
  Shield,
  Users,
  Key,
  Briefcase,
  Search,
  FileDown,
  Clock,
  Calendar,
  BarChart3,
  Lock,
  CheckCircle2,
  ArrowRight,
  LayoutDashboard,
  TrendingUp,
  FileText,
  Database,
  Building2,
  Smartphone,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StarRating } from '@/components/ui/star-rating'
import { useAuth } from '@/hooks/use-auth'

export default function AdaptaLanding() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* Header */}
      <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <span>ADAPTARH</span>
          </div>
          <nav className="flex gap-4 items-center">
            {user ? (
              <Link to="/">
                <Button>Acessar Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Entrar</Button>
                </Link>
                <Link to="/signup" className="hidden sm:block">
                  <Button>Criar Conta</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 xl:py-40 px-4 md:px-6 space-y-8 text-center bg-gradient-to-b from-background to-muted/30 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="container mx-auto max-w-4xl space-y-6 relative z-10 animate-fade-in-down">
          <Badge
            variant="outline"
            className="px-4 py-1.5 text-sm border-primary/20 bg-primary/5 text-primary rounded-full"
          >
            Gestão de RH 2.0 ✨
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl text-foreground">
            Adapta: Sua Gestão de RH <br className="hidden md:inline" />
            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
              Completa e Inteligente
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-[800px] mx-auto leading-relaxed">
            Transforme a gestão de pessoas com uma plataforma moderna, segura e
            eficiente. Do recrutamento à avaliação de desempenho, centralize
            tudo em um só lugar.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link to="/signup">
              <Button size="lg" className="h-12 px-8 text-lg gap-2 shadow-lg">
                Começar Agora <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            {!user && (
              <Link to="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-lg bg-background/50 backdrop-blur-sm"
                >
                  Fazer Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight">
              Recursos Poderosos para seu RH
            </h2>
            <p className="text-muted-foreground text-lg">
              Uma suíte completa de ferramentas projetadas para otimizar cada
              etapa da jornada do colaborador.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Admin & Auth */}
            <Card className="border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Controle e Segurança</CardTitle>
                <CardDescription>
                  Governança completa de dados e acessos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-2 items-center">
                    <Key className="h-4 w-4 text-primary shrink-0" />
                    Controle de Acesso (RBAC)
                  </li>
                  <li className="flex gap-2 items-center">
                    <Building2 className="h-4 w-4 text-primary shrink-0" />
                    Múltiplas Organizações
                  </li>
                  <li className="flex gap-2 items-center">
                    <Users className="h-4 w-4 text-primary shrink-0" />
                    Sistema Seguro de Convites
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Employee Management */}
            <Card className="border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Gestão de Colaboradores</CardTitle>
                <CardDescription>
                  Centralize todas as informações da equipe.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-2 items-center">
                    <Database className="h-4 w-4 text-blue-500 shrink-0" />
                    Base de Dados Completa
                  </li>
                  <li className="flex gap-2 items-center">
                    <FileText className="h-4 w-4 text-blue-500 shrink-0" />
                    Gestão Documental (RG, Contratos)
                  </li>
                  <li className="flex gap-2 items-center">
                    <Search className="h-4 w-4 text-blue-500 shrink-0" />
                    Diretório com Status Dinâmico
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Recruitment */}
            <Card className="border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>Recrutamento</CardTitle>
                <CardDescription>
                  Atraia e selecione os melhores talentos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-2 items-center">
                    <LayoutDashboard className="h-4 w-4 text-indigo-500 shrink-0" />
                    Gestão de Vagas
                  </li>
                  <li className="flex gap-2 items-center">
                    <ArrowRight className="h-4 w-4 text-indigo-500 shrink-0" />
                    Portal Público de Carreiras
                  </li>
                  <li className="flex gap-2 items-center">
                    <FileDown className="h-4 w-4 text-indigo-500 shrink-0" />
                    Pipeline e Download de CVs
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Operational */}
            <Card className="border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
                <CardTitle>Ferramentas Operacionais</CardTitle>
                <CardDescription>
                  Rotinas de DP simplificadas e digitais.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-2 items-center">
                    <Clock className="h-4 w-4 text-amber-500 shrink-0" />
                    Ponto Eletrônico em Tempo Real
                  </li>
                  <li className="flex gap-2 items-center">
                    <Calendar className="h-4 w-4 text-amber-500 shrink-0" />
                    Gestão de Solicitação de Férias
                  </li>
                  <li className="flex gap-2 items-center">
                    <FileText className="h-4 w-4 text-amber-500 shrink-0" />
                    Histórico de Registros
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Performance */}
            <Card className="border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-rose-100 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-rose-600" />
                </div>
                <CardTitle>Performance e Análises</CardTitle>
                <CardDescription>
                  Dados estratégicos para tomada de decisão.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg border border-border/50">
                  <span className="text-xs font-medium text-muted-foreground">
                    Exemplo de Avaliação:
                  </span>
                  <StarRating
                    value={4}
                    readOnly
                    className="scale-75 origin-left"
                  />
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-2 items-center">
                    <CheckCircle2 className="h-4 w-4 text-rose-500 shrink-0" />
                    Avaliações com Star Ratings
                  </li>
                  <li className="flex gap-2 items-center">
                    <BarChart3 className="h-4 w-4 text-rose-500 shrink-0" />
                    Dashboards de KPIs
                  </li>
                  <li className="flex gap-2 items-center">
                    <ArrowRight className="h-4 w-4 text-rose-500 shrink-0" />
                    Relatórios de Folha e Departamentos
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Tech Foundation */}
            <Card className="border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 bg-zinc-900 text-zinc-100 dark:bg-zinc-800">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-zinc-800 flex items-center justify-center mb-4 border border-zinc-700">
                  <Lock className="h-6 w-6 text-zinc-100" />
                </div>
                <CardTitle className="text-zinc-100">
                  Fundação Técnica
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Construído com as melhores tecnologias.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-zinc-300">
                  <li className="flex gap-2 items-center">
                    <Lock className="h-4 w-4 text-emerald-400 shrink-0" />
                    Segurança via Supabase RLS
                  </li>
                  <li className="flex gap-2 items-center">
                    <Smartphone className="h-4 w-4 text-blue-400 shrink-0" />
                    Interface Responsiva (Mobile First)
                  </li>
                  <li className="flex gap-2 items-center">
                    <LayoutDashboard className="h-4 w-4 text-purple-400 shrink-0" />
                    UI/UX Moderna com Shadcn UI
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/200/300?q=office%20pattern&color=white')] opacity-5 mix-blend-overlay"></div>
        <div className="container mx-auto text-center space-y-8 relative z-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Pronto para revolucionar seu RH?
          </h2>
          <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto leading-relaxed">
            Junte-se a organizações que já utilizam o AdaptaRH para otimizar
            processos, reduzir burocracia e focar no que realmente importa: as
            pessoas.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button
                size="lg"
                variant="secondary"
                className="h-14 px-8 text-lg font-semibold w-full sm:w-auto shadow-xl"
              >
                Criar Conta Gratuita
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-6 border-t bg-background">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 font-bold text-lg">
              <LayoutDashboard className="h-5 w-5 text-primary" />
              <span>ADAPTARH</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Plataforma completa de gestão de recursos humanos para empresas
              modernas.
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm font-medium text-foreground">
              &copy; 2026 AdaptaRH
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Desenvolvido com excelência técnica, Supabase e React.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
