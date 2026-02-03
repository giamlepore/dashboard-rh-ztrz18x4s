import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Clock, AlertTriangle, FileText } from 'lucide-react'
import { useState } from 'react'
import { ptBR } from 'date-fns/locale'

const logs = [
  {
    id: 1,
    name: 'Ana Souza',
    date: '03/02/2026',
    entry: '09:00',
    exit: '18:00',
    break: '1h',
    status: 'Normal',
    department: 'Produto',
  },
  {
    id: 2,
    name: 'Carlos Lima',
    date: '03/02/2026',
    entry: '09:15',
    exit: '18:15',
    break: '1h',
    status: 'Atraso',
    department: 'Engenharia',
  },
  {
    id: 3,
    name: 'Roberto Dias',
    date: '03/02/2026',
    entry: '08:55',
    exit: '17:55',
    break: '1h',
    status: 'Normal',
    department: 'Engenharia',
  },
  {
    id: 4,
    name: 'João Pedro',
    date: '03/02/2026',
    entry: '-',
    exit: '-',
    break: '-',
    status: 'Falta',
    department: 'Vendas',
  },
  {
    id: 5,
    name: 'Beatriz Silva',
    date: '03/02/2026',
    entry: '09:00',
    exit: '18:00',
    break: '1h',
    status: 'Normal',
    department: 'Produto',
  },
]

export default function Ponto() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Controle de Ponto
          </h1>
          <p className="text-muted-foreground text-sm">
            Gerencie registros de entrada e saída.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" /> Relatório
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <CheckCircle2 className="mr-2 h-4 w-4" /> Aprovar Tudo
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={ptBR}
                className="rounded-md border w-full flex justify-center"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Resumo do Dia
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Presentes</span>
                </div>
                <span className="font-bold">42</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-500" />
                  <span className="text-sm">Atrasos</span>
                </div>
                <span className="font-bold">3</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-rose-500" />
                  <span className="text-sm">Faltas</span>
                </div>
                <span className="font-bold">1</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="h-full border-none shadow-sm">
            <CardHeader>
              <CardTitle>Registros de Hoje</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Colaborador</TableHead>
                    <TableHead>Departamento</TableHead>
                    <TableHead>Entrada</TableHead>
                    <TableHead>Saída</TableHead>
                    <TableHead>Intervalo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.name}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {log.department}
                      </TableCell>
                      <TableCell>{log.entry}</TableCell>
                      <TableCell>{log.exit}</TableCell>
                      <TableCell>{log.break}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            log.status === 'Normal'
                              ? 'text-emerald-600 border-emerald-200 bg-emerald-50'
                              : log.status === 'Atraso'
                                ? 'text-amber-600 border-amber-200 bg-amber-50'
                                : 'text-rose-600 border-rose-200 bg-rose-50'
                          }
                        >
                          {log.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-xs"
                        >
                          Detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
