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
import { Plus, Pencil, ArrowLeft } from 'lucide-react'
import { JobForm, JobFormValues } from '@/components/forms/JobForm'
import { useToast } from '@/hooks/use-toast'
import { getJobs, createJob, updateJob, Job } from '@/services/jobs'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

export default function Vagas() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const { toast } = useToast()
  const navigate = useNavigate()

  const fetchJobs = async () => {
    try {
      const data = await getJobs()
      setJobs(data)
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar as vagas.',
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const handleSubmit = async (data: JobFormValues) => {
    try {
      if (editingJob) {
        await updateJob(editingJob.id, data)
        toast({ title: 'Sucesso', description: 'Vaga atualizada.' })
      } else {
        await createJob(data)
        toast({ title: 'Sucesso', description: 'Nova vaga criada.' })
      }
      setIsDialogOpen(false)
      setEditingJob(null)
      fetchJobs()
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro',
        description: 'Erro ao salvar vaga.',
        variant: 'destructive',
      })
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
            <h1 className="text-2xl font-bold tracking-tight">
              Gestão de Vagas
            </h1>
            <p className="text-muted-foreground text-sm">
              Visualize e gerencie oportunidades em aberto.
            </p>
          </div>
        </div>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) setEditingJob(null)
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Nova Vaga
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingJob ? 'Editar Vaga' : 'Nova Vaga'}
              </DialogTitle>
            </DialogHeader>
            <JobForm
              initialData={editingJob}
              onSubmit={handleSubmit}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Candidatos</TableHead>
              <TableHead>Publicação</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center h-32 text-muted-foreground"
                >
                  Nenhuma vaga encontrada.
                </TableCell>
              </TableRow>
            ) : (
              jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.titulo}</TableCell>
                  <TableCell>{job.departamento}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        job.status === 'Aberta' ? 'default' : 'secondary'
                      }
                      className={cn(
                        job.status === 'Aberta' &&
                          'bg-emerald-600 hover:bg-emerald-700',
                      )}
                    >
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">
                        {job.candidates_count || 0}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        inscritos
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {format(new Date(job.created_at), "dd 'de' MMM, yyyy", {
                      locale: ptBR,
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditingJob(job)
                        setIsDialogOpen(true)
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
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
