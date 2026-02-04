import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Briefcase, Users, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Recrutamento() {
  const navigate = useNavigate()

  return (
    <div className="p-6 md:p-12 animate-fade-in flex flex-col items-center justify-center min-h-[80vh]">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Recrutamento e Seleção
          </h1>
          <p className="text-muted-foreground text-lg">
            Gerencie suas vagas e acompanhe seus candidatos em um só lugar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card
            className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-border/60 hover:border-primary/50"
            onClick={() => navigate('/recrutamento/vagas')}
          >
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Briefcase className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Gestão de Vagas</CardTitle>
              <CardDescription>
                Crie, edite e gerencie as oportunidades abertas na empresa.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="p-0 group-hover:text-primary">
                Acessar Vagas <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card
            className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-border/60 hover:border-primary/50"
            onClick={() => navigate('/recrutamento/candidatos')}
          >
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Base de Candidatos</CardTitle>
              <CardDescription>
                Visualize todos os candidatos, currículos e controle as etapas
                do processo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="p-0 group-hover:text-primary">
                Acessar Candidatos <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
