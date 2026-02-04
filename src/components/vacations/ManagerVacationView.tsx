import { useState, useEffect } from 'react'
import { format, differenceInDays, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Check, X } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useToast } from '@/hooks/use-toast'
import { getVacations, updateVacation, Vacation } from '@/services/vacations'

export function ManagerVacationView() {
  const [requests, setRequests] = useState<Vacation[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchRequests = async () => {
    try {
      setLoading(true)
      const data = await getVacations()
      setRequests(data)
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro',
        description: 'Erro ao carregar solicitações.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  const handleStatusUpdate = async (
    id: string,
    newStatus: 'Aprovada' | 'Reprovada',
  ) => {
    try {
      await updateVacation(id, { status: newStatus })
      toast({
        title: 'Sucesso',
        description: `Solicitação ${newStatus.toLowerCase()}.`,
        variant: newStatus === 'Aprovada' ? 'default' : 'destructive',
      })
      fetchRequests()
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar status.',
        variant: 'destructive',
      })
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Aprovada':
        return 'default'
      case 'Reprovada':
        return 'destructive'
      case 'Pendente':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  const getStatusClass = (status: string) => {
    if (status === 'Aprovada') return 'bg-emerald-600 hover:bg-emerald-700'
    return ''
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Solicitações de Férias</CardTitle>
          <CardDescription>
            Gerencie as solicitações de férias dos colaboradores.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Colaborador</TableHead>
                  <TableHead>Período Solicitado</TableHead>
                  <TableHead>Dias</TableHead>
                  <TableHead>Observações</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">
                      Carregando...
                    </TableCell>
                  </TableRow>
                ) : requests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">
                      Nenhuma solicitação encontrada.
                    </TableCell>
                  </TableRow>
                ) : (
                  requests.map((request) => {
                    const start = parseISO(request.data_inicio)
                    const end = parseISO(request.data_fim)
                    const days = differenceInDays(end, start) + 1

                    return (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">
                          {request.colaboradores?.nome || 'Desconhecido'}
                        </TableCell>
                        <TableCell>
                          {format(start, 'dd/MM/yyyy')} -{' '}
                          {format(end, 'dd/MM/yyyy')}
                        </TableCell>
                        <TableCell>{days}</TableCell>
                        <TableCell
                          className="max-w-[200px] truncate"
                          title={request.observacoes}
                        >
                          {request.observacoes || '-'}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={getStatusVariant(request.status)}
                            className={getStatusClass(request.status)}
                          >
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {request.status === 'Pendente' && (
                            <div className="flex justify-end gap-2">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                                    onClick={() =>
                                      handleStatusUpdate(request.id, 'Aprovada')
                                    }
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Aprovar</TooltipContent>
                              </Tooltip>

                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={() =>
                                      handleStatusUpdate(
                                        request.id,
                                        'Reprovada',
                                      )
                                    }
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Reprovar</TooltipContent>
                              </Tooltip>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
