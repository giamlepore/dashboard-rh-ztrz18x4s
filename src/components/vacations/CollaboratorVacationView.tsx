import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { format, differenceInDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DatePickerWithRange } from '@/components/ui/date-range-picker'
import { useToast } from '@/hooks/use-toast'
import {
  createVacation,
  getVacationsByEmployeeId,
  Vacation,
} from '@/services/vacations'
import { useUserRole } from '@/hooks/use-user-role'

const formSchema = z.object({
  dateRange: z.object(
    {
      from: z.date({ required_error: 'Data inicial é obrigatória' }),
      to: z.date({ required_error: 'Data final é obrigatória' }),
    },
    { required_error: 'Período é obrigatório' },
  ),
  observacoes: z.string().optional(),
})

type VacationFormValues = z.infer<typeof formSchema>

export function CollaboratorVacationView() {
  const { colaboradorId } = useUserRole()
  const { toast } = useToast()
  const [vacations, setVacations] = useState<Vacation[]>([])
  const [loading, setLoading] = useState(true)

  const form = useForm<VacationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      observacoes: '',
    },
  })

  const fetchVacations = async () => {
    if (!colaboradorId) return
    try {
      setLoading(true)
      const data = await getVacationsByEmployeeId(colaboradorId)
      setVacations(data)
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
    fetchVacations()
  }, [colaboradorId])

  const onSubmit = async (data: VacationFormValues) => {
    if (!colaboradorId) {
      toast({
        title: 'Erro',
        description: 'Perfil de colaborador não encontrado.',
        variant: 'destructive',
      })
      return
    }

    try {
      const { from, to } = data.dateRange
      await createVacation({
        colaborador_id: colaboradorId,
        data_inicio: format(from, 'yyyy-MM-dd'),
        data_fim: format(to, 'yyyy-MM-dd'),
        observacoes: data.observacoes,
      })

      toast({
        title: 'Sucesso',
        description: 'Solicitação de férias enviada.',
      })

      form.reset({ observacoes: '' })
      // Reset date manually if needed, or form reset handles it if controlled properly
      // We might need to manually clear the date picker state if it doesn't sync perfectly

      fetchVacations()
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro',
        description: 'Erro ao enviar solicitação.',
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
    <div className="space-y-8 animate-fade-in">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Nova Solicitação de Férias</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="dateRange"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Período de Férias</FormLabel>
                      <DatePickerWithRange
                        date={field.value as DateRange}
                        setDate={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="observacoes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Observações</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Alguma observação importante sobre suas férias?"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Solicitar Férias
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Minhas Solicitações</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center p-4">Carregando...</div>
            ) : vacations.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Nenhuma solicitação encontrada.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Período</TableHead>
                    <TableHead>Dias</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vacations.map((req) => {
                    const start = new Date(req.data_inicio)
                    const end = new Date(req.data_fim)
                    // Inclusive days count
                    const days = differenceInDays(end, start) + 1

                    return (
                      <TableRow key={req.id}>
                        <TableCell className="text-sm">
                          {format(start, 'dd/MM/yyyy')} -{' '}
                          {format(end, 'dd/MM/yyyy')}
                        </TableCell>
                        <TableCell>{days}</TableCell>
                        <TableCell>
                          <Badge
                            variant={getStatusVariant(req.status)}
                            className={getStatusClass(req.status)}
                          >
                            {req.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
