"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Terminal, Play, RotateCcw, ShieldAlert, Cpu, Binary } from "lucide-react"

export function Sandbox() {
  const [output, setOutput] = useState<string[]>(["Nexus Shell v1.0.4 initialized...", "Ready for secure Python execution."])
  const [command, setCommand] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const terminalEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [output])

  const handleRun = () => {
    if (!command.trim()) return
    setIsRunning(true)
    const newOutput = [...output, `>>> ${command}`]
    setOutput(newOutput)
    
    // Simulate sandboxed execution
    setTimeout(() => {
      setOutput([...newOutput, "Processing in isolated container...", "Output: Success (Mock Result)", "Process terminated safely."])
      setCommand("")
      setIsRunning(false)
    }, 800)
  }

  const clearShell = () => {
    setOutput(["Nexus Shell reset."])
  }

  return (
    <div className="p-8 space-y-6 h-full flex flex-col animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-headline font-bold text-white flex items-center gap-3">
            <Terminal className="h-8 w-8 text-accent" /> Sandboxed Shell
          </h1>
          <p className="text-muted-foreground">Secure local environment for automated scripts and logic validation.</p>
        </div>
        <div className="flex items-center gap-2">
           <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] text-green-500 font-bold uppercase tracking-wider">
             <ShieldAlert className="h-3 w-3" /> Secure Sandbox Active
           </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex-1 bg-black/40 rounded-xl border border-white/5 overflow-hidden flex flex-col shadow-inner shadow-black">
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/5">
              <span className="text-xs font-mono text-muted-foreground">terminal_session_main</span>
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/30" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/30" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/30" />
              </div>
            </div>
            <div className="flex-1 p-6 overflow-auto code-font">
              {output.map((line, i) => (
                <div key={i} className={`mb-1 ${line.startsWith('>>>') ? 'text-primary' : line.startsWith('Output') ? 'text-accent' : 'text-muted-foreground'}`}>
                  {line}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold">{'>>>'}</span>
              <input 
                className="w-full h-12 bg-black/40 border border-white/10 rounded-lg pl-12 pr-4 text-accent code-font focus:outline-none focus:border-primary/50"
                placeholder="Enter python command..."
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRun()}
              />
            </div>
            <Button onClick={handleRun} disabled={isRunning || !command.trim()} className="h-12 bg-primary text-white px-6">
              {isRunning ? <Cpu className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="outline" onClick={clearShell} className="h-12 border-white/10 hover:bg-white/5">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-1">Resource Monitor</h3>
          <div className="space-y-4">
            <Card className="glass-panel">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                   <Cpu className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span>V-CPU Allocation</span>
                    <span className="text-accent">2 Cores</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full">
                    <div className="h-full bg-accent w-1/2 rounded-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-panel">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                   <Binary className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Memory Usage</span>
                    <span className="text-primary">512MB</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full">
                    <div className="h-full bg-primary w-1/4 rounded-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
            <h4 className="text-xs font-bold text-primary uppercase mb-2">Sandbox Policy</h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Execution is limited to local file system read-only access within the workspace root. Network requests are disabled by default.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}