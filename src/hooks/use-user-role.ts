import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { getUserProfile, UserProfile } from '@/services/profile'

export function useUserRole() {
  const { user, loading: authLoading } = useAuth()
  const [profile, setProfile] = useState<UserProfile>({
    role: null,
    colaboradorId: null,
    employee: null,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRole() {
      if (user) {
        try {
          const userProfile = await getUserProfile(user.id)
          setProfile(userProfile)
        } catch (error) {
          console.error('Failed to fetch user role', error)
        } finally {
          setLoading(false)
        }
      } else {
        setProfile({
          role: null,
          colaboradorId: null,
          employee: null,
        })
        setLoading(false)
      }
    }

    if (!authLoading) {
      fetchRole()
    }
  }, [user, authLoading])

  return {
    ...profile,
    loading: loading || authLoading,
    isAdmin: profile.role === 'Admin',
    isManager: profile.role === 'Gerente',
    isEmployee: profile.role === 'Colaborador',
    isVisitor: profile.role === 'visitante',
    hasProfile: !!profile.employee,
    refreshProfile: async () => {
      if (user) {
        const userProfile = await getUserProfile(user.id)
        setProfile(userProfile)
      }
    },
  }
}
