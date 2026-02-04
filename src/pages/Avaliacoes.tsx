import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Target, Search, Plus, Trash2 } from 'lucide-react'
import { useUserRole } from '@/hooks/use-user-role'
import { useToast } from '@/hooks/use-toast'
import { getEmployees } from '@/services/employees'
import {
  getEvaluations,
  createEvaluation,
  deleteEvaluation,
  type Evaluation,
} from '@/services/evaluations'
import { EvaluationForm } from '@/components/forms/EvaluationForm'
import { type EvaluationFormValues } from '@/components/forms/evaluation-schema'

export default function Avaliacoes() {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([])
  const [employees, setEmployees] = useState<{ id: string; nome: string }[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [loadingData, setLoadingData] = useState(false)

  const { isEmployee, isAdmin, isManager, loading } = useUserRole()
  const { toast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && isEmployee) {
      toast({
        title: 'Acesso Negado',
        description: 'Você não tem permissão para acessar esta página.',
        variant: 'destructive',
      })
      navigate('/')
    }
  }, [isEmployee, loading, navigate, toast])

  const fetchData = async () => {
    setLoadingData(true)
    try {
      // Fetch employees for dropdowns
      const emps = await getEmployees()
      setEmployees(emps.map((e) => ({ id: e.id, nome: e.nome })))

      // Admin fetches list
      if (isAdmin) {
        const data = await getEvaluations()
        setEvaluations(data)
      }
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro',
        description: 'Falha ao carregar dados.',
        variant: 'destructive',
      })
    } finally {
      setLoadingData(false)
    }
  }

  useEffect(() => {
    if (!loading && !isEmployee) {
      fetchData()
    }
  }, [loading, isAdmin, isEmployee])

  const handleSubmit = async (data: EvaluationFormValues) => {
    try {
      await createEvaluation({
        colaborador_id: data.colaboradorId,
        avaliador_id: data.avaliadorId,
        periodo: data.periodo,
        nota_pontualidade: data.notaPontualidade,
        nota_qualidade: data.notaQualidade,
        nota_trabalho_equipe: data.notaTrabalhoEquipe,
        observacoes: data.observacoes,
      })

      toast({ title: 'Sucesso', description: 'Avaliação registrada.' })
      setIsDialogOpen(false)
      fetchData()
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro',
        description: 'Erro ao salvar avaliação.',
        variant: 'destructive',
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta avaliação?')) return
    try {
      await deleteEvaluation(id)
      toast({ title: 'Sucesso', description: 'Avaliação removida.' })
      fetchData()
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao remover.',
        variant: 'destructive',
      })
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 4) return 'bg-emerald-500 hover:bg-emerald-600'
    if (score >= 3) return 'bg-amber-500 hover:bg-amber-600'
    return 'bg-red-500 hover:bg-red-600'
  }

  const filteredEvaluations = evaluations.filter(
    (e) =>
      e.colaborador?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.periodo.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading || isEmployee) return null

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Avaliações de Desempenho
          </h1>
          <p className="text-muted-foreground text-sm">
            Gerencie e acompanhe o desempenho da equipe.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Nova Avaliação
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Registrar Avaliação</DialogTitle>
            </DialogHeader>
            <EvaluationForm
              employees={employees}
              onSubmit={handleSubmit}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {isAdmin && (
        <Card className="border-none shadow-sm">
          <CardHeader className="px-0 pt-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Histórico de Avaliações</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Filtrar por nome ou período..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <CardDescription>
              Lista completa de todas as avaliações registradas.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <div className="rounded-md border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Colaborador</TableHead>
                    <TableHead>Avaliador</TableHead>
                    <TableHead>Período</TableHead>
                    <TableHead className="text-center">Pontualidade</TableHead>
                    <TableHead className="text-center">Qualidade</TableHead>
                    <TableHead className="text-center">Equipe</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvaluations.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center h-24 text-muted-foreground"
                      >
                        {loadingData
                          ? 'Carregando...'
                          : 'Nenhuma avaliação encontrada.'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredEvaluations.map((evaluation) => (
                      <TableRow key={evaluation.id}>
                        <TableCell className="font-medium">
                          {evaluation.colaborador?.nome || 'N/A'}
                        </TableCell>
                        <TableCell>
                          {evaluation.avaliador?.nome || 'N/A'}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{evaluation.periodo}</Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            className={getScoreColor(
                              evaluation.nota_pontualidade,
                            )}
                          >
                            {evaluation.nota_pontualidade}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            className={getScoreColor(evaluation.nota_qualidade)}
                          >
                            {evaluation.nota_qualidade}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            className={getScoreColor(
                              evaluation.nota_trabalho_equipe,
                            )}
                          >
                            {evaluation.nota_trabalho_equipe}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => handleDelete(evaluation.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {!isAdmin && isManager && (
        <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg bg-muted/10">
          <div className="p-4 bg-background rounded-full mb-4 shadow-sm">
            <Target className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Área do Gerente</h3>
          <p className="text-muted-foreground max-w-sm mt-2">
            Utilize o botão "Nova Avaliação" acima para registrar o desempenho
            dos membros da sua equipe.
          </p>
        </div>
      )}
    </div>
  )
}
