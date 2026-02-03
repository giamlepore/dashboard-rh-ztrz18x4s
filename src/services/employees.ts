import { supabase } from '@/lib/supabase/client'

export interface Employee {
  id: string
  nome: string
  cpf: string
  rg: string
  data_nascimento: string
  endereco: string
  email: string
  telefone: string
  cargo: string
  departamento: string
  data_admissao: string
  salario: number
  tipo_contrato: string
  status: string
  documentos_urls: { name: string; url: string; size: string }[]
  image_gender: string
}

export const getEmployees = async () => {
  const { data, error } = await supabase
    .from('colaboradores')
    .select('*')
    .order('nome', { ascending: true })

  if (error) throw error
  return data as Employee[]
}

export const createEmployee = async (employee: Omit<Employee, 'id'>) => {
  const { data, error } = await supabase
    .from('colaboradores')
    .insert(employee)
    .select()
    .single()

  if (error) throw error
  return data as Employee
}

export const updateEmployee = async (
  id: string,
  employee: Partial<Employee>,
) => {
  const { data, error } = await supabase
    .from('colaboradores')
    .update(employee)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Employee
}

export const deleteEmployee = async (id: string) => {
  const { error } = await supabase.from('colaboradores').delete().eq('id', id)

  if (error) throw error
}

export const uploadDocument = async (file: File, employeeId: string) => {
  const timestamp = new Date().getTime()
  const filePath = `${employeeId}/${timestamp}_${file.name}`

  const { error } = await supabase.storage
    .from('documents')
    .upload(filePath, file)

  if (error) throw error

  const {
    data: { publicUrl },
  } = supabase.storage.from('documents').getPublicUrl(filePath)

  return publicUrl
}
