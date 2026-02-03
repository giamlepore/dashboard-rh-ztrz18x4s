import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Upload, X, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DatePicker } from '@/components/ui/date-picker'
import { Card, CardContent } from '@/components/ui/card'
import { employeeSchema, type EmployeeFormValues } from './employee-schema'
import { Employee } from '@/services/employees'

interface EmployeeFormProps {
  initialData?:
    | (EmployeeFormValues & {
        id?: string
        documentos_urls?: { name: string; url: string; size: string }[]
      })
    | null
  onSubmit: (data: EmployeeFormValues, files: File[]) => void
  onCancel: () => void
  isLoading?: boolean
}

export function EmployeeForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: EmployeeFormProps) {
  const [files, setFiles] = useState<File[]>([])
  const [existingFiles, setExistingFiles] = useState<
    { name: string; url: string; size: string }[]
  >([])

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: '',
      cpf: '',
      rg: '',
      address: '',
      email: '',
      phone: '',
      role: '',
      dept: '',
      salary: 0,
      contractType: '',
      status: 'Ativo',
    },
  })

  useEffect(() => {
    if (initialData) {
      form.reset(initialData)
      if (initialData.documentos_urls) {
        setExistingFiles(initialData.documentos_urls)
      }
    }
  }, [initialData, form])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleSubmit = (data: EmployeeFormValues) => {
    onSubmit(data, files)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
            <TabsTrigger value="professional">Dados Profissionais</TabsTrigger>
            <TabsTrigger value="documents">Documentos</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <Input placeholder="000.000.000-00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rg"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RG</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Nascimento</FormLabel>
                    <DatePicker date={field.value} setDate={field.onChange} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="(00) 00000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço Completo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="professional" className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cargo</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dept"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Departamento</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="admissionDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Admissão</FormLabel>
                    <DatePicker date={field.value} setDate={field.onChange} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salário (R$)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contractType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Contrato</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="CLT">CLT</SelectItem>
                        <SelectItem value="PJ">PJ</SelectItem>
                        <SelectItem value="Estágio">Estágio</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Ativo">Ativo</SelectItem>
                        <SelectItem value="Férias">Férias</SelectItem>
                        <SelectItem value="Desligado">Desligado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4 py-4">
            <Card className="border-dashed border-2">
              <CardContent className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Clique para fazer upload</p>
                  <p className="text-sm text-muted-foreground">
                    PDF, PNG ou JPG até 5MB
                  </p>
                </div>
                <Input
                  type="file"
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileChange}
                  accept=".pdf,.png,.jpg,.jpeg"
                  multiple
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    document.getElementById('file-upload')?.click()
                  }
                >
                  Selecionar Arquivo
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-2">
              {existingFiles.map((file, i) => (
                <div
                  key={`existing-${i}`}
                  className="flex items-center justify-between p-3 border rounded-md bg-muted/30"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <div>
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium hover:underline"
                      >
                        {file.name}
                      </a>
                      <p className="text-xs text-muted-foreground">
                        {file.size}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {files.map((file, i) => (
                <div
                  key={`new-${i}`}
                  className="flex items-center justify-between p-3 border rounded-md bg-muted/30"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(i)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <span className="animate-spin mr-2">⏳</span>}
            Salvar Colaborador
          </Button>
        </div>
      </form>
    </Form>
  )
}
