import { useState } from 'react'
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

interface TimeLog extends TimeLogFormValues {
  id: number
}

const initialLogs: TimeLog[] = [
  {
    id: 1,
    employee: 'Ana Souza',
    date: new Date(),
    entry: '09:00',
    exit: '18:00',
  },
  {
    id: 2,
    employee: 'Carlos Lima',
    date: new Date(),
    entry: '09:15',
    exit: '18:15',
  },
]

export default function Ponto() {
  const [logs, setLogs] = useState<TimeLog[]>(initialLogs)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingLog, setEditingLog] = useState<TimeLog | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const { toast } = useToast()

  const handleSubmit = (data: TimeLogFormValues) => {
    if (editingLog) {
      setLogs(logs.map((l) => (l.id === editingLog.id ? { ...l, ...data } : l)))
      toast({
        title: 'Registro atualizado',
        description: 'Ponto atualizado com sucesso.',
      })
    } else {
      setLogs([...logs, { ...data, id: Date.now() }])
      toast({
        title: 'Registro criado',
        description: 'Ponto registrado com sucesso.',
      })
    }
    setIsDialogOpen(false)
    setEditingLog(null)
  }

  const handleDelete = () => {
    if (deletingId) {
      setLogs(logs.filter((l) => l.id !== deletingId))
      toast({ title: 'Registro excluído', variant: 'destructive' })
      setDeletingId(null)
    }
  }

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
              initialData={editingLog}
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
                <TableCell className="font-medium">{log.employee}</TableCell>
                <TableCell>
                  {format(log.date, 'dd/MM/yyyy', { locale: ptBR })}
                </TableCell>
                <TableCell>{log.entry}</TableCell>
                <TableCell>{log.exit}</TableCell>
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
