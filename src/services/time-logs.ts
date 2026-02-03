import { supabase } from '@/lib/supabase/client'

export interface TimeLog {
  id: string
  colaborador_id: string
  data: string
  hora_entrada: string
  hora_saida: string
  colaboradores?: {
    nome: string
  }
}

export const getTimeLogs = async () => {
  const { data, error } = await supabase
    .from('ponto')
    .select('*, colaboradores(nome)')
    .order('data', { ascending: false })

  if (error) throw error
  return data as TimeLog[]
}

export const createTimeLog = async (
  log: Omit<TimeLog, 'id' | 'colaboradores'>,
) => {
  const { data, error } = await supabase
    .from('ponto')
    .insert(log)
    .select('*, colaboradores(nome)')
    .single()

  if (error) throw error
  return data as TimeLog
}

export const updateTimeLog = async (id: string, log: Partial<TimeLog>) => {
  const { data, error } = await supabase
    .from('ponto')
    .update(log)
    .eq('id', id)
    .select('*, colaboradores(nome)')
    .single()

  if (error) throw error
  return data as TimeLog
}

export const deleteTimeLog = async (id: string) => {
  const { error } = await supabase.from('ponto').delete().eq('id', id)

  if (error) throw error
}
