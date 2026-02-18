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
import { createOrganization } from '@/services/organization'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { useState, useEffect } from 'react'

export default function CompleteProfile() {
  const { user } = useAuth()
  const { refreshProfile } = useUserRole()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [inviteOrgId, setInviteOrgId] = useState<string | null>(null)

  useEffect(() => {
    const storedOrgId = localStorage.getItem('inviteOrgId')
    if (storedOrgId) {
      setInviteOrgId(storedOrgId)
    }
  }, [])

  const handleSubmit = async (data: CompleteProfileFormValues) => {
    if (!user) return

    setLoading(true)
    try {
      let finalOrgId = inviteOrgId
      let finalRole = inviteOrgId ? 'visitante' : 'Admin'

      if (!inviteOrgId) {
        // User is creating a new organization (Admin Flow)
        try {
          const orgName = `Organização de ${data.name}`
          const newOrg = await createOrganization(orgName)
          finalOrgId = newOrg.id
        } catch (orgError: any) {
          console.error('Error creating organization:', orgError)
          throw new Error(
            `Erro ao criar organização: ${orgError.message || 'Erro desconhecido'}`,
          )
        }
      }

      if (!finalOrgId) {
        throw new Error('ID da organização não foi gerado.')
      }

      // Create Employee Record
      await createEmployee({
        nome: data.name,
        email: data.email,
        cpf: data.cpf,
        rg: data.rg || '',
        telefone: data.phone,
        endereco: data.address,
        data_nascimento: format(data.birthDate, 'yyyy-MM-dd'),

        // System fields
        user_id: user.id,
        role: finalRole as 'Admin' | 'visitante',
        status: 'Ativo',
        cargo: inviteOrgId ? 'A definir' : 'Administrador',
        departamento: 'Gestão',
        data_admissao: format(new Date(), 'yyyy-MM-dd'),
        salario: 0,
        tipo_contrato: 'CLT',
        documentos_urls: [],
        image_gender: Math.random() > 0.5 ? 'male' : 'female',
        organization_id: finalOrgId,
      })

      // Clean up invite
      if (inviteOrgId) {
        localStorage.removeItem('inviteOrgId')
      }

      toast.success('Perfil completado com sucesso!')
      await refreshProfile()

      // Redirect logic based on role
      if (finalRole === 'visitante') {
        navigate('/visitor', { replace: true })
      } else {
        navigate('/', { replace: true })
      }
    } catch (error: any) {
      console.error(error)
      toast.error('Erro ao salvar perfil', {
        description: error.message || 'Verifique os dados e tente novamente.',
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
          <CardDescription>
            {inviteOrgId
              ? 'Finalize seu cadastro para entrar na organização.'
              : 'Vamos configurar sua nova organização.'}
          </CardDescription>
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
