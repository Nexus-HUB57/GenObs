"use client"

import { useState } from "react"
import { generateCodeSnippet, type GenerateCodeSnippetInput } from "@/ai/flows/generate-code-snippet"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Binary, Copy, Check, Loader2, Sparkles, Wand2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function CodeGenerator() {
  const [loading, setLoading] = useState(false)
  const [language, setLanguage] = useState<GenerateCodeSnippetInput['language']>('TypeScript')
  const [description, setDescription] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!description.trim()) return
    setLoading(true)
    try {
      const result = await generateCodeSnippet({ language, description })
      setGeneratedCode(result.code)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "An error occurred while communicating with the local Ollama instance."
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-headline font-bold text-white flex items-center gap-3">
            <Binary className="h-8 w-8 text-primary" /> Code Synthesis
          </h1>
          <p className="text-muted-foreground mt-1">Multi-language code generation via local-first privacy models.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Wand2 className="h-4 w-4 text-accent" /> Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Target Language</label>
                <Select value={language} onValueChange={(v) => setLanguage(v as any)}>
                  <SelectTrigger className="bg-secondary/50 border-white/5">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TypeScript">TypeScript</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="Java">Java</SelectItem>
                    <SelectItem value="Cpp">C++</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Function Description</label>
                <Textarea 
                  placeholder="e.g. Create an asynchronous function to fetch users from an API with retry logic..."
                  className="min-h-[150px] bg-secondary/50 border-white/5 resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <Button 
                className="w-full bg-primary hover:bg-primary/80 text-white font-bold"
                onClick={handleGenerate}
                disabled={loading || !description.trim()}
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Execute Synthesis
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="glass-panel h-full min-h-[500px] flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
              <CardTitle className="text-sm font-medium text-muted-foreground">Output: {language}</CardTitle>
              {generatedCode && (
                <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-8 gap-2">
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copied' : 'Copy'}
                </Button>
              )}
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden">
              {generatedCode ? (
                <pre className="p-6 code-font overflow-auto h-full max-h-[600px] bg-black/20">
                  <code className="text-accent/90">{generatedCode}</code>
                </pre>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4 opacity-50">
                  <Binary className="h-12 w-12" />
                  <p className="text-sm">Enter a description and synthesize code to see output.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}