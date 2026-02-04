import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { getUserProfile, UserProfile } from '@/services/profile'

export function useUserRole() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<UserProfile>({
    role: 'Colaborador',
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
        setLoading(false)
      }
    }

    fetchRole()
  }, [user])

  return {
    ...profile,
    loading,
    isAdmin: profile.role === 'Admin',
    isManager: profile.role === 'Gerente',
    isEmployee: profile.role === 'Colaborador',
  }
}
