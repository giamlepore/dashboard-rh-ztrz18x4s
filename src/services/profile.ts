import { supabase } from '@/lib/supabase/client'
import { Employee } from './employees'

export interface UserProfile {
  role: 'Admin' | 'Gerente' | 'Colaborador'
  colaboradorId: string | null
  employee: Employee | null
}

export const getUserProfile = async (userId: string): Promise<UserProfile> => {
  const { data, error } = await supabase
    .from('colaboradores')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error && error.code !== 'PGRST116') {
    // PGRST116 is "Row not found" - acceptable if user hasn't been linked yet
    console.error('Error fetching user profile:', error)
  }

  if (!data) {
    return {
      role: 'Colaborador', // Default to lowest permission
      colaboradorId: null,
      employee: null,
    }
  }

  return {
    role: (data.role as 'Admin' | 'Gerente' | 'Colaborador') || 'Colaborador',
    colaboradorId: data.id,
    employee: data as Employee,
  }
}
