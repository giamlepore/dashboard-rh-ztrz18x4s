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
import { TimeLogForm, TimeLogFormValues } from '@/components/forms/TimeLogForm'
import { useToast } from '@/hooks/use-toast'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  getTimeLogs,
  createTimeLog,
  updateTimeLog,
  deleteTimeLog,
  TimeLog,
} from '@/services/time-logs'
import { getEmployees, Employee } from '@/services/employees'

export default function Ponto() {
  const [logs, setLogs] = useState<TimeLog[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingLog, setEditingLog] = useState<TimeLog | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchData = async () => {
    try {
      const [logsData, employeesData] = await Promise.all([
        getTimeLogs(),
        getEmployees(),
      ])
      setLogs(logsData)
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

  const handleSubmit = async (data: TimeLogFormValues) => {
    try {
      const logData = {
        colaborador_id: data.employee,
        data: format(data.date, 'yyyy-MM-dd'),
        hora_entrada: data.entry,
        hora_saida: data.exit,
      }

      if (editingLog) {
        await updateTimeLog(editingLog.id, logData)
        toast({ title: 'Sucesso', description: 'Ponto atualizado.' })
      } else {
        await createTimeLog(logData)
        toast({ title: 'Sucesso', description: 'Ponto registrado.' })
      }
      setIsDialogOpen(false)
      setEditingLog(null)
      fetchData()
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro',
        description: 'Erro ao salvar registro.',
        variant: 'destructive',
      })
    }
  }

  const handleDelete = async () => {
    if (deletingId) {
      try {
        await deleteTimeLog(deletingId)
        fetchData()
        toast({
          title: 'Excluído',
          description: 'Registro excluído.',
          variant: 'destructive',
        })
      } catch (error) {
        console.error(error)
        toast({
          title: 'Erro',
          description: 'Erro ao excluir.',
          variant: 'destructive',
        })
      }
      setDeletingId(null)
    }
  }

  const mapToForm = (log: TimeLog): TimeLogFormValues => ({
    employee: log.colaborador_id,
    date: new Date(log.data),
    entry: log.hora_entrada,
    exit: log.hora_saida,
  })

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Controle de Ponto
          </h1>
          <p className="text-muted-foreground text-sm">
            Gerencie os registros de horário.
          </p>
        </div>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) setEditingLog(null)
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Registrar Ponto
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingLog ? 'Editar Registro' : 'Novo Registro'}
              </DialogTitle>
            </DialogHeader>
            <TimeLogForm
              initialData={editingLog ? mapToForm(editingLog) : null}
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
              <TableHead>Data</TableHead>
              <TableHead>Entrada</TableHead>
              <TableHead>Saída</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-medium">
                  {log.colaboradores?.nome || 'Desconhecido'}
                </TableCell>
                <TableCell>
                  {format(new Date(log.data), 'dd/MM/yyyy', { locale: ptBR })}
                </TableCell>
                <TableCell>{log.hora_entrada}</TableCell>
                <TableCell>{log.hora_saida}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditingLog(log)
                      setIsDialogOpen(true)
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500"
                    onClick={() => setDeletingId(log.id)}
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
            <AlertDialogTitle>Excluir registro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
