import { useUserRole } from '@/hooks/use-user-role'
import { CollaboratorVacationView } from '@/components/vacations/CollaboratorVacationView'
import { ManagerVacationView } from '@/components/vacations/ManagerVacationView'

export default function Ferias() {
  const { isEmployee, isAdmin, isManager, loading } = useUserRole()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Gestão de Férias
          </h1>
          <p className="text-muted-foreground">
            {isEmployee
              ? 'Solicite e acompanhe suas férias.'
              : 'Gerencie solicitações de férias da equipe.'}
          </p>
        </div>
      </div>

      {isEmployee && <CollaboratorVacationView />}

      {(isAdmin || isManager) && <ManagerVacationView />}

      {!isEmployee && !isAdmin && !isManager && (
        <div className="text-center p-12 border rounded-lg bg-muted/10">
          <h3 className="text-lg font-medium">Acesso Restrito</h3>
          <p className="text-muted-foreground mt-2">
            Você não tem permissão para visualizar esta página.
          </p>
        </div>
      )}
    </div>
  )
}
