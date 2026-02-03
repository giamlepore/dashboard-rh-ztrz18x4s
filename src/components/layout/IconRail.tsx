import {
  Home,
  Briefcase,
  MessageSquare,
  Bot,
  Bell,
  HelpCircle,
  User,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Link, useLocation } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const navItems = [
  { icon: Home, label: 'Início', path: '/' },
  { icon: Briefcase, label: 'Workspace', path: '/colaboradores' }, // Mapping Workspace to Employees as main operational area
  { icon: MessageSquare, label: 'Mensagens', path: '#' },
  { icon: Bot, label: 'Experts', path: '#' },
  { icon: Bell, label: 'Notificações', path: '#' },
]

export function IconRail() {
  const location = useLocation()

  return (
    <>
      {/* Desktop Rail */}
      <aside className="hidden md:flex w-16 flex-col items-center justify-between border-r bg-background py-4 z-40 h-screen sticky top-0">
        <div className="flex flex-col items-center gap-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xl">
            A1
          </div>

          <nav className="flex flex-col gap-4 items-center">
            {navItems.map((item, index) => {
              const isActive =
                location.pathname === item.path ||
                (item.path !== '/' && location.pathname.startsWith(item.path))
              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.path}
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground',
                        isActive && 'bg-secondary text-secondary-foreground',
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="sr-only">{item.label}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              )
            })}
          </nav>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground">
                <HelpCircle className="h-5 w-5" />
                <span className="sr-only">Ajuda</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Ajuda</TooltipContent>
          </Tooltip>

          <Avatar className="h-10 w-10 border cursor-pointer hover:ring-2 hover:ring-ring hover:ring-offset-2 transition-all">
            <AvatarImage src="https://img.usecurling.com/ppl/thumbnail?gender=male" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-background md:hidden px-4">
        {navItems.slice(0, 4).map((item, index) => {
          // Show fewer items on mobile
          const isActive = location.pathname === item.path
          return (
            <Link
              key={index}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center gap-1 text-muted-foreground',
                isActive && 'text-primary',
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
        <button className="flex flex-col items-center justify-center gap-1 text-muted-foreground">
          <User className="h-5 w-5" />
          <span className="text-[10px] font-medium">Perfil</span>
        </button>
      </div>
    </>
  )
}
