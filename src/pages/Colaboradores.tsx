import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Plus, Pencil, Trash2, Search, Columns, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { EmployeeForm } from '@/components/forms/EmployeeForm'
import { type EmployeeFormValues } from '@/components/forms/employee-schema'
import { useToast } from '@/hooks/use-toast'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface Employee extends EmployeeFormValues {
  id: number
  image?: string
}

const initialEmployees: Employee[] = [
  {
    id: 1,
    name: 'Ana Souza',
    role: 'UX Designer',
    dept: 'Produto',
    email: 'ana.souza@company.com',
    image: 'female',
    cpf: '123.456.789-00',
    rg: '12.345.678-9',
    birthDate: new Date('1990-05-15'),
    address: 'Rua das Flores, 123, São Paulo - SP',
    phone: '(11) 98765-4321',
    admissionDate: new Date('2021-03-10'),
    salary: 8500,
    contractType: 'CLT',
    status: 'Ativo',
  },
  {
    id: 2,
    name: 'Carlos Lima',
    role: 'Dev Frontend',
    dept: 'Engenharia',
    email: 'carlos.lima@company.com',
    image: 'male',
    cpf: '234.567.890-11',
    rg: '23.456.789-0',
    birthDate: new Date('1992-08-20'),
    address: 'Av. Paulista, 1000, São Paulo - SP',
    phone: '(11) 91234-5678',
    admissionDate: new Date('2022-01-15'),
    salary: 9200,
    contractType: 'PJ',
    status: 'Férias',
  },
  {
    id: 3,
    name: 'Mariana Costa',
    role: 'Gerente de RH',
    dept: 'RH',
    email: 'mariana.costa@company.com',
    image: 'female',
    cpf: '345.678.901-22',
    rg: '34.567.890-1',
    birthDate: new Date('1985-11-30'),
    address: 'Rua Augusta, 500, São Paulo - SP',
    phone: '(11) 99876-5432',
    admissionDate: new Date('2020-06-01'),
    salary: 12000,
    contractType: 'CLT',
    status: 'Ativo',
  },
]

type VisibleColumns = {
  cpf: boolean
  rg: boolean
  email: boolean
  phone: boolean
  address: boolean
  birthDate: boolean
  salary: boolean
  contractType: boolean
}

