import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MoreVertical, Plus, Calendar, Paperclip } from 'lucide-react'

const columns = [
  {
    id: 'triagem',
    title: 'Triagem',
    count: 4,
    color: 'bg-slate-100 dark:bg-slate-800',
  },
  {
    id: 'entrevista',
    title: 'Entrevista',
    count: 3,
    color: 'bg-blue-50/50 dark:bg-blue-900/20',
  },
  {
    id: 'teste',
    title: 'Teste Técnico',
    count: 2,
    color: 'bg-indigo-50/50 dark:bg-indigo-900/20',
  },
  {
    id: 'proposta',
    title: 'Proposta',
    count: 1,
    color: 'bg-emerald-50/50 dark:bg-emerald-900/20',
  },
]

const candidates = [
  {
    id: 1,
    name: 'Juliana Martins',
    role: 'UX Designer',
    status: 'triagem',
    tags: ['Senior', 'Figma'],
    date: '2d atrás',
    image: 'female',
  },
  {
    id: 2,
    name: 'Rafael Costa',
    role: 'UX Designer',
    status: 'triagem',
    tags: ['Pleno'],
    date: '1d atrás',
    image: 'male',
  },
  {
    id: 3,
    name: 'Bruno Gomes',
    role: 'Frontend Dev',
    status: 'triagem',
    tags: ['React', 'Node'],
    date: '3h atrás',
    image: 'male',
  },
  {
    id: 4,
    name: 'Carla Dias',
    role: 'Product Owner',
    status: 'triagem',
    tags: ['Agile'],
    date: '5m atrás',
    image: 'female',
  },

  {
    id: 5,
    name: 'Lucas Pereira',
    role: 'Backend Dev',
    status: 'entrevista',
    tags: ['Java', 'Spring'],
    date: 'Hoje, 14:00',
    image: 'male',
  },
  {
    id: 6,
    name: 'Amanda Oliveira',
    role: 'Frontend Dev',
    status: 'entrevista',
    tags: ['Vue', 'Nuxt'],
    date: 'Amanhã, 10:00',
    image: 'female',
  },
  {
    id: 7,
    name: 'Ricardo Santos',
    role: 'DevOps',
    status: 'entrevista',
    tags: ['AWS', 'Docker'],
    date: 'Amanhã, 16:30',
    image: 'male',
  },

  {
    id: 8,
    name: 'Patrícia Lima',
    role: 'Data Analyst',
    status: 'teste',
    tags: ['Python', 'SQL'],
    date: 'Enviado 2d atrás',
    image: 'female',
  },
  {
    id: 9,
    name: 'Fernando Rocha',
    role: 'Tech Lead',
    status: 'teste',
    tags: ['Architecture'],
    date: 'Enviado 1d atrás',
    image: 'male',
  },

  {
    id: 10,
    name: 'Gabriel Silva',
    role: 'Fullstack Dev',
    status: 'proposta',
    tags: ['Top Talent'],
    date: 'Aguardando',
    image: 'male',
  },
]

export default function Recrutamento() {
  return (
    <div className="flex flex-col h-full p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Recrutamento</h1>
          <p className="text-muted-foreground text-sm">
            Acompanhe o funil de contratação.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nova Vaga
        </Button>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 min-w-[1000px] h-full">
          {columns.map((col) => (
            <div
              key={col.id}
              className={`flex-1 flex flex-col rounded-xl border border-border/50 ${col.color} p-4 min-w-[280px]`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm text-foreground">
                    {col.title}
                  </h3>
                  <Badge
                    variant="secondary"
                    className="rounded-full px-2 py-0.5 text-xs font-normal bg-background/50"
                  >
                    {col.count}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Plus className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>

              <div className="flex flex-col gap-3 overflow-y-auto pr-1 custom-scrollbar max-h-[calc(100vh-220px)]">
                {candidates
                  .filter((c) => c.status === col.id)
                  .map((candidate) => (
                    <Card
                      key={candidate.id}
                      className="cursor-pointer shadow-sm hover:shadow-md transition-all border-none bg-background"
                    >
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={`https://img.usecurling.com/ppl/thumbnail?gender=${candidate.image}&seed=${candidate.id}`}
                              />
                              <AvatarFallback>
                                {candidate.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium leading-none">
                                {candidate.name}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {candidate.role}
                              </p>
                            </div>
                          </div>
                          <button className="text-muted-foreground hover:text-foreground">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {candidate.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-[10px] h-5 px-1.5 font-normal text-muted-foreground"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{candidate.date}</span>
                          </div>
                          <Paperclip className="h-3 w-3" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
