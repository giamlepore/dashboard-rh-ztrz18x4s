import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Plus, Search, Users, Loader2, Inbox } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  CandidateForm,
  CandidateFormValues,
} from '@/components/forms/CandidateForm'
import { useToast } from '@/hooks/use-toast'
import {
  getCandidates,
  createCandidate,
  updateCandidate,
  uploadCandidateCV,
  downloadCandidateCV,
  Candidate,
} from '@/services/recruitment'
import { getJobs, Job } from '@/services/jobs'
import { useNavigate } from 'react-router-dom'
import { CandidateCard } from '@/components/CandidateCard'

export default function Candidatos() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([])
  const [jobs, setJobs] = useState<Job[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(
    null,
  )
  const [loading, setLoading] = useState(true)

  // Upload/Download states
  const [uploadingId, setUploadingId] = useState<string | null>(null)
  const [downloadingId, setDownloadingId] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const candidateIdRef = useRef<string | null>(null)

  const { toast } = useToast()
  const navigate = useNavigate()

  const fetchData = async () => {
    setLoading(true)
    try {
      const [candidatesData, jobsData] = await Promise.all([
        getCandidates(),
        getJobs(),
      ])
      setCandidates(candidatesData)
      setFilteredCandidates(candidatesData)
      setJobs(jobsData)
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro',
        description: 'Erro ao carregar dados.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const results = candidates.filter(
      (c) =>
        c.nome_candidato.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.email && c.email.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    setFilteredCandidates(results)
  }, [searchTerm, candidates])

  const handleSubmit = async (data: CandidateFormValues) => {
    try {
      const selectedJob = jobs.find((j) => j.id === data.vaga_id)
      const jobTitle = selectedJob ? selectedJob.titulo : 'N/A'

      const payload = {
        nome_candidato: data.name,
        email: data.email,
        telefone: data.phone,
        vaga_id: data.vaga_id,
        vaga: jobTitle,
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

  const handleCVClick = (candidateId: string) => {
    candidateIdRef.current = candidateId
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
      fileInputRef.current.click()
    }
  }

  const handleDownloadCV = async (candidate: Candidate) => {
    if (!candidate.curriculo_url) return

    try {
      setDownloadingId(candidate.id)
      const blob = await downloadCandidateCV(candidate.curriculo_url)

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url

      const extension = candidate.curriculo_url.split('.').pop() || 'pdf'
      const filename = `${candidate.nome_candidato.replace(/\s+/g, '_').toLowerCase()}_cv.${extension}`

      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()

      link.parentNode?.removeChild(link)
      window.URL.revokeObjectURL(url)

      toast({
        title: 'Download concluído',
        description: 'O currículo foi baixado com sucesso.',
      })
    } catch (error) {
      console.error('Erro no download:', error)
      toast({
        title: 'Erro no download',
        description: 'Não foi possível baixar o arquivo.',
        variant: 'destructive',
      })
    } finally {
      setDownloadingId(null)
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      toast({
        title: 'Formato inválido',
        description: 'Por favor, selecione um arquivo PDF.',
        variant: 'destructive',
      })
      return
    }

    const id = candidateIdRef.current
    if (!id) return

    try {
      setUploadingId(id)
      await uploadCandidateCV(id, file)
      toast({
        title: 'Sucesso',
        description: 'CV enviado e vinculado com sucesso.',
      })
      fetchData()
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro no upload',
        description: 'Não foi possível enviar o CV.',
        variant: 'destructive',
      })
    } finally {
      setUploadingId(null)
      candidateIdRef.current = null
    }
  }

  return (
    <div className="min-h-screen bg-cream font-sans text-ink pb-12">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".pdf"
        onChange={handleFileChange}
      />

      <nav className="sticky top-0 left-0 w-full z-40 mix-blend-difference text-cream px-6 py-4 flex items-center justify-between pointer-events-none bg-cream/5 backdrop-blur-sm md:bg-transparent">
        <div className="pointer-events-auto flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/recrutamento')}
            className="hover:bg-ink/10 text-ink"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span className="text-xl font-medium tracking-tight font-instrument text-ink">
            Candidatos.
          </span>
        </div>
      </nav>

      <div className="px-4 md:px-6 lg:px-8 pt-6 max-w-[1600px] mx-auto animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-min">
          {/* Hero Section */}
          <div className="col-span-1 md:col-span-8 bg-sage rounded-[24px] p-8 md:p-12 relative overflow-hidden min-h-[300px] flex flex-col justify-between group">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <svg
                className="w-[200%] h-full animate-drift"
                viewBox="0 0 200 100"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,50 Q50,110 100,50 T200,50"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="0.5"
                />
                <path
                  d="M0,80 Q50,140 100,80 T200,80"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="0.5"
                />
              </svg>
            </div>
            <div className="relative z-10">
              <h1 className="font-instrument text-5xl md:text-7xl leading-[0.9] tracking-tight text-ink max-w-2xl">
                Talentos & <br />
                <span className="italic">Potencial</span>
              </h1>
              <p className="text-ink/80 text-lg mt-4 max-w-md font-medium">
                Acompanhe o desenvolvimento e a jornada de cada candidato em seu
                pipeline.
              </p>
            </div>
            <div className="relative z-10 flex gap-8 mt-8">
              <div>
                <span className="block font-instrument text-4xl">
                  {candidates.length}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest opacity-70">
                  Total
                </span>
              </div>
              <div>
                <span className="block font-instrument text-4xl">
                  {candidates.filter((c) => c.status === 'Entrevista').length}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest opacity-70">
                  Em Entrevista
                </span>
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-4">
            <div className="bg-white/50 backdrop-blur-sm border border-ink/5 rounded-[24px] p-6 flex-1 flex flex-col justify-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-ink/40" />
                <Input
                  placeholder="Buscar por nome ou email..."
                  className="pl-10 bg-cream/50 border-ink/10 h-10 rounded-xl focus:ring-sage"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Dialog
                open={isDialogOpen}
                onOpenChange={(open) => {
                  setIsDialogOpen(open)
                  if (!open) setEditingCandidate(null)
                }}
              >
                <DialogTrigger asChild>
                  <Button className="w-full h-12 rounded-xl bg-ink text-cream hover:bg-sage hover:text-ink transition-all font-medium text-base">
                    <Plus className="mr-2 h-5 w-5" /> Adicionar Candidato
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="font-instrument text-3xl">
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

            {/* Decorative Stat */}
            <div className="bg-salmon rounded-[24px] p-6 flex items-center justify-between relative overflow-hidden h-32">
              <div className="relative z-10">
                <span className="block font-instrument text-2xl">
                  Contratados
                </span>
                <span className="text-xs font-bold uppercase tracking-widest opacity-60">
                  Este Mês
                </span>
              </div>
              <Users className="w-16 h-16 opacity-20 absolute right-[-10px] bottom-[-10px]" />
            </div>
          </div>

          {/* Grid of Candidates */}
          <div className="col-span-1 md:col-span-12 mt-4">
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-salmon" />
              </div>
            ) : filteredCandidates.length === 0 ? (
              <div className="text-center py-20 bg-ink/5 rounded-[24px] flex flex-col items-center justify-center gap-4">
                <Inbox className="h-12 w-12 text-ink/20" />
                <p className="font-instrument text-2xl text-ink/40 italic">
                  Nenhum candidato encontrado.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filteredCandidates.map((candidate) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    onEdit={(c) => {
                      setEditingCandidate(c)
                      setIsDialogOpen(true)
                    }}
                    onStatusChange={handleStatusChange}
                    onCVClick={handleCVClick}
                    onDownloadCV={handleDownloadCV}
                    uploadingId={uploadingId}
                    downloadingId={downloadingId}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
