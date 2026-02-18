import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getJobById, Job } from '@/services/jobs'
import { submitPublicApplication } from '@/services/recruitment'
import {
  PublicCandidateForm,
  PublicCandidateFormValues,
} from '@/components/forms/PublicCandidateForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Briefcase, Building2, MapPin, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { formatCurrency } from '@/lib/utils' // Assuming this helper exists or I should implement inline

export default function PublicJob() {
  const { id } = useParams<{ id: string }>()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return
      try {
        const data = await getJobById(id)
        if (data.status !== 'Aberta') {
          toast.error('Esta vaga não está mais disponível.')
          navigate('/not-found') // Or just show a message
          return
        }
        setJob(data)
      } catch (error) {
        console.error('Error fetching job:', error)
        toast.error('Vaga não encontrada.')
      } finally {
        setLoading(false)
      }
    }
    fetchJob()
  }, [id, navigate])

  const handleSubmit = async (data: PublicCandidateFormValues, file: File) => {
    if (!job) return

    setSubmitting(true)
    try {
      await submitPublicApplication(
        {
          nome_candidato: data.name,
          email: data.email,
          telefone: data.phone || '',
          vaga_id: job.id,
          vaga: job.titulo,
          organization_id: job.organization_id,
        },
        file,
      )
      setSuccess(true)
      toast.success('Candidatura enviada com sucesso!')
    } catch (error) {
      console.error('Error submitting application:', error)
      toast.error('Erro ao enviar candidatura. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Vaga não encontrada
        </h1>
        <p className="text-gray-600">
          A vaga que você procura não existe ou foi encerrada.
        </p>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md text-center shadow-lg border-emerald-100">
          <CardHeader>
            <div className="mx-auto bg-emerald-100 p-4 rounded-full mb-4">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
            <CardTitle className="text-2xl text-emerald-800">
              Candidatura Recebida!
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Recebemos suas informações para a vaga de{' '}
              <strong>{job.titulo}</strong>.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600">
              Nossa equipe de RH analisará seu perfil e entrará em contato caso
              haja compatibilidade com a vaga.
            </p>
            <p className="text-sm text-muted-foreground">
              Obrigado pelo interesse!
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Job Details Header */}
        <div className="bg-white rounded-xl shadow-sm border p-6 md:p-8 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{job.titulo}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" /> {job.departamento}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" /> {job.tipo_contrato}
                </span>
                {job.salario > 0 && (
                  <span className="flex items-center gap-1 font-medium text-emerald-600">
                    R${' '}
                    {job.salario.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                )}
              </div>
            </div>
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-sm px-3 py-1">
              Vaga Aberta
            </Badge>
          </div>

          <Separator />

          <div className="space-y-6 pt-2">
            <div>
              <h3 className="text-lg font-semibold mb-2">Descrição da Vaga</h3>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {job.descricao || 'Sem descrição detalhada.'}
              </p>
            </div>

            {job.requisitos && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Requisitos</h3>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {job.requisitos}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Application Form */}
        <Card className="shadow-lg border-primary/10">
          <CardHeader className="bg-primary/5 border-b">
            <CardTitle>Candidate-se agora</CardTitle>
            <CardDescription>
              Preencha os dados abaixo e anexe seu currículo para participar do
              processo seletivo.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <PublicCandidateForm
              onSubmit={handleSubmit}
              isLoading={submitting}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
