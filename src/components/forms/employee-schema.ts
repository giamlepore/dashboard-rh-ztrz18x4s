import * as z from 'zod'

export const employeeSchema = z.object({
  // Dados Pessoais
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  cpf: z.string().min(11, 'CPF deve ter 11 dígitos').max(14, 'CPF inválido'),
  rg: z.string().optional(),
  birthDate: z.date({ required_error: 'Data de nascimento é obrigatória' }),
  address: z.string().min(5, 'Endereço completo é obrigatório'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone inválido'),

  // Dados Profissionais
  role: z.string().min(2, 'Cargo é obrigatório'),
  dept: z.string().min(2, 'Departamento é obrigatório'),
  admissionDate: z.date({ required_error: 'Data de admissão é obrigatória' }),
  salary: z.coerce.number().min(1, 'Salário deve ser maior que 0'),
  contractType: z.string({ required_error: 'Tipo de contrato é obrigatório' }),
  status: z.string().default('Ativo'),
})

export type EmployeeFormValues = z.infer<typeof employeeSchema>
