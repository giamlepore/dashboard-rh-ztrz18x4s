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
import {
  Plus,
  Pencil,
  Trash2,
  Clock,
  PlayCircle,
  StopCircle,
  CheckCircle,
} from 'lucide-react'
import { TimeLogForm, TimeLogFormValues } from '@/components/forms/TimeLogForm'
import { useToast } from '@/hooks/use-toast'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  getTimeLogs,
  createTimeLog,
  updateTimeLog,
  deleteTimeLog,
  clockIn,
  clockOut,
  getTodayLog,
  TimeLog,
} from '@/services/time-logs'
import { getEmployees, Employee } from '@/services/employees'
import { useUserRole } from '@/hooks/use-user-role'

export default function Ponto() {
  const [logs, setLogs] = useState<TimeLog[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingLog, setEditingLog] = useState<TimeLog | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [todayLog, setTodayLog] = useState<TimeLog | null>(null)
  const { toast } = useToast()

  const { isAdmin, isManager, isEmployee, colaboradorId, loading } =
    useUserRole()

  // Can Edit/Delete: Only Admin
  const canManage = isAdmin
  // Can Create Manual: Only Admin
  const canCreateManual = isAdmin
  // View All: Admin & Manager
  const viewAll = isAdmin || isManager

  const fetchData = async () => {
    try {
      if (!colaboradorId && isEmployee && !loading) return

      const logsData = await getTimeLogs(
        isEmployee ? colaboradorId! : undefined,
      )
      setLogs(logsData)

      if (viewAll) {
        const employeesData = await getEmployees()
        setEmployees(employeesData)
      }

      if (isEmployee && colaboradorId) {
        const today = await getTodayLog(colaboradorId)
        setTodayLog(today)
      }
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
    if (!loading) {
      fetchData()
    }
  }, [loading, colaboradorId, isAdmin, isManager, isEmployee])

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

  const handleClockIn = async () => {
    if (!colaboradorId) return
    try {
      await clockIn(colaboradorId)
      toast({ title: 'Ponto Iniciado', description: 'Bom trabalho!' })
      fetchData()
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  const handleClockOut = async () => {
    if (!colaboradorId) return
    try {
      await clockOut(colaboradorId)
      toast({ title: 'Ponto Finalizado', description: 'Até amanhã!' })
      fetchData()
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  const mapToForm = (log: TimeLog): TimeLogFormValues => ({
    employee: log.colaborador_id,
    date: new Date(log.data),
    entry: log.hora_entrada,
    exit: log.hora_saida || '',
  })

  if (loading) return <div>Carregando...</div>

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Controle de Ponto
          </h1>
          <p className="text-muted-foreground text-sm">
            {isEmployee
              ? 'Registre seus horários.'
              : 'Gerencie os registros de horário.'}
          </p>
        </div>

        {/* Employee Actions */}
        {isEmployee && (
          <div className="flex gap-4">
            {!todayLog ? (
              <Button
                onClick={handleClockIn}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <PlayCircle className="mr-2 h-5 w-5" /> Registrar Início
              </Button>
            ) : !todayLog.hora_saida ? (
              <Button
                onClick={handleClockOut}
                className="bg-amber-600 hover:bg-amber-700"
              >
                <StopCircle className="mr-2 h-5 w-5" /> Registrar Finalização
              </Button>
            ) : (
              <Button
                variant="outline"
                disabled
                className="cursor-not-allowed border-emerald-500 text-emerald-600"
              >
                <CheckCircle className="mr-2 h-5 w-5" /> Ponto Finalizado
              </Button>
            )}
          </div>
        )}

        {/* Admin Actions */}
        {canCreateManual && (
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open)
              if (!open) setEditingLog(null)
            }}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Registro Manual
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
                employeesList={employees.map((e) => ({
                  id: e.id,
                  name: e.nome,
                }))}
                onSubmit={handleSubmit}
                onCancel={() => setIsDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Colaborador</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Entrada</TableHead>
              <TableHead>Saída</TableHead>
              {canManage && <TableHead className="text-right">Ações</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={canManage ? 5 : 4}
                  className="text-center h-24 text-muted-foreground"
                >
                  Nenhum registro encontrado.
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">
                    {log.colaboradores?.nome || 'Você'}
                  </TableCell>
                  <TableCell>
                    {format(new Date(log.data), 'dd/MM/yyyy', { locale: ptBR })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-emerald-500" />
                      {log.hora_entrada}
                    </div>
                  </TableCell>
                  <TableCell>
                    {log.hora_saida ? (
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-amber-500" />
                        {log.hora_saida}
                      </div>
                    ) : (
                      <span className="text-xs italic text-muted-foreground">
                        Em andamento...
                      </span>
                    )}
                  </TableCell>
                  {canManage && (
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
                  )}
                </TableRow>
              ))
            )}
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
