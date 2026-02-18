import { useState, useEffect } from 'react'
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
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
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
import { Plus, Pencil, Trash2, Search, Columns, Shield } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { EmployeeForm } from '@/components/forms/EmployeeForm'
import { type EmployeeFormValues } from '@/components/forms/employee-schema'
import { useToast } from '@/hooks/use-toast'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { format } from 'date-fns'
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  uploadDocument,
  type Employee,
} from '@/services/employees'
import { useUserRole } from '@/hooks/use-user-role'
import { useAuth } from '@/hooks/use-auth'

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
  const [employees, setEmployees] = useState<Employee[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
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
  const { role, isEmployee, isAdmin } = useUserRole()
  const { user } = useAuth()

  const fetchEmployees = async () => {
    try {
      // If user is employee, pass userId to filter in service (or handle here)
      const userIdToFilter = isEmployee && user ? user.id : undefined
      const data = await getEmployees(userIdToFilter)
      setEmployees(data)
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro ao carregar',
        description: 'Não foi possível carregar os colaboradores.',
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [role, user])

  const filteredEmployees = employees.filter(
    (e) =>
      e.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.cargo.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmit = async (data: EmployeeFormValues, files: File[]) => {
    setIsLoading(true)
    try {
      let uploadedDocs = editingEmployee?.documentos_urls || []

      const empData = {
        nome: data.name,
        cpf: data.cpf,
        rg: data.rg,
        data_nascimento: format(data.birthDate, 'yyyy-MM-dd'),
        endereco: data.address,
        email: data.email,
        telefone: data.phone,
        cargo: data.role,
        departamento: data.dept,
        data_admissao: format(data.admissionDate, 'yyyy-MM-dd'),
        salario: data.salary,
        tipo_contrato: data.contractType,
        status: data.status,
        image_gender:
          editingEmployee?.image_gender ||
          (Math.random() > 0.5 ? 'male' : 'female'),
        documentos_urls: uploadedDocs,
      }

      let empId = editingEmployee?.id

      if (editingEmployee) {
        await updateEmployee(editingEmployee.id, empData)
        toast({
          title: 'Colaborador atualizado',
          description: `${data.name} atualizado.`,
        })
      } else {
        const newEmp = await createEmployee(empData)
        empId = newEmp.id
        toast({
          title: 'Colaborador criado',
          description: `${data.name} criado.`,
        })
      }

      if (files.length > 0 && empId) {
        toast({
          title: 'Enviando documentos...',
          description: `Fazendo upload de ${files.length} arquivos.`,
        })

        const newUploads = await Promise.all(
          files.map(async (file) => {
            try {
              const url = await uploadDocument(file, empId!)
              return {
                name: file.name,
                url,
                size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
              }
            } catch (error) {
              console.error(`Erro ao enviar arquivo ${file.name}:`, error)
              toast({
                title: 'Erro no upload',
                description: `Falha ao enviar ${file.name}.`,
                variant: 'destructive',
              })
              throw error
            }
          }),
        )

        const finalDocs = [...uploadedDocs, ...newUploads]
        await updateEmployee(empId, { documentos_urls: finalDocs })

        toast({
          title: 'Documentos salvos',
          description: 'Todos os documentos foram anexados com sucesso.',
        })
      }

      await fetchEmployees()
      setIsDialogOpen(false)
      setEditingEmployee(null)
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro ao salvar',
        description: 'Ocorreu um erro ao salvar o colaborador ou documentos.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (deletingId) {
      try {
        await deleteEmployee(deletingId)
        await fetchEmployees()
        toast({ title: 'Colaborador removido', variant: 'destructive' })
      } catch (error) {
        console.error(error)
        toast({
          title: 'Erro ao remover',
          description: 'Não foi possível remover.',
          variant: 'destructive',
        })
      }
      setDeletingId(null)
    }
  }

  const handleRoleUpdate = async (employeeId: string, newRole: string) => {
    try {
      await updateEmployee(employeeId, { role: newRole as Employee['role'] })
      toast({
        title: 'Permissão atualizada',
        description: `O acesso foi alterado para ${newRole}.`,
      })
      await fetchEmployees()
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro ao atualizar',
        description: 'Não foi possível alterar a permissão.',
        variant: 'destructive',
      })
    }
  }

  const openEdit = (employee: Employee) => {
    setEditingEmployee(employee)
    setIsDialogOpen(true)
  }

  const mapToFormValues = (emp: Employee): EmployeeFormValues => ({
    name: emp.nome,
    cpf: emp.cpf,
    rg: emp.rg,
    birthDate: new Date(emp.data_nascimento),
    address: emp.endereco,
    email: emp.email,
    phone: emp.telefone,
    role: emp.cargo,
    dept: emp.departamento,
    admissionDate: new Date(emp.data_admissao),
    salary: emp.salario,
    contractType: emp.tipo_contrato,
    status: emp.status,
  })

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

  const canEdit = role === 'Admin' || role === 'Gerente'

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Colaboradores</h1>
          <p className="text-muted-foreground text-sm">
            Gerencie a equipe da sua empresa.
          </p>
        </div>
        {canEdit && (
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
                initialData={
                  editingEmployee
                    ? {
                        ...mapToFormValues(editingEmployee),
                        id: editingEmployee.id,
                        documentos_urls: editingEmployee.documentos_urls,
                      }
                    : null
                }
                onSubmit={handleSubmit}
                onCancel={() => setIsDialogOpen(false)}
                isLoading={isLoading}
              />
            </DialogContent>
          </Dialog>
        )}
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
              {canEdit && <TableHead className="text-right">Ações</TableHead>}
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
                          src={`https://img.usecurling.com/ppl/thumbnail?gender=${employee.image_gender || 'male'}&seed=${employee.id}`}
                        />
                        <AvatarFallback>
                          {employee.nome.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">
                          {employee.nome}
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
                    <TableCell>{employee.telefone}</TableCell>
                  )}
                  {visibleColumns.address && (
                    <TableCell
                      className="max-w-[200px] truncate"
                      title={employee.endereco}
                    >
                      {employee.endereco}
                    </TableCell>
                  )}
                  {visibleColumns.birthDate && (
                    <TableCell>
                      {format(new Date(employee.data_nascimento), 'dd/MM/yyyy')}
                    </TableCell>
                  )}
                  <TableCell>{employee.cargo}</TableCell>
                  <TableCell>{employee.departamento}</TableCell>
                  <TableCell>
                    {format(new Date(employee.data_admissao), 'dd/MM/yyyy')}
                  </TableCell>
                  {visibleColumns.salary && (
                    <TableCell>
                      R${' '}
                      {employee.salario.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                      })}
                    </TableCell>
                  )}
                  {visibleColumns.contractType && (
                    <TableCell>{employee.tipo_contrato}</TableCell>
                  )}
                  <TableCell>
                    <Badge variant={getStatusColor(employee.status)}>
                      {employee.status}
                    </Badge>
                  </TableCell>
                  {canEdit && (
                    <TableCell className="text-right whitespace-nowrap">
                      {isAdmin && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Alterar Permissões"
                              className="mr-1"
                            >
                              <Shield className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>
                              Nível de Acesso
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup
                              value={employee.role}
                              onValueChange={(value) =>
                                handleRoleUpdate(employee.id, value)
                              }
                            >
                              <DropdownMenuRadioItem value="Admin">
                                Admin
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="Gerente">
                                Gerente
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="Colaborador">
                                Colaborador
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="visitante">
                                Visitante
                              </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}

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
                  )}
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
