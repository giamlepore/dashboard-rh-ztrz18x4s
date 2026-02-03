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

interface VacationRequest extends VacationFormValues {
  id: number
}

const initialRequests: VacationRequest[] = [
  {
    id: 1,
    employee: 'Mariana Costa',
    startDate: new Date('2026-03-01'),
    endDate: new Date('2026-03-30'),
    status: 'Pendente',
  },
  {
    id: 2,
    employee: 'Lucas Pereira',
    startDate: new Date('2026-04-15'),
    endDate: new Date('2026-04-30'),
    status: 'Aprovada',
  },
]

export default function Ferias() {
  const [requests, setRequests] = useState<VacationRequest[]>(initialRequests)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRequest, setEditingRequest] = useState<VacationRequest | null>(
    null,
  )
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const { toast } = useToast()

  const handleSubmit = (data: VacationFormValues) => {
    if (editingRequest) {
      setRequests(
        requests.map((r) =>
          r.id === editingRequest.id ? { ...r, ...data } : r,
        ),
      )
      toast({
        title: 'Solicitação atualizada',
        description: 'Férias atualizadas com sucesso.',
      })
    } else {
      setRequests([...requests, { ...data, id: Date.now() }])
      toast({
        title: 'Solicitação criada',
        description: 'Férias solicitadas com sucesso.',
      })
    }
    setIsDialogOpen(false)
    setEditingRequest(null)
  }

  const handleDelete = () => {
    if (deletingId) {
      setRequests(requests.filter((r) => r.id !== deletingId))
      toast({ title: 'Solicitação removida', variant: 'destructive' })
      setDeletingId(null)
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Aprovada':
        return 'default' // Using default (primary) for approved
      case 'Reprovada':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

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
              initialData={editingRequest}
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
                  {request.employee}
                </TableCell>
                <TableCell>
                  {format(request.startDate, 'dd/MM/yyyy', { locale: ptBR })}
                </TableCell>
                <TableCell>
                  {format(request.endDate, 'dd/MM/yyyy', { locale: ptBR })}
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
