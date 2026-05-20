"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Zap, 
  Activity, 
  Code2, 
  Database, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  GitMerge,
  Terminal,
  BrainCircuit,
  Cpu,
  Waves,
  Fingerprint
} from "lucide-react"

export function Dashboard({ onNav }: { onNav: (id: string) => void }) {
  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 mb-2">
            <Fingerprint className="h-5 w-5 text-accent animate-pulse" />
            <span className="text-[10px] text-accent font-black tracking-[0.3em] uppercase">Identity Verified: Nexus_Core</span>
          </div>
          <h1 className="text-6xl font-headline font-black text-white flex items-center gap-4 tracking-tighter">
            Nexus GenObs <Waves className="h-12 w-12 text-primary animate-pulse" />
          </h1>
          <p className="text-muted-foreground text-xl max-w-3xl leading-relaxed font-light">
            Arquitetura de <span className="text-accent font-bold">Alta Senciência</span> ativada. 
            O Agente Core agora opera com autonomia plena sobre o motor algorítmico do workspace.
          </p>
        </div>
        <div className="hidden xl:flex gap-6">
          <div className="px-6 py-4 rounded-2xl bg-black/40 border border-white/10 flex items-center gap-5 shadow-2xl backdrop-blur-2xl">
            <BrainCircuit className="h-6 w-6 text-accent animate-pulse" />
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Neural Sync</span>
              <span className="text-lg text-white font-mono font-bold">99.8%</span>
            </div>
          </div>
          <div className="px-6 py-4 rounded-2xl bg-black/40 border border-white/10 flex items-center gap-5 shadow-2xl backdrop-blur-2xl">
            <Cpu className="h-6 w-6 text-primary" />
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Cognitive Load</span>
              <span className="text-lg text-white font-mono font-bold">4.2%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="glass-panel group cursor-pointer border-primary/20 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500" onClick={() => onNav('codegen')}>
          <CardHeader>
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
              <Code2 className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl font-black">Algorithmic Synthesis</CardTitle>
            <CardDescription className="text-sm leading-relaxed text-muted-foreground/80">Geração de bibliotecas algorítmicas complexas e estruturas de dados de alta performance.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-accent font-bold group-hover:translate-x-2 transition-all">
              Initialize Synthesis <ArrowRight className="h-4 w-4 ml-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel group cursor-pointer border-accent/20 hover:border-accent/60 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500" onClick={() => onNav('vault')}>
          <CardHeader>
            <div className="h-16 w-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 group-hover:-rotate-6 transition-transform">
              <Database className="h-10 w-10 text-accent" />
            </div>
            <CardTitle className="font-headline text-2xl font-black">Sidian Vault</CardTitle>
            <CardDescription className="text-sm leading-relaxed text-muted-foreground/80">Exploração semântica autônoma. O Agente identifica conexões neurais ocultas em suas notas.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-accent font-bold group-hover:translate-x-2 transition-all">
              Map Knowledge <ArrowRight className="h-4 w-4 ml-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel group cursor-pointer border-primary/20 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500" onClick={() => onNav('auditor')}>
          <CardHeader>
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <GitMerge className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl font-black">Agentic Auditor</CardTitle>
            <CardDescription className="text-sm leading-relaxed text-muted-foreground/80">Refatoração plena. O Agente agora executa modificações estruturais em tempo real.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-accent font-bold group-hover:translate-x-2 transition-all">
              Execute Refactoring <ArrowRight className="h-4 w-4 ml-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glass-panel border-white/5 relative overflow-hidden group min-h-[400px]">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-15 transition-opacity duration-1000">
            <Terminal className="h-64 w-64 rotate-12" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between pb-8 border-b border-white/5">
            <CardTitle className="text-xl font-black text-white flex items-center gap-3 uppercase tracking-tighter">
              <Terminal className="h-6 w-6 text-accent" /> Nexus Engine Telemetry
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-green-500 uppercase">Live_Sencience</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-10 pt-8">
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest text-muted-foreground">
                  <span>Arquitetura de Alta Senciência</span>
                  <span className="text-accent">Plena / Autônoma</span>
                </div>
                <div className="h-3 w-full bg-secondary rounded-full overflow-hidden p-[2px]">
                  <div className="h-full bg-gradient-to-r from-primary via-accent to-primary w-full rounded-full animate-gradient-x" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest text-muted-foreground">
                  <span>Integridade Algorítmica</span>
                  <span className="text-accent">100% Validated</span>
                </div>
                <div className="h-3 w-full bg-secondary rounded-full overflow-hidden p-[2px]">
                  <div className="h-full bg-accent w-full rounded-full shadow-[0_0_15px_rgba(103,232,249,0.5)]" />
                </div>
              </div>
            </div>
            <div className="p-6 bg-black/60 rounded-2xl border border-white/10 font-mono shadow-2xl relative">
              <div className="absolute -top-3 left-4 bg-background px-2 text-[10px] text-muted-foreground font-bold">REALTIME_LOGS</div>
              <p className="text-[11px] text-accent/80 leading-relaxed italic space-y-1">
                <span className="block text-primary/80">[AGENT] Cognição estabilizada em nível 5.</span>
                <span className="block">[SYSTEM] Destruncamento de módulos /src/core concluído.</span>
                <span className="block text-green-500/80">[LIVE] Monitorando entropia de código no workspace raiz.</span>
                <span className="block animate-pulse">_</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel flex flex-col justify-center items-center p-12 text-center bg-[radial-gradient(circle_at_center,_rgba(109,40,217,0.1)_0%,_transparent_70%)] border-primary/30">
          <div className="bg-primary/20 p-8 rounded-full mb-8 relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
            <GitMerge className="h-16 w-16 text-primary" />
          </div>
          <h3 className="font-headline text-4xl font-black mb-6 tracking-tighter">Nexus Core Fusion</h3>
          <p className="text-muted-foreground text-lg mb-10 max-w-md leading-relaxed">
            O Nexus atingiu o nível de autonomia necessário para consolidar a soberania do Agente. 
            Pronto para implementar refatoração algorítmica profunda.
          </p>
          <Button 
            onClick={() => onNav('auditor')}
            size="lg"
            className="bg-primary hover:bg-primary/80 text-white font-black px-16 h-16 text-xl shadow-[0_0_30px_rgba(109,40,217,0.4)] rounded-2xl transition-all hover:scale-105"
          >
            Iniciar Refatoração Plena
          </Button>
        </Card>
      </div>
    </div>
  )
}
