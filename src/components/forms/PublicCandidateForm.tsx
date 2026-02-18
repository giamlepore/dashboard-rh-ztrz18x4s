import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
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
import { Loader2, UploadCloud } from 'lucide-react'

const formSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
})

export type PublicCandidateFormValues = z.infer<typeof formSchema>

interface PublicCandidateFormProps {
  onSubmit: (data: PublicCandidateFormValues, file: File) => Promise<void>
  isLoading?: boolean
}

export function PublicCandidateForm({
  onSubmit,
  isLoading = false,
}: PublicCandidateFormProps) {
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)

  const form = useForm<PublicCandidateFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    setFileError(null)

    if (selectedFile) {
      if (
        ![
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ].includes(selectedFile.type)
      ) {
        setFileError('Apenas arquivos PDF, DOC ou DOCX são permitidos.')
        setFile(null)
        return
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        setFileError('O arquivo deve ter no máximo 5MB.')
        setFile(null)
        return
      }
      setFile(selectedFile)
    }
  }

  const handleSubmit = async (data: PublicCandidateFormValues) => {
    if (!file) {
      setFileError('O currículo é obrigatório.')
      return
    }

    await onSubmit(data, file)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo *</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input placeholder="seu@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone (Opcional)</FormLabel>
                <FormControl>
                  <Input placeholder="(00) 00000-0000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <FormLabel className={fileError ? 'text-destructive' : ''}>
            Currículo (PDF, DOC, DOCX) *
          </FormLabel>
          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="cursor-pointer file:cursor-pointer file:text-primary file:font-semibold"
            />
          </div>
          {fileError && (
            <p className="text-sm font-medium text-destructive">{fileError}</p>
          )}
          {file && !fileError && (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <UploadCloud className="h-4 w-4" />
              <span>Arquivo selecionado: {file.name}</span>
            </div>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando candidatura...
            </>
          ) : (
            'Enviar Candidatura'
          )}
        </Button>
      </form>
    </Form>
  )
}
