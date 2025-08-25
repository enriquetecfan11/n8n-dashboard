// components/recent-executions.tsx
'use client'

import { useState, useEffect } from 'react'
import { 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  Eye,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useN8nApi } from '@/lib/use-n8n-api'
import { N8nExecution } from '@/lib/n8n-api'
import { LoadingSpinner } from '@/components/loading-spinner'

export default function RecentExecutions() {
  const [executions, setExecutions] = useState<N8nExecution[]>([])
  const [loading, setLoading] = useState(true)
  const { getExecutions, isConnected } = useN8nApi()

  useEffect(() => {
    if (!isConnected) {
      setLoading(false)
      return
    }
    
    fetchExecutions()
  }, [isConnected])

  const fetchExecutions = async () => {
    setLoading(true)
    try {
      const data = await getExecutions()
      if (data) {
        // Sort by startedAt descending and take first 5
        const sorted = data
          .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())
          .slice(0, 5)
        setExecutions(sorted)
      }
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case 'running':
        return <Clock className="h-4 w-4 text-blue-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'success':
        return 'default'
      case 'error':
        return 'destructive'
      case 'running':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  const formatDuration = (startedAt: string, finishedAt?: string) => {
    if (!finishedAt) return 'Running...'
    
    const start = new Date(startedAt)
    const end = new Date(finishedAt)
    const diffMs = end.getTime() - start.getTime()
    
    if (diffMs < 1000) {
      return `${diffMs}ms`
    }
    
    return `${(diffMs / 1000).toFixed(1)}s`
  }

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <AlertCircle className="h-8 w-8 text-yellow-500 mb-2" />
        <p className="text-muted-foreground text-center">
          Connect to n8n to view execution history
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner />
      </div>
    )
  }

  if (executions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <p className="text-muted-foreground text-center">
          No recent executions found
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {executions.map((execution) => (
        <div 
          key={execution.id} 
          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            {getStatusIcon(execution.status)}
            <div>
              <div className="font-medium">
                Execution {execution.id.substring(0, 8)}...
              </div>
              <div className="text-sm text-muted-foreground">
                Workflow: {execution.workflowId.substring(0, 8)}... • {new Date(execution.startedAt).toLocaleString()}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant={getStatusVariant(execution.status)}>
              {execution.status}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {formatDuration(execution.startedAt, execution.finishedAt)}
            </span>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}