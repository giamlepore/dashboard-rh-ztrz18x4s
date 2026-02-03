import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, MoreHorizontal, Mail, Phone } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'

const employees = [
  {
    id: 1,
    name: 'Ana Souza',
    role: 'UX Designer',
    dept: 'Produto',
    status: 'Ativo',
    email: 'ana.souza@company.com',
    phone: '(11) 99999-0001',
    image: 'female',
  },
  {
    id: 2,
    name: 'Carlos Lima',
    role: 'Dev Frontend',
    dept: 'Engenharia',
    status: 'Ativo',
    email: 'carlos.lima@company.com',
    phone: '(11) 99999-0002',
    image: 'male',
  },
  {
    id: 3,
    name: 'Mariana Costa',
    role: 'Gerente de RH',
    dept: 'Recursos Humanos',
    status: 'Férias',
    email: 'mariana.costa@company.com',
    phone: '(11) 99999-0003',
    image: 'female',
  },
  {
    id: 4,
    name: 'Roberto Dias',
    role: 'Dev Backend',
    dept: 'Engenharia',
    status: 'Ativo',
    email: 'roberto.dias@company.com',
    phone: '(11) 99999-0004',
    image: 'male',
  },
  {
    id: 5,
    name: 'Fernanda Alves',
    role: 'Marketing Lead',
    dept: 'Marketing',
    status: 'Ausente',
    email: 'fernanda.alves@company.com',
    phone: '(11) 99999-0005',
    image: 'female',
  },
  {
    id: 6,
    name: 'João Pedro',
    role: 'Sales Rep',
    dept: 'Vendas',
    status: 'Ativo',
    email: 'joao.pedro@company.com',
    phone: '(11) 99999-0006',
    image: 'male',
  },
  {
    id: 7,
    name: 'Beatriz Silva',
    role: 'Product Manager',
    dept: 'Produto',
    status: 'Ativo',
    email: 'beatriz.silva@company.com',
    phone: '(11) 99999-0007',
    image: 'female',
  },
]

export default function Colaboradores() {
  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Colaboradores</h1>
          <p className="text-muted-foreground text-sm">
            Gerencie a equipe, visualize perfis e status.
          </p>
        </div>
        <Button className="shrink-0 bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> Novo Colaborador
        </Button>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Filtrar por nome ou cargo..."
                className="pl-9 bg-background"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Colaborador</TableHead>
                  <TableHead>Departamento</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Contato
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={`https://img.usecurling.com/ppl/thumbnail?gender=${employee.image}&seed=${employee.id}`}
                          />
                          <AvatarFallback>
                            {employee.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm">
                            {employee.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {employee.role}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{employee.dept}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-col text-xs text-muted-foreground gap-1">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" /> {employee.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" /> {employee.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          employee.status === 'Ativo' ? 'default' : 'secondary'
                        }
                        className={
                          employee.status === 'Ativo'
                            ? 'bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 border-emerald-200'
                            : employee.status === 'Férias'
                              ? 'bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 border-amber-200'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'
                        }
                      >
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Ações</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuItem>Ver Perfil</DropdownMenuItem>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Desativar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
