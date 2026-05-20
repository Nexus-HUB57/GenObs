"use client"

import { useState } from "react"
import { semanticallySearchVault, type SemanticallySearchVaultOutput } from "@/ai/flows/semantically-search-vault"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Search, Loader2, FileText, ExternalLink, Hash } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function VaultSearch() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<SemanticallySearchVaultOutput | null>(null)

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    try {
      const data = await semanticallySearchVault({ query })
      setResults(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-headline font-bold text-white flex items-center gap-3">
          <Database className="h-8 w-8 text-accent" /> Vault Discovery
        </h1>
        <p className="text-muted-foreground">High-dimensional semantic search across your local Obsidian workspace.</p>
      </div>

      <Card className="glass-panel overflow-hidden border-accent/20">
        <CardContent className="p-0">
          <form onSubmit={handleSearch} className="flex gap-0">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                className="h-16 pl-12 bg-transparent border-none text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Search notes, concepts, or code snippets..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button 
              type="submit"
              disabled={loading || !query.trim()}
              className="h-16 px-8 rounded-none bg-accent hover:bg-accent/80 text-accent-foreground font-bold text-base"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Query Index"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {results && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 space-y-4">
            <Card className="glass-panel border-accent/10">
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Hash className="h-4 w-4 text-accent" /> Agent Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {results.summary}
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2 space-y-4">
            {results.results.map((res) => (
              <Card key={res.id} className="glass-panel group hover:border-accent/30 transition-all">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-accent" />
                      <span className="text-sm font-mono text-muted-foreground truncate max-w-[300px]">{res.id}</span>
                    </div>
                    <Badge variant="secondary" className="bg-accent/10 text-accent border-none text-[10px]">
                      {(res.score * 100).toFixed(0)}% Similarity
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-black/20 p-4 rounded-md border border-white/5 mb-4">
                    <p className="text-sm font-body italic text-muted-foreground/80 leading-relaxed line-clamp-3">
                      "...{res.snippet}..."
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 text-accent hover:bg-accent/10 hover:text-accent gap-2">
                    Open in Obsidian <ExternalLink className="h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}