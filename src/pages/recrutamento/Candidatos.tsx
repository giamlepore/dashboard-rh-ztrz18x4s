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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Plus,
  Pencil,
  MoreVertical,
  FileText,
  ArrowLeft,
  Mail,
  Phone,
} from 'lucide-react'
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
  Candidate,
} from '@/services/recruitment'
import { getJobs, Job } from '@/services/jobs'
import { useNavigate } from 'react-router-dom'

export default function Candidatos() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [jobs, setJobs] = useState<Job[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(
    null,
  )
  const { toast } = useToast()
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const [candidatesData, jobsData] = await Promise.all([
        getCandidates(),
        getJobs(),
      ])
      setCandidates(candidatesData)
      setJobs(jobsData)
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

  const handleSubmit = async (data: CandidateFormValues) => {
    try {
      const selectedJob = jobs.find((j) => j.id === data.vaga_id)
      const jobTitle = selectedJob ? selectedJob.titulo : 'N/A'

      const payload = {
        nome_candidato: data.name,
        email: data.email,
        telefone: data.phone,
        vaga_id: data.vaga_id,
        vaga: jobTitle, // Keeping legacy field populated
        status: data.status,
      }

      if (editingCandidate) {
        await updateCandidate(editingCandidate.id, payload)
        toast({ title: 'Sucesso', description: 'Candidato atualizado.' })
      } else {
        await createCandidate({
          ...payload,
          image_gender: Math.random() > 0.5 ? 'male' : 'female',
        })
        toast({ title: 'Sucesso', description: 'Candidato adicionado.' })
      }
      setIsDialogOpen(false)
      setEditingCandidate(null)
      fetchData()
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro',
        description: 'Erro ao salvar candidato.',
        variant: 'destructive',
      })
    }
  }

  const handleStatusChange = async (id: string, newStatus: any) => {
    try {
      await updateCandidate(id, { status: newStatus })
      toast({ title: 'Status atualizado' })
      fetchData()
    } catch (error) {
      toast({ title: 'Erro ao atualizar status', variant: 'destructive' })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprovado':
      case 'Contratado':
        return 'default' // Primary/Black
      case 'Reprovado':
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/recrutamento')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Candidatos</h1>
            <p className="text-muted-foreground text-sm">
              Gerencie os processos seletivos e candidatos.
            </p>
          </div>
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
              <TableHead>Contatos</TableHead>
              <TableHead>Vaga</TableHead>
              <TableHead>Etapa</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {candidates.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center h-32 text-muted-foreground"
                >
                  Nenhum candidato encontrado.
                </TableCell>
              </TableRow>
            ) : (
              candidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={`https://img.usecurling.com/ppl/thumbnail?gender=${candidate.image_gender}&seed=${candidate.id}`}
                        />
                        <AvatarFallback>
                          {candidate.nome_candidato.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {candidate.nome_candidato}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Adicionado em{' '}
                          {new Date(candidate.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1 text-sm">
                      {candidate.email && (
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Mail className="h-3 w-3" /> {candidate.email}
                        </div>
                      )}
                      {candidate.telefone && (
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Phone className="h-3 w-3" /> {candidate.telefone}
                        </div>
                      )}
                      {!candidate.email && !candidate.telefone && (
                        <span className="text-muted-foreground text-xs italic">
                          Sem contato
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {candidate.vagas?.titulo || candidate.vaga}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(candidate.status)}>
                      {candidate.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="hidden md:flex"
                        title="Visualizar Currículo"
                      >
                        <FileText className="h-4 w-4 mr-1" /> CV
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setEditingCandidate(candidate)
                              setIsDialogOpen(true)
                            }}
                          >
                            <Pencil className="h-4 w-4 mr-2" /> Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(candidate.id, 'Triagem')
                            }
                          >
                            Mover para Triagem
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(candidate.id, 'Entrevista')
                            }
                          >
                            Mover para Entrevista
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(candidate.id, 'Aprovado')
                            }
                          >
                            Marcar como Aprovado
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(candidate.id, 'Reprovado')
                            }
                          >
                            Marcar como Reprovado
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
