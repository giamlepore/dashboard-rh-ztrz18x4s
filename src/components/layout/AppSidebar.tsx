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
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

const menuGroups = [
  {
    label: 'Gestão',
    items: [
      { title: 'Colaboradores', url: '/colaboradores', icon: Users },
      { title: 'Recrutamento', url: '/recrutamento', icon: UserPlus },
    ],
  },
  {
    label: 'Operacional',
    items: [
      { title: 'Ponto', url: '/ponto', icon: Clock },
      { title: 'Férias', url: '/ferias', icon: CalendarDays },
    ],
  },
  {
    label: 'Histórico',
    items: [
      { title: 'Avaliações', url: '/avaliacoes', icon: FileBarChart },
      { title: 'Relatórios', url: '/relatorios', icon: BarChart3 },
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

  return (
    <Sidebar collapsible="icon" className={cn('border-r', isMobile && 'pt-0')}>
      <SidebarHeader className="p-4 gap-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold tracking-tight text-foreground/90 group-data-[collapsible=icon]:hidden">
            ADAPTAONE
          </span>
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
        {menuGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
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
        ))}

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
      <SidebarFooter className="p-4 group-data-[collapsible=icon]:hidden">
        <div className="text-[10px] text-center text-muted-foreground">
          ADAPTAONE v2.6 &copy; 2026
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
