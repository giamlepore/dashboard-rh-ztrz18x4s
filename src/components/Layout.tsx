import { Outlet } from 'react-router-dom'
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { IconRail } from '@/components/layout/IconRail'
import { AppSidebar } from '@/components/layout/AppSidebar'
import { useIsMobile } from '@/hooks/use-mobile'

export default function Layout() {
  const isMobile = useIsMobile()

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        {/* Tier 1 Sidebar - Fixed Rail */}
        <IconRail />

        {/* Tier 2 Sidebar - Collapsible Shadcn Sidebar */}
        <AppSidebar />

        {/* Main Content Area */}
        <SidebarInset className="flex flex-col w-full overflow-hidden">
          {/* Mobile Header for Sidebar Trigger */}
          <header className="flex h-14 items-center gap-2 border-b bg-background px-4 md:hidden">
            <SidebarTrigger />
            <span className="font-semibold">ADAPTAONE</span>
          </header>

          <main className="flex-1 overflow-auto bg-[#F9FAFB] dark:bg-zinc-950 relative">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
