import { useAuth } from '@/hooks/use-auth'
import { Navigate, useLocation } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
