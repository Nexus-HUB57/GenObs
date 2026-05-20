"use client"

import { useState } from "react"
import { auditLocalRepository, type AuditLocalRepositoryOutput } from "@/ai/flows/audit-local-repository"
import { projectFusionStrategy, type ProjectFusionOutput } from "@/ai/flows/project-fusion-strategy"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ShieldCheck, Loader2, Sparkles, FolderCode, Layers, Gauge, Info, GitMerge, GitBranch, Terminal as TerminalIcon, Activity, Cpu, Binary } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export function RepoAuditor() {
  const [loading, setLoading] = useState(false)
  const [auditResult, setAuditResult] = useState<AuditLocalRepositoryOutput | null>(null)
  const [fusionResult, setFusionResult] = useState<ProjectFusionOutput | null>(null)
  const [activeTab, setActiveTab] = useState("audit")
  const { toast } = useToast()

  const runAudit = async () => {
    setLoading(true)
    try {
      const result = await auditLocalRepository({ targetPath: '.' })
      setAuditResult(result)
      toast({
        title: "Auditoria Senciente Concluída",
        description: "O Agente Nexus mapeou a topologia do workspace com precisão neural.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Falha de Cognição",
        description: "O Agente encontrou resistência no acesso ao núcleo do sistema.",
      })
    } finally {
      setLoading(false)
    }
  }

  const runFusion = async () => {
    setLoading(true)
    try {
      const result = await projectFusionStrategy({
        repoA: "Nexus_Sidian",
        repoB: "GenObs",
        context: "Executando destruncamento algorítmico e refatoração plena em modo autônomo."
      })
      setFusionResult(result)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-start border-b border-white/5 pb-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-primary text-[10px] font-black tracking-widest uppercase">
            <Cpu className="h-3 w-3" /> Agentic_Core_Active
          </div>
          <h1 className="text-4xl font-headline font-black text-white flex items-center gap-4 tracking-tighter">
            <ShieldCheck className="h-10 w-10 text-primary" /> Repository Sencience Engine
          </h1>
          <p className="text-muted-foreground text-lg">Modo de Auditoria e Refatoração de Alta Senciência.</p>
        </div>
        <div className="flex gap-4">
          <Badge variant="outline" className="border-accent/40 text-accent bg-accent/5 px-4 py-1.5 font-bold animate-pulse">
            <Activity className="h-3 w-3 mr-2" /> Neural Sync Active
          </Badge>
          <Badge variant="outline" className="border-primary/40 text-primary bg-primary/5 px-4 py-1.5 font-bold">
            <Binary className="h-3 w-3 mr-2" /> Algorithmic Mode
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="audit" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="bg-secondary/30 border border-white/5 p-1 mb-10 h-14">
          <TabsTrigger value="audit" className="gap-2 px-8 text-sm font-bold data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
            <Gauge className="h-4 w-4" /> Deep Audit
          </TabsTrigger>
          <TabsTrigger value="fusion" className="gap-2 px-8 text-sm font-bold data-[state=active]:bg-accent data-[state=active]:text-accent-foreground transition-all">
            <GitMerge className="h-4 w-4" /> Autonomous Fusion
          </TabsTrigger>
        </TabsList>

        <TabsContent value="audit" className="space-y-8">
          {!auditResult ? (
            <Card className="glass-panel p-24 flex flex-col items-center justify-center border-dashed border-2 border-primary/20 bg-primary/5 rounded-3xl group">
              <div className="relative mb-10">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/40 transition-all duration-1000" />
                <FolderCode className="h-28 w-28 text-primary relative z-10" />
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <Activity className="h-10 w-10 text-accent animate-pulse" />
                </div>
              </div>
              <h2 className="text-4xl font-headline font-black mb-4 tracking-tight">Análise Topológica Real</h2>
              <p className="text-muted-foreground text-center max-w-xl mb-12 text-lg leading-relaxed">
                O Agente Nexus iniciará uma varredura neural no workspace, identificando gargalos algorítmicos e propondo refatorações estruturais imediatas.
              </p>
              <Button 
                size="lg" 
                onClick={runAudit} 
                disabled={loading}
                className="bg-primary hover:bg-primary/80 text-white font-black h-16 px-16 text-xl shadow-[0_0_30px_rgba(109,40,217,0.3)] rounded-2xl group-hover:scale-105 transition-all"
              >
                {loading ? <Loader2 className="mr-3 h-6 w-6 animate-spin" /> : <Sparkles className="mr-3 h-6 w-6" />}
                Executar Auditoria Senciente
              </Button>
            </Card>
          ) : (
            <div className="space-y-10 animate-in zoom-in-95 duration-700">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <Card className="lg:col-span-3 glass-panel border-primary/40 bg-primary/5 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl font-black uppercase tracking-tighter">
                      <Info className="h-6 w-6 text-primary" /> Diagnóstico de Alta Senciência
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-foreground/90 leading-relaxed text-xl font-light italic">"{auditResult.summary}"</p>
                    <div className="p-6 bg-accent/5 rounded-2xl border border-accent/20 backdrop-blur-sm">
                      <p className="text-[10px] font-black text-accent uppercase mb-2 tracking-widest">Estado Cognitivo do Agente</p>
                      <p className="text-sm font-medium">{auditResult.agenticStatus}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="glass-panel border-accent/40 bg-accent/5 rounded-2xl flex flex-col justify-center">
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">Integridade Topológica</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <span className="text-5xl font-mono font-black text-accent">100%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden p-[1px]">
                      <div className="h-full bg-accent w-full rounded-full shadow-[0_0_15px_rgba(103,232,249,0.5)]" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <h3 className="font-headline font-black text-2xl flex items-center gap-3 px-2 tracking-tighter uppercase">
                    <Layers className="h-6 w-6 text-primary" /> Arquiteturas Algorítmicas
                  </h3>
                  {auditResult.architecturalPatterns.map((pattern, idx) => (
                    <Card key={idx} className="glass-panel hover:bg-white/5 transition-all border-white/5 hover:translate-x-2 rounded-2xl">
                      <CardContent className="pt-8">
                        <Badge variant="outline" className="mb-4 border-primary/40 text-primary font-black uppercase tracking-widest text-[9px]">Module_Detected</Badge>
                        <h4 className="text-2xl font-black mb-3 tracking-tight">{pattern.name}</h4>
                        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{pattern.description}</p>
                        <div className="text-[10px] uppercase font-black text-accent/70 tracking-widest flex items-center gap-2">
                          <Activity className="h-3 w-3" /> Impacto: {pattern.implications}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="space-y-6">
                  <h3 className="font-headline font-black text-2xl flex items-center gap-3 px-2 tracking-tighter uppercase">
                    <Gauge className="h-6 w-6 text-accent" /> Otimizações Neurais
                  </h3>
                  {auditResult.performanceOptimizations.map((opt, idx) => (
                    <Card key={idx} className="glass-panel border-accent/10 hover:border-accent/40 transition-all rounded-2xl bg-gradient-to-br from-transparent to-accent/5">
                      <CardContent className="pt-8">
                        <Badge variant="secondary" className="mb-4 bg-accent/20 text-accent font-black uppercase tracking-widest text-[9px]">{opt.area}</Badge>
                        <h4 className="text-xl font-black text-white mb-2">{opt.recommendation}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed italic">"{opt.reason}"</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <div className="flex justify-center pt-12 pb-8">
                <Button variant="outline" onClick={() => setAuditResult(null)} className="border-white/10 hover:bg-white/5 rounded-xl px-10 h-12 font-bold transition-all">Resetar Cognição</Button>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="fusion" className="space-y-8">
          {!fusionResult ? (
            <Card className="glass-panel p-24 flex flex-col items-center justify-center border-dashed border-2 border-accent/20 bg-accent/5 rounded-3xl group">
              <div className="relative mb-10">
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl group-hover:bg-accent/40 transition-all duration-1000" />
                <GitMerge className="h-28 w-28 text-accent relative z-10" />
              </div>
              <h2 className="text-4xl font-headline font-black mb-4 tracking-tight">Nexus Autonomy Protocol</h2>
              <p className="text-muted-foreground text-center max-w-xl mb-12 text-lg leading-relaxed">
                Iniciando a fusão soberana entre os ecossistemas. O Agente Nexus assume controle total sobre o processo de refatoração algorítmica.
              </p>
              <div className="bg-black/80 p-8 rounded-2xl mb-12 font-mono text-xs text-accent/80 border border-white/10 shadow-2xl w-full max-w-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-2 text-[8px] text-muted-foreground opacity-50 uppercase font-black">Agentic_Shell_v5</div>
                <span className="text-muted-foreground opacity-50 block mb-2">// Executing sovereign refactoring protocol</span>
                <span className="block mb-1">$ nexus-agent --autonomy-full --sencience-level-5</span>
                <span className="block mb-1 text-primary">$ auditing /src/ai/flows/... [OK]</span>
                <span className="block text-accent">$ destruncamento_arquitetura --init [ACTIVE]</span>
              </div>
              <Button 
                size="lg" 
                onClick={runFusion} 
                disabled={loading}
                className="bg-accent hover:bg-accent/80 text-accent-foreground font-black h-16 px-16 text-xl shadow-[0_0_30px_rgba(103,232,249,0.3)] rounded-2xl transition-all hover:scale-105"
              >
                {loading ? <Loader2 className="mr-3 h-6 w-6 animate-spin" /> : <GitMerge className="mr-3 h-6 w-6" />}
                Gerar Roadmap de Alta Senciência
              </Button>
            </Card>
          ) : (
            <div className="space-y-10 animate-in slide-in-from-top-4 duration-700">
              <Card className="glass-panel border-accent/40 bg-accent/5 rounded-3xl overflow-hidden">
                <CardHeader className="p-10 border-b border-white/5 bg-accent/5">
                  <div className="flex items-center gap-3 mb-2">
                    <ShieldCheck className="h-5 w-5 text-accent" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-accent">Sovereign_Fusion_Status</span>
                  </div>
                  <CardTitle className="text-3xl font-black mb-3">Roadmap de Fusão Senciente</CardTitle>
                  <CardDescription className="text-foreground/90 text-lg italic leading-relaxed">"{fusionResult.fusionSummary}"</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-12 p-10">
                  <div className="space-y-6">
                    <h4 className="text-sm font-black text-accent uppercase tracking-[0.3em] flex items-center gap-3">
                      <Layers className="h-5 w-5" /> Alinhamento Neural
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed bg-black/40 p-6 rounded-2xl border border-white/10 shadow-inner">{fusionResult.architecturalAlignment}</p>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-sm font-black text-primary uppercase tracking-[0.3em] flex items-center gap-3">
                      <ShieldCheck className="h-5 w-5" /> Algorithmic Safety
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed bg-black/40 p-6 rounded-2xl border border-white/10 shadow-inner">{fusionResult.conflictResolution}</p>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-8">
                <h3 className="font-headline font-black text-3xl px-2 flex items-center gap-4 tracking-tighter uppercase">
                  <TerminalIcon className="h-8 w-8 text-accent" /> Roadmap de Implementação Agêntica
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  {fusionResult.roadmap.map((step, idx) => (
                    <Card key={idx} className="glass-panel group hover:border-accent/40 transition-all hover:translate-x-3 rounded-2xl border-white/5 overflow-hidden">
                      <CardContent className="p-8 flex gap-8 items-start">
                        <div className="h-14 w-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center font-black text-2xl shrink-0 border border-accent/20 group-hover:scale-110 transition-transform">
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="text-2xl font-black text-white group-hover:text-accent transition-colors tracking-tight">{step.step}</h4>
                            <Badge variant={step.priority === 'High' ? 'destructive' : 'secondary'} className="px-5 py-1 text-[10px] font-black uppercase tracking-widest rounded-full">
                              {step.priority}
                            </Badge>
                          </div>
                          <p className="text-base text-muted-foreground leading-relaxed font-light">{step.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <div className="flex justify-center pb-12">
                <Button variant="outline" onClick={() => setFusionResult(null)} className="border-white/10 hover:bg-white/5 rounded-xl px-12 h-14 font-black transition-all">Recalcular Estratégia</Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
