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
  CandidateForm,
  CandidateFormValues,
} from '@/components/forms/CandidateForm'
import { useToast } from '@/hooks/use-toast'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Candidate extends CandidateFormValues {
  id: number
  image?: string
}

const initialCandidates: Candidate[] = [
  {
    id: 1,
    name: 'Juliana Martins',
    role: 'UX Designer',
    status: 'Inscrito',
    image: 'female',
  },
  {
    id: 2,
    name: 'Rafael Costa',
    role: 'Dev Frontend',
    status: 'Entrevista',
    image: 'male',
  },
  {
    id: 3,
    name: 'Lucas Pereira',
    role: 'Backend Dev',
    status: 'Contratado',
    image: 'male',
  },
]

export default function Recrutamento() {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(
    null,
  )
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const { toast } = useToast()

  const handleSubmit = (data: CandidateFormValues) => {
    if (editingCandidate) {
      setCandidates(
        candidates.map((c) =>
          c.id === editingCandidate.id ? { ...c, ...data } : c,
        ),
      )
      toast({
        title: 'Candidato atualizado',
        description: `${data.name} atualizado.`,
      })
    } else {
      setCandidates([
        ...candidates,
        {
          ...data,
          id: Date.now(),
          image: Math.random() > 0.5 ? 'male' : 'female',
        },
      ])
      toast({
        title: 'Candidato adicionado',
        description: `${data.name} adicionado.`,
      })
    }
    setIsDialogOpen(false)
    setEditingCandidate(null)
  }

  const handleDelete = () => {
    if (deletingId) {
      setCandidates(candidates.filter((c) => c.id !== deletingId))
      toast({ title: 'Candidato removido', variant: 'destructive' })
      setDeletingId(null)
    }
  }

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'Contratado':
        return 'default'
      case 'Recusado':
        return 'destructive'
      case 'Entrevista':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Recrutamento</h1>
          <p className="text-muted-foreground text-sm">
            Gerencie o pipeline de contratação.
          </p>
        </div>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) setEditingCandidate(null)
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Adicionar Candidato
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCandidate ? 'Editar Candidato' : 'Novo Candidato'}
              </DialogTitle>
            </DialogHeader>
            <CandidateForm
              initialData={editingCandidate}
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
              <TableHead>Candidato</TableHead>
              <TableHead>Vaga</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {candidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={`https://img.usecurling.com/ppl/thumbnail?gender=${candidate.image}&seed=${candidate.id}`}
                      />
                      <AvatarFallback>
                        {candidate.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{candidate.name}</span>
                  </div>
                </TableCell>
                <TableCell>{candidate.role}</TableCell>
                <TableCell>
                  <Badge variant={getBadgeVariant(candidate.status)}>
                    {candidate.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditingCandidate(candidate)
                      setIsDialogOpen(true)
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500"
                    onClick={() => setDeletingId(candidate.id)}
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
            <AlertDialogTitle>Excluir candidato?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação é irreversível.
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
