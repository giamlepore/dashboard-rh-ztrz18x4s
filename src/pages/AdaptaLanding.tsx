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
  Terminal,
  Server,
  Code2,
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
import { useAuth } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'

export default function AdaptaLanding() {
  const { user } = useAuth()

  // Rainbow accents for cards
  const rainbowColors = [
    'border-l-rainbow-red',
    'border-l-rainbow-orange',
    'border-l-rainbow-yellow',
    'border-l-rainbow-green',
    'border-l-rainbow-blue',
    'border-l-rainbow-purple',
  ]

  return (
    <div className="min-h-screen bg-vintage-paper font-sans text-vintage-text overflow-x-hidden selection:bg-rainbow-yellow selection:text-vintage-text">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-vintage-paper/95 backdrop-blur border-b border-vintage-text/10 supports-[backdrop-filter]:bg-vintage-paper/60">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3 font-bold text-2xl tracking-tighter">
            <div className="bg-vintage-text text-vintage-paper p-1.5 rounded shadow-chassis-sm">
              <LayoutDashboard className="h-6 w-6" />
            </div>
            <span className="font-serif">ADAPTARH</span>
            <span className="hidden sm:inline-block font-mono text-xs bg-rainbow-yellow/20 text-vintage-text px-2 py-0.5 rounded-full border border-vintage-text/10">
              v2.0_RETRO
            </span>
          </div>
          <nav className="flex gap-4 items-center">
            {user ? (
              <Link to="/">
                <Button className="font-mono bg-vintage-text text-vintage-paper hover:bg-vintage-text/90 shadow-chassis-sm">
                  DASHBOARD_ACCESS
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="font-mono hover:bg-black/5"
                  >
                    LOGIN
                  </Button>
                </Link>
                <Link to="/signup" className="hidden sm:block">
                  <Button className="font-mono bg-vintage-text text-vintage-paper hover:bg-vintage-text/90 shadow-chassis-sm">
                    CREATE_ACCOUNT
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 px-4 md:px-6 overflow-hidden bg-vintage-paper">
        <div className="container mx-auto max-w-5xl space-y-8 relative z-10 animate-fade-in-down">
          <div className="flex justify-center">
            <Badge
              variant="outline"
              className="px-4 py-1.5 text-sm font-mono border-vintage-text/20 bg-chassis-base text-vintage-text shadow-chassis-sm rounded-none"
            >
              <Terminal className="w-4 h-4 mr-2" /> SYSTEM_ONLINE :: READY
            </Badge>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight text-center text-vintage-text leading-[1.1]">
            Gestão de RH <br className="hidden md:inline" />
            <span className="relative inline-block px-2">
              <span className="absolute inset-0 bg-rainbow-yellow/30 -rotate-1 skew-x-3 rounded-sm -z-10"></span>
              Completa & Inteligente
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-vintage-text/80 max-w-[800px] mx-auto text-center font-serif leading-relaxed italic">
            "Transforme a gestão de pessoas com uma plataforma moderna, segura e
            eficiente. Do recrutamento à avaliação de desempenho."
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Link to="/signup">
              <Button
                size="lg"
                className="h-14 px-8 text-lg font-mono bg-vintage-text text-vintage-paper hover:bg-vintage-text/90 shadow-chassis-md hover:translate-y-[2px] hover:shadow-chassis-sm transition-all border-2 border-transparent"
              >
                INICIAR_SISTEMA <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            {!user && (
              <Link to="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-lg font-mono bg-chassis-base border-2 border-vintage-text text-vintage-text hover:bg-chassis-base/80 shadow-chassis-md hover:translate-y-[2px] hover:shadow-chassis-sm transition-all"
                >
                  ACESSAR_CONTA
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 md:px-6 bg-chassis-base/30 border-y border-vintage-text/10">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4 max-w-2xl mx-auto">
            <h2 className="text-4xl font-serif font-medium tracking-tight text-vintage-text">
              Recursos do Sistema
            </h2>
            <p className="text-vintage-text/70 text-lg font-mono">
              [LOADING MODULES...]
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
            {/* Administration */}
            <Card
              className={cn(
                'bg-chassis-base border-2 border-chassis-border shadow-chassis-md hover:-translate-y-1 hover:shadow-chassis-lg transition-all duration-300 rounded-lg overflow-hidden border-l-4',
                rainbowColors[0],
              )}
            >
              <CardHeader className="bg-white/50 border-b border-chassis-border/50 pb-4">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="font-mono bg-white/80 border-vintage-text/20 text-xs"
                  >
                    SYS.ADMIN
                  </Badge>
                  <Shield className="h-5 w-5 text-rainbow-red" />
                </div>
                <CardTitle className="font-serif text-2xl mt-2">
                  Administração
                </CardTitle>
                <CardDescription className="font-mono text-xs uppercase tracking-wider text-vintage-text/60">
                  Auth & Security Module
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3 text-sm font-medium text-vintage-text/80">
                  <li className="flex gap-3 items-start">
                    <Key className="h-4 w-4 mt-0.5 text-vintage-text" />
                    <span>Controle de Acesso Baseado em Funções (RBAC)</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <Building2 className="h-4 w-4 mt-0.5 text-vintage-text" />
                    <span>Sistema de Organização e Múltiplas Empresas</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <Users className="h-4 w-4 mt-0.5 text-vintage-text" />
                    <span>Sistema de Convites e Fila de Visitantes</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Employee Management */}
            <Card
              className={cn(
                'bg-chassis-base border-2 border-chassis-border shadow-chassis-md hover:-translate-y-1 hover:shadow-chassis-lg transition-all duration-300 rounded-lg overflow-hidden border-l-4',
                rainbowColors[1],
              )}
            >
              <CardHeader className="bg-white/50 border-b border-chassis-border/50 pb-4">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="font-mono bg-white/80 border-vintage-text/20 text-xs"
                  >
                    DB.EMPLOYEES
                  </Badge>
                  <Users className="h-5 w-5 text-rainbow-orange" />
                </div>
                <CardTitle className="font-serif text-2xl mt-2">
                  Colaboradores
                </CardTitle>
                <CardDescription className="font-mono text-xs uppercase tracking-wider text-vintage-text/60">
                  People Management
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3 text-sm font-medium text-vintage-text/80">
                  <li className="flex gap-3 items-start">
                    <Database className="h-4 w-4 mt-0.5 text-vintage-text" />
                    <span>Banco de Dados de Funcionários Completo</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <FileText className="h-4 w-4 mt-0.5 text-vintage-text" />
                    <span>Gestão de Documentos Segura</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <Search className="h-4 w-4 mt-0.5 text-vintage-text" />
                    <span>Diretório Dinâmico com Filtros</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Recruitment */}
            <Card
              className={cn(
                'bg-chassis-base border-2 border-chassis-border shadow-chassis-md hover:-translate-y-1 hover:shadow-chassis-lg transition-all duration-300 rounded-lg overflow-hidden border-l-4',
                rainbowColors[2],
              )}
            >
              <CardHeader className="bg-white/50 border-b border-chassis-border/50 pb-4">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="font-mono bg-white/80 border-vintage-text/20 text-xs"
                  >
                    MOD.HIRING
                  </Badge>
                  <Briefcase className="h-5 w-5 text-rainbow-yellow" />
                </div>
                <CardTitle className="font-serif text-2xl mt-2">
                  Recrutamento
                </CardTitle>
                <CardDescription className="font-mono text-xs uppercase tracking-wider text-vintage-text/60">
                  Talent Acquisition
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3 text-sm font-medium text-vintage-text/80">
                  <li className="flex gap-3 items-start">
                    <LayoutDashboard className="h-4 w-4 mt-0.5 text-vintage-text" />
                    <span>Gestão de Vagas e Oportunidades</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <ArrowRight className="h-4 w-4 mt-0.5 text-vintage-text" />
                    <span>Portal Público de Vagas Externo</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <FileDown className="h-4 w-4 mt-0.5 text-vintage-text" />
                    <span>Pipeline de Candidatos e Download de CVs</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Operational */}
            <Card
              className={cn(
                'bg-chassis-base border-2 border-chassis-border shadow-chassis-md hover:-translate-y-1 hover:shadow-chassis-lg transition-all duration-300 rounded-lg overflow-hidden border-l-4',
                rainbowColors[3],
              )}
            >
              <CardHeader className="bg-white/50 border-b border-chassis-border/50 pb-4">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="font-mono bg-white/80 border-vintage-text/20 text-xs"
                  >
                    SYS.OPS
                  </Badge>
                  <Clock className="h-5 w-5 text-rainbow-green" />
                </div>
                <CardTitle className="font-serif text-2xl mt-2">
                  Ferramentas Operacionais
                </CardTitle>
                <CardDescription className="font-mono text-xs uppercase tracking-wider text-vintage-text/60">
                  Daily Routines
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3 text-sm font-medium text-vintage-text/80">
                  <li className="flex gap-3 items-start">
                    <Clock className="h-4 w-4 mt-0.5 text-vintage-text" />
                    <span>Controle de Ponto em Tempo Real</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <Calendar className="h-4 w-4 mt-0.5 text-vintage-text" />
                    <span>Gestão de Férias e Aprovações</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <FileText className="h-4 w-4 mt-0.5 text-vintage-text" />
                    <span>Histórico de Registros Auditável</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Performance */}
            <Card
              className={cn(
                'bg-chassis-base border-2 border-chassis-border shadow-chassis-md hover:-translate-y-1 hover:shadow-chassis-lg transition-all duration-300 rounded-lg overflow-hidden border-l-4',
                rainbowColors[4],
              )}
            >
              <CardHeader className="bg-white/50 border-b border-chassis-border/50 pb-4">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="font-mono bg-white/80 border-vintage-text/20 text-xs"
                  >
                    DATA.ANALYTICS
                  </Badge>
                  <TrendingUp className="h-5 w-5 text-rainbow-blue" />
                </div>
                <CardTitle className="font-serif text-2xl mt-2">
                  Performance
                </CardTitle>
                <CardDescription className="font-mono text-xs uppercase tracking-wider text-vintage-text/60">
                  KPIs & Metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3 text-sm font-medium text-vintage-text/80">
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-vintage-text" />
                    <span>Avaliações de Desempenho (Star Ratings)</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <BarChart3 className="h-4 w-4 mt-0.5 text-vintage-text" />
                    <span>Relatórios Estratégicos e KPIs</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <ArrowRight className="h-4 w-4 mt-0.5 text-vintage-text" />
                    <span>Dashboards de Folha e Funil</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Tech Foundation */}
            <Card
              className={cn(
                'bg-vintage-text border-2 border-vintage-text shadow-chassis-md hover:-translate-y-1 hover:shadow-chassis-lg transition-all duration-300 rounded-lg overflow-hidden border-l-4 border-l-rainbow-purple',
              )}
            >
              <CardHeader className="bg-white/10 border-b border-white/10 pb-4">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="font-mono bg-black/50 border-white/20 text-white text-xs"
                  >
                    CORE.SYSTEM
                  </Badge>
                  <Code2 className="h-5 w-5 text-rainbow-purple" />
                </div>
                <CardTitle className="font-serif text-2xl mt-2 text-vintage-paper">
                  Fundação Técnica
                </CardTitle>
                <CardDescription className="font-mono text-xs uppercase tracking-wider text-vintage-paper/60">
                  Specs & Security
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3 text-sm font-medium text-vintage-paper/90">
                  <li className="flex gap-3 items-start">
                    <Lock className="h-4 w-4 mt-0.5 text-rainbow-green" />
                    <span>Supabase Row Level Security (RLS)</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <Smartphone className="h-4 w-4 mt-0.5 text-rainbow-blue" />
                    <span>Interface Responsiva (Mobile First)</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <Server className="h-4 w-4 mt-0.5 text-rainbow-purple" />
                    <span>Arquitetura Escalável & Segura</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 md:px-6 relative overflow-hidden bg-vintage-paper">
        <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/200/300?q=noise&color=black')] opacity-5 mix-blend-overlay pointer-events-none"></div>
        <div className="container mx-auto text-center space-y-8 relative z-10">
          <div className="inline-block p-4 border-2 border-vintage-text rounded-full mb-4 bg-white shadow-chassis-md">
            <LayoutDashboard className="h-12 w-12 text-vintage-text" />
          </div>

          <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-vintage-text">
            Pronto para revolucionar seu RH?
          </h2>
          <p className="text-xl text-vintage-text/80 max-w-2xl mx-auto font-serif italic">
            "Junte-se a organizações que já utilizam o AdaptaRH para otimizar
            processos, reduzir burocracia e focar no que realmente importa."
          </p>

          <div className="pt-8 flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/signup">
              <Button
                size="lg"
                className="h-16 px-10 text-xl font-mono bg-rainbow-yellow text-vintage-text hover:bg-rainbow-yellow/90 border-2 border-vintage-text shadow-chassis-lg hover:shadow-chassis-md hover:translate-y-[2px] transition-all"
              >
                CRIAR_CONTA_GRATIS
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-6 border-t border-vintage-text/10 bg-chassis-base/20">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2 items-center md:items-start">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
              <div className="bg-vintage-text text-vintage-paper p-1 rounded">
                <LayoutDashboard className="h-4 w-4" />
              </div>
              <span className="font-serif">ADAPTARH</span>
            </div>
            <p className="text-sm font-mono text-vintage-text/60 max-w-xs text-center md:text-left">
              SYSTEM.STATUS: ONLINE
              <br />
              VERSION: 2.0.4
              <br />
              REGION: SA-EAST-1
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm font-medium text-vintage-text font-serif">
              &copy; 2026 AdaptaRH - Fig Mint Edition
            </p>
            <p className="text-xs text-vintage-text/50 font-mono mt-1">
              BUILT_WITH: REACT + SUPABASE + TAILWIND
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