export default function Colaboradores() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [visibleColumns, setVisibleColumns] = useState<VisibleColumns>({
    cpf: false,
    rg: false,
    email: true,
    phone: false,
    address: false,
    birthDate: false,
    salary: false,
    contractType: false,
  })
  const { toast } = useToast()

  const filteredEmployees = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmit = (data: EmployeeFormValues) => {
    if (editingEmployee) {
      setEmployees(
        employees.map((e) =>
          e.id === editingEmployee.id ? { ...e, ...data } : e,
        ),
      )
      toast({
        title: 'Colaborador atualizado',
        description: `${data.name} foi atualizado com sucesso.`,
      })
    } else {
      setEmployees([
        ...employees,
        {
          ...data,
          id: Date.now(),
          image: Math.random() > 0.5 ? 'male' : 'female',
        },
      ])
      toast({
        title: 'Colaborador criado',
        description: `${data.name} foi adicionado com sucesso.`,
      })
    }
    setIsDialogOpen(false)
    setEditingEmployee(null)
  }

  const handleDelete = () => {
    if (deletingId) {
      setEmployees(employees.filter((e) => e.id !== deletingId))
      toast({ title: 'Colaborador removido', variant: 'destructive' })
      setDeletingId(null)
    }
  }

  const openEdit = (employee: Employee) => {
    setEditingEmployee(employee)
    setIsDialogOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo':
        return 'default'
      case 'Férias':
        return 'secondary'
      case 'Desligado':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Colaboradores</h1>
          <p className="text-muted-foreground text-sm">
            Gerencie a equipe da sua empresa.
          </p>
        </div>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) setEditingEmployee(null)
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Adicionar Colaborador
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingEmployee ? 'Editar Colaborador' : 'Novo Colaborador'}
              </DialogTitle>
            </DialogHeader>
            <EmployeeForm
              initialData={editingEmployee}
              onSubmit={handleSubmit}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou cargo..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <Columns className="mr-2 h-4 w-4" /> Filtrar Colunas
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Colunas Visíveis</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={visibleColumns.email}
              onCheckedChange={(checked) =>
                setVisibleColumns((prev) => ({ ...prev, email: checked }))
              }
            >
              Email
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={visibleColumns.cpf}
              onCheckedChange={(checked) =>
                setVisibleColumns((prev) => ({ ...prev, cpf: checked }))
              }
            >
              CPF
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={visibleColumns.rg}
              onCheckedChange={(checked) =>
                setVisibleColumns((prev) => ({ ...prev, rg: checked }))
              }
            >
              RG
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={visibleColumns.phone}
              onCheckedChange={(checked) =>
                setVisibleColumns((prev) => ({ ...prev, phone: checked }))
              }
            >
              Telefone
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={visibleColumns.address}
              onCheckedChange={(checked) =>
                setVisibleColumns((prev) => ({ ...prev, address: checked }))
              }
            >
              Endereço
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={visibleColumns.birthDate}
              onCheckedChange={(checked) =>
                setVisibleColumns((prev) => ({ ...prev, birthDate: checked }))
              }
            >
              Data de Nascimento
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={visibleColumns.salary}
              onCheckedChange={(checked) =>
                setVisibleColumns((prev) => ({ ...prev, salary: checked }))
              }
            >
              Salário
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={visibleColumns.contractType}
              onCheckedChange={(checked) =>
                setVisibleColumns((prev) => ({
                  ...prev,
                  contractType: checked,
                }))
              }
            >
              Tipo de Contrato
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border bg-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Colaborador</TableHead>
              {visibleColumns.email && <TableHead>Email</TableHead>}
              {visibleColumns.cpf && <TableHead>CPF</TableHead>}
              {visibleColumns.rg && <TableHead>RG</TableHead>}
              {visibleColumns.phone && <TableHead>Telefone</TableHead>}
              {visibleColumns.address && <TableHead>Endereço</TableHead>}
              {visibleColumns.birthDate && <TableHead>Nascimento</TableHead>}
              <TableHead>Cargo</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Admissão</TableHead>
              {visibleColumns.salary && <TableHead>Salário</TableHead>}
              {visibleColumns.contractType && <TableHead>Contrato</TableHead>}
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={12}
                  className="text-center h-24 text-muted-foreground"
                >
                  Nenhum colaborador encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
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
                        {!visibleColumns.email && (
                          <span className="text-xs text-muted-foreground">
                            {employee.email}
                          </span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  {visibleColumns.email && (
                    <TableCell>{employee.email}</TableCell>
                  )}
                  {visibleColumns.cpf && <TableCell>{employee.cpf}</TableCell>}
                  {visibleColumns.rg && <TableCell>{employee.rg}</TableCell>}
                  {visibleColumns.phone && (
                    <TableCell>{employee.phone}</TableCell>
                  )}
                  {visibleColumns.address && (
                    <TableCell
                      className="max-w-[200px] truncate"
                      title={employee.address}
                    >
                      {employee.address}
                    </TableCell>
                  )}
                  {visibleColumns.birthDate && (
                    <TableCell>
                      {format(employee.birthDate, 'dd/MM/yyyy')}
                    </TableCell>
                  )}
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>{employee.dept}</TableCell>
                  <TableCell>
                    {format(employee.admissionDate, 'dd/MM/yyyy')}
                  </TableCell>
                  {visibleColumns.salary && (
                    <TableCell>
                      R${' '}
                      {employee.salary.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                      })}
                    </TableCell>
                  )}
                  {visibleColumns.contractType && (
                    <TableCell>{employee.contractType}</TableCell>
                  )}
                  <TableCell>
                    <Badge variant={getStatusColor(employee.status)}>
                      {employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right whitespace-nowrap">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEdit(employee)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => setDeletingId(employee.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o
              colaborador.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
