import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import {
  VacationForm,
  VacationFormValues,
} from '@/components/forms/VacationForm'
import { useToast } from '@/hooks/use-toast'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  getVacations,
  createVacation,
  updateVacation,
  deleteVacation,
  Vacation,
} from '@/services/vacations'
import { getEmployees, Employee } from '@/services/employees'

export default function Ferias() {
  const [requests, setRequests] = useState<Vacation[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRequest, setEditingRequest] = useState<Vacation | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchData = async () => {
    try {
      const [vacationsData, employeesData] = await Promise.all([
        getVacations(),
        getEmployees(),
      ])
      setRequests(vacationsData)
      setEmployees(employeesData)
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro',
        description: 'Erro ao carregar dados.',
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (data: VacationFormValues) => {
    try {
      const vacationData = {
        colaborador_id: data.employee,
        data_inicio: format(data.startDate, 'yyyy-MM-dd'),
        data_fim: format(data.endDate, 'yyyy-MM-dd'),
        status: data.status,
      }

      if (editingRequest) {
        await updateVacation(editingRequest.id, vacationData)
        toast({ title: 'Sucesso', description: 'Solicitação atualizada.' })
      } else {
        await createVacation(vacationData)
        toast({ title: 'Sucesso', description: 'Solicitação criada.' })
      }
      setIsDialogOpen(false)
      setEditingRequest(null)
      fetchData()
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro',
        description: 'Erro ao salvar solicitação.',
        variant: 'destructive',
      })
    }
  }

  const handleDelete = async () => {
    if (deletingId) {
      try {
        await deleteVacation(deletingId)
        fetchData()
        toast({
          title: 'Removido',
          description: 'Solicitação removida.',
          variant: 'destructive',
        })
      } catch (error) {
        console.error(error)
        toast({
          title: 'Erro',
          description: 'Erro ao remover.',
          variant: 'destructive',
        })
      }
      setDeletingId(null)
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Aprovada':
        return 'default'
      case 'Reprovada':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  const mapToForm = (req: Vacation): VacationFormValues => ({
    employee: req.colaborador_id,
    startDate: new Date(req.data_inicio),
    endDate: new Date(req.data_fim),
    status: req.status as any,
  })

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Gestão de Férias
          </h1>
          <p className="text-muted-foreground text-sm">
            Acompanhe e gerencie as solicitações.
          </p>
        </div>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) setEditingRequest(null)
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Solicitar Férias
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingRequest ? 'Editar Solicitação' : 'Nova Solicitação'}
              </DialogTitle>
            </DialogHeader>
            <VacationForm
              initialData={editingRequest ? mapToForm(editingRequest) : null}
              employeesList={employees.map((e) => ({ id: e.id, name: e.nome }))}
              onSubmit={handleSubmit}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Colaborador</TableHead>
              <TableHead>Início</TableHead>
              <TableHead>Fim</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">
                  {request.colaboradores?.nome || 'Desconhecido'}
                </TableCell>
                <TableCell>
                  {format(new Date(request.data_inicio), 'dd/MM/yyyy', {
                    locale: ptBR,
                  })}
                </TableCell>
                <TableCell>
                  {format(new Date(request.data_fim), 'dd/MM/yyyy', {
                    locale: ptBR,
                  })}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={getStatusVariant(request.status)}
                    className={
                      request.status === 'Aprovada'
                        ? 'bg-emerald-600 hover:bg-emerald-700'
                        : ''
                    }
                  >
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditingRequest(request)
                      setIsDialogOpen(true)
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500"
                    onClick={() => setDeletingId(request.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancelar solicitação?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação removerá a solicitação de férias.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Voltar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500">
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
