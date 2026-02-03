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
  CandidateForm,
  CandidateFormValues,
} from '@/components/forms/CandidateForm'
import { useToast } from '@/hooks/use-toast'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  getCandidates,
  createCandidate,
  updateCandidate,
  deleteCandidate,
  Candidate,
} from '@/services/recruitment'

export default function Recrutamento() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(
    null,
  )
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchCandidates = async () => {
    try {
      const data = await getCandidates()
      setCandidates(data)
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro',
        description: 'Erro ao carregar candidatos.',
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    fetchCandidates()
  }, [])

  const handleSubmit = async (data: CandidateFormValues) => {
    try {
      if (editingCandidate) {
        await updateCandidate(editingCandidate.id, {
          nome_candidato: data.name,
          vaga: data.role,
          status: data.status,
        })
        toast({ title: 'Sucesso', description: 'Candidato atualizado.' })
      } else {
        await createCandidate({
          nome_candidato: data.name,
          vaga: data.role,
          status: data.status,
          image_gender: Math.random() > 0.5 ? 'male' : 'female',
        })
        toast({ title: 'Sucesso', description: 'Candidato adicionado.' })
      }
      setIsDialogOpen(false)
      setEditingCandidate(null)
      fetchCandidates()
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro',
        description: 'Erro ao salvar candidato.',
        variant: 'destructive',
      })
    }
  }

  const handleDelete = async () => {
    if (deletingId) {
      try {
        await deleteCandidate(deletingId)
        fetchCandidates()
        toast({
          title: 'Sucesso',
          description: 'Candidato removido.',
          variant: 'destructive',
        })
      } catch (error) {
        console.error(error)
        toast({
          title: 'Erro',
          description: 'Erro ao remover candidato.',
          variant: 'destructive',
        })
      }
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

  const mapToForm = (c: Candidate): CandidateFormValues => ({
    name: c.nome_candidato,
    role: c.vaga,
    status: c.status as any,
  })

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
              initialData={
                editingCandidate ? mapToForm(editingCandidate) : null
              }
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
                        src={`https://img.usecurling.com/ppl/thumbnail?gender=${candidate.image_gender}&seed=${candidate.id}`}
                      />
                      <AvatarFallback>
                        {candidate.nome_candidato.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">
                      {candidate.nome_candidato}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{candidate.vaga}</TableCell>
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
