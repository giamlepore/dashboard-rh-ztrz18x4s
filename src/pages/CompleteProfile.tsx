import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { useUserRole } from '@/hooks/use-user-role'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { CompleteProfileForm } from '@/components/forms/CompleteProfileForm'
import { CompleteProfileFormValues } from '@/components/forms/complete-profile-schema'
import { createEmployee } from '@/services/employees'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { useState } from 'react'

export default function CompleteProfile() {
  const { user } = useAuth()
  const { refreshProfile } = useUserRole()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data: CompleteProfileFormValues) => {
    if (!user) return

    setLoading(true)
    try {
      await createEmployee({
        nome: data.name,
        email: data.email,
        cpf: data.cpf,
        rg: data.rg || '',
        telefone: data.phone,
        endereco: data.address,
        data_nascimento: format(data.birthDate, 'yyyy-MM-dd'),

        // Default / System fields
        user_id: user.id,
        role: 'visitante',
        status: 'Ativo',
        cargo: 'A definir',
        departamento: 'A definir',
        data_admissao: format(new Date(), 'yyyy-MM-dd'),
        salario: 0,
        tipo_contrato: 'A definir',
        documentos_urls: [],
        image_gender: 'male', // Could be inferred or asked, defaulting for now
      })

      toast.success('Perfil completado com sucesso!')

      // Refresh user role to update state in ProtectedRoute
      await refreshProfile()

      // Navigate to home (which will redirect to visitor dashboard)
      navigate('/')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao salvar perfil', {
        description: 'Tente novamente mais tarde.',
      })
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            Complete seu Perfil
          </CardTitle>
          <CardDescription>Passo 2: Informações Pessoais</CardDescription>
        </CardHeader>
        <CardContent>
          <CompleteProfileForm
            defaultEmail={user.email || ''}
            onSubmit={handleSubmit}
            isLoading={loading}
          />
        </CardContent>
      </Card>
    </div>
  )
}
