"use client"

import { useState } from "react"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { Dashboard } from "@/components/features/Dashboard"
import { CodeGenerator } from "@/components/features/CodeGenerator"
import { VaultSearch } from "@/components/features/VaultSearch"
import { RepoAuditor } from "@/components/features/RepoAuditor"
import { Sandbox } from "@/components/features/Sandbox"
import { Command, Search, Bell, Activity, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  const [activeView, setActiveView] = useState("dashboard")

  const renderView = () => {
    switch (activeView) {
      case "codegen": return <CodeGenerator />
      case "vault": return <VaultSearch />
      case "auditor": return <RepoAuditor />
      case "sandbox": return <Sandbox />
      default: return <Dashboard onNav={setActiveView} />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full selection:bg-primary/40 selection:text-white">
        <AppSidebar onNav={setActiveView} active={activeView} />
        <SidebarInset className="bg-background flex flex-col h-screen overflow-hidden">
          <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 shrink-0 bg-background/80 backdrop-blur-xl z-20">
            <div className="flex items-center gap-5">
              <SidebarTrigger className="hover:text-primary transition-colors" />
              <div className="h-6 w-px bg-white/10" />
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-3 py-1 font-mono text-[10px] tracking-widest uppercase">
                   Agentic_Active
                </Badge>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium hidden sm:flex">
                  <Command className="h-3.5 w-3.5" />
                  <span>Ctrl+P per Discovery</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="relative group hidden lg:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-accent transition-all" />
                <input 
                  className="h-10 w-80 bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all placeholder:text-muted-foreground/50"
                  placeholder="Explorar Nexus Nexus..."
                />
              </div>
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-[10px] text-green-500 font-bold uppercase hidden md:flex">
                  <Activity className="h-3 w-3" /> System Live
                </div>
                <button className="relative text-muted-foreground hover:text-white transition-all transform hover:scale-110">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-primary rounded-full border-2 border-background animate-pulse" />
                </button>
                <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-primary via-accent to-primary p-[2px] shadow-lg shadow-primary/20">
                  <div className="h-full w-full rounded-[10px] bg-background flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-accent" />
                  </div>
                </div>
              </div>
            </div>
          </header>
          
          <main className="flex-1 overflow-auto bg-[radial-gradient(circle_at_20%_20%,_rgba(109,40,217,0.05)_0%,_transparent_50%)] bg-background">
            <div className="max-w-[1600px] mx-auto w-full">
              {renderView()}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
