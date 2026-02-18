import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Users,
  UserPlus,
  Clock,
  CalendarDays,
  FileBarChart,
  BarChart3,
  Search,
  Filter,
  History,
  Building,
  Shield,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useUserRole } from '@/hooks/use-user-role'
import { InviteCollaboratorDialog } from '@/components/InviteCollaboratorDialog'

const menuGroups = [
  {
    label: 'Gestão',
    items: [
      {
        title: 'Colaboradores',
        url: '/colaboradores',
        icon: Users,
        roles: ['Admin', 'Gerente', 'Colaborador'],
      },
      {
        title: 'Recrutamento',
        url: '/recrutamento',
        icon: UserPlus,
        roles: ['Admin', 'Gerente'],
      },
    ],
  },
  {
    label: 'Operacional',
    items: [
      {
        title: 'Ponto',
        url: '/ponto',
        icon: Clock,
        roles: ['Admin', 'Gerente', 'Colaborador'],
      },
      {
        title: 'Férias',
        url: '/ferias',
        icon: CalendarDays,
        roles: ['Admin', 'Gerente', 'Colaborador'],
      },
    ],
  },
  {
    label: 'Histórico',
    items: [
      {
        title: 'Avaliações',
        url: '/avaliacoes',
        icon: FileBarChart,
        roles: ['Admin', 'Gerente', 'Colaborador'],
      },
      {
        title: 'Relatórios',
        url: '/relatorios',
        icon: BarChart3,
        roles: ['Admin', 'Gerente'],
      },
    ],
  },
]

const recentItems = [
  { title: 'Aprovação de Ponto - Set/25', time: '2h atrás' },
  { title: 'Review: Design Senior', time: '4h atrás' },
  { title: 'Onboarding: Ana Silva', time: '1d atrás' },
]

export function AppSidebar() {
  const { isMobile } = useSidebar()
  const location = useLocation()
  const { role, loading, organizationName, organizationId } = useUserRole()

  if (loading) return null

  return (
    <Sidebar collapsible="icon" className={cn('border-r', isMobile && 'pt-0')}>
      <SidebarHeader className="p-4 gap-4">
        <div className="flex items-center justify-between overflow-hidden">
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-lg font-semibold tracking-tight text-foreground/90 truncate">
              ADAPTARH
            </span>
            {organizationName && (
              <span className="text-xs text-muted-foreground truncate flex items-center gap-1">
                <Building className="h-3 w-3" /> {organizationName}
              </span>
            )}
          </div>
        </div>
        <div className="relative group-data-[collapsible=icon]:hidden">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar..."
            className="pl-8 pr-8 bg-sidebar-accent/50 border-sidebar-border focus-visible:ring-1 focus-visible:ring-sidebar-ring h-9 text-sm"
          />
          <Filter className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {menuGroups.map((group) => {
          const visibleItems = group.items.filter(
            (item) => role && item.roles.includes(role),
          )

          if (visibleItems.length === 0) return null

          return (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {visibleItems.map((item) => {
                    const isActive = location.pathname === item.url
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          tooltip={item.title}
                        >
                          <Link to={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )
        })}

        <SidebarGroup className="mt-auto group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Recentes</SidebarGroupLabel>
          <SidebarGroupContent>
            <ul className="flex flex-col gap-2">
              {recentItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-sidebar-accent cursor-pointer text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <History className="h-3 w-3 shrink-0" />
                  <span className="truncate flex-1">{item.title}</span>
                  <span className="text-[10px] opacity-70 whitespace-nowrap">
                    {item.time}
                  </span>
                </li>
              ))}
            </ul>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 group-data-[collapsible=icon]:hidden gap-4">
        {organizationId && (
          <InviteCollaboratorDialog
            organizationId={organizationId}
            organizationName={organizationName}
            trigger={
              <Button className="w-full gap-2 shadow-sm" variant="outline">
                <UserPlus className="h-4 w-4" />
                Convidar Colaboradores
              </Button>
            }
          />
        )}

        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-sidebar-accent/50 border border-sidebar-border">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Shield className="h-4 w-4" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              Nível de Acesso
            </span>
            <span className="text-sm font-semibold text-foreground capitalize truncate">
              {role || 'Visitante'}
            </span>
          </div>
        </div>

        <div className="text-[10px] text-center text-muted-foreground">
          ADAPTARH v2.6 &copy; 2026
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
