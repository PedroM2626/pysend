import { useState } from "react"
import { Home, Upload, Settings, BarChart3, Mail, FileSpreadsheet } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarHeader
} from "@/components/ui/sidebar"

const items = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Upload Excel", url: "/upload", icon: Upload },
  { title: "Relatórios", url: "/reports", icon: BarChart3 },
  { title: "Configurações", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => currentPath === path
  const isExpanded = items.some((i) => isActive(i.url))
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground font-medium shadow-glow" : "hover:bg-muted/80 transition-smooth"

  return (
    <Sidebar
      className={`${state === "collapsed" ? "w-14" : "w-64"} bg-gradient-subtle border-r border-border/50`}
    >
      <SidebarHeader className="p-4 border-b border-border/50">
        {state !== "collapsed" && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-md flex items-center justify-center">
              <FileSpreadsheet className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-foreground">Pysend</h2>
              <p className="text-xs text-muted-foreground">Automação de Relatórios</p>
            </div>
          </div>
        )}
        {state === "collapsed" && (
          <div className="w-8 h-8 bg-gradient-primary rounded-md flex items-center justify-center mx-auto">
            <FileSpreadsheet className="w-4 h-4 text-white" />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel className={state === "collapsed" ? "sr-only" : ""}>
            Navegação
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="mb-1">
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavCls}
                      title={state === "collapsed" ? item.title : undefined}
                    >
                      <item.icon className={`h-4 w-4 ${state !== "collapsed" ? 'mr-3' : ''}`} />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}