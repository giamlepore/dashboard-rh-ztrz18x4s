import { supabase } from '@/lib/supabase/client'
import { Job } from './jobs'

export interface Candidate {
  id: string
  nome_candidato: string
  vaga: string // Legacy field, we might keep it synced or use vaga_id relation
  vaga_id?: string | null
  vagas?: Job // Relation
  status:
    | 'Triagem'
    | 'Entrevista'
    | 'Aprovado'
    | 'Reprovado'
    | 'Inscrito'
    | 'Contratado'
    | 'Recusado'
  email?: string
  telefone?: string
  image_gender: string
  created_at: string
  curriculo_url?: string | null
}

export const getCandidates = async () => {
  const { data, error } = await supabase
    .from('recrutamento')
    .select('*, vagas(*)')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Candidate[]
}

export const createCandidate = async (candidate: Partial<Candidate>) => {
  const { data, error } = await supabase
    .from('recrutamento')
    .insert(candidate)
    .select()
    .single()

  if (error) throw error
  return data as Candidate
}

export const updateCandidate = async (
  id: string,
  candidate: Partial<Candidate>,
) => {
  const { data, error } = await supabase
    .from('recrutamento')
    .update(candidate)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Candidate
}

export const deleteCandidate = async (id: string) => {
  const { error } = await supabase.from('recrutamento').delete().eq('id', id)

  if (error) throw error
}

export const uploadCandidateCV = async (id: string, file: File) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${id}-cv-${Date.now()}.${fileExt}`
  const filePath = `candidates/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('documents')
    .upload(filePath, file, { upsert: true })

  if (uploadError) throw uploadError

  const {
    data: { publicUrl },
  } = supabase.storage.from('documents').getPublicUrl(filePath)

  await updateCandidate(id, { curriculo_url: publicUrl })

  return publicUrl
}
