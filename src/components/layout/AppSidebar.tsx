"use client"

import * as React from "react"
import { 
  Code2, 
  Database, 
  Terminal, 
  ShieldCheck, 
  LayoutDashboard, 
  Command,
  Settings,
  Cpu,
  BrainCircuit,
  Binary
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    id: "dashboard"
  },
  {
    title: "Code Generation",
    icon: Binary,
    id: "codegen"
  },
  {
    title: "Vault Discovery",
    icon: Database,
    id: "vault"
  },
  {
    title: "Repo Auditor",
    icon: ShieldCheck,
    id: "auditor"
  },
  {
    title: "Python Sandbox",
    icon: Terminal,
    id: "sandbox"
  }
]

interface AppSidebarProps {
  onNav: (id: string) => void
  active: string
}

export function AppSidebar({ onNav, active }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-16 flex items-center px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Command className="h-5 w-5" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden">
            <span className="font-headline font-bold text-lg tracking-tight">NEXUS</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">GenObs Agent</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">Core Engines</SidebarGroupLabel>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton 
                  onClick={() => onNav(item.id)}
                  isActive={active === item.id}
                  tooltip={item.title}
                  className="transition-all duration-200"
                >
                  <item.icon className="h-4 w-4" />
                  <span className="font-medium">{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">System</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Ollama Status">
                <BrainCircuit className="h-4 w-4 text-accent" />
                <span>Ollama Online</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="HNSW Index">
                <Database className="h-4 w-4 text-accent" />
                <span>HNSW Sync OK</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings className="h-4 w-4" />
              <span>Preferences</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}