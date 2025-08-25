// components/real-time-stats.tsx
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useN8nApi } from '@/lib/use-n8n-api'
import { N8nWorkflow, N8nExecution } from '@/lib/n8n-api'
import { AlertCircle } from 'lucide-react'

export default function RealTimeStats() {
  const [workflows, setWorkflows] = useState<N8nWorkflow[]>([])
  const [executions, setExecutions] = useState<N8nExecution[]>([])
  const [loading, setLoading] = useState(true)
  const { getWorkflows, getExecutions, isConnected } = useN8nApi()

  useEffect(() => {
    if (!isConnected) {
      setLoading(false)
      return
    }
    
    const fetchData = async () => {
      setLoading(true)
      try {
        const [workflowData, executionData] = await Promise.all([
          getWorkflows(),
          getExecutions()
        ])
        
        if (workflowData) setWorkflows(workflowData)
        if (executionData) setExecutions(executionData)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [isConnected])

  const activeWorkflows = workflows.filter(w => w.active).length
  const totalExecutions = executions.length
  const successRate = executions.length > 0 
    ? (executions.filter(e => e.status === 'success').length / executions.length) * 100
    : 0

  if (!isConnected) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="col-span-3">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <AlertCircle className="h-8 w-8 text-yellow-500 mb-2" />
            <p className="text-muted-foreground text-center">
              Connect to n8n to view real-time statistics
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="h-4 bg-muted rounded w-24"></div>
            </CardHeader>
            <CardContent>
              <div className="h-6 bg-muted rounded w-16"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Active Workflows</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeWorkflows}</div>
          <p className="text-xs text-muted-foreground">
            of {workflows.length} total workflows
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Total Executions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalExecutions.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            in the last 24 hours
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Success Rate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{successRate.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">
            of all executions
          </p>
        </CardContent>
      </Card>
    </div>
  )
}