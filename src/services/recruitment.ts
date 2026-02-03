import { supabase } from '@/lib/supabase/client'

export interface Candidate {
  id: string
  nome_candidato: string
  vaga: string
  status: string
  image_gender: string
}

export const getCandidates = async () => {
  const { data, error } = await supabase
    .from('recrutamento')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Candidate[]
}

export const createCandidate = async (candidate: Omit<Candidate, 'id'>) => {
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
