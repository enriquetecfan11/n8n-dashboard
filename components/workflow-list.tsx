// components/workflow-list.tsx
'use client'

import { useState, useEffect } from 'react'
import { 
  CheckCircle, 
  Pause, 
  AlertTriangle, 
  MoreHorizontal,
  Play,
  Square,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useN8nApi } from '@/lib/use-n8n-api'
import { N8nWorkflow } from '@/lib/n8n-api'
import { LoadingSpinner } from '@/components/loading-spinner'

interface WorkflowListProps {
  onWorkflowAction?: (workflowId: string, action: string) => void
}

export default function WorkflowList({ onWorkflowAction }: WorkflowListProps) {
  const [workflows, setWorkflows] = useState<N8nWorkflow[]>([])
  const [loading, setLoading] = useState(true)
  const { getWorkflows, activateWorkflow, deactivateWorkflow, executeWorkflow, isConnected } = useN8nApi()

  useEffect(() => {
    if (!isConnected) {
      setLoading(false)
      return
    }
    
    fetchWorkflows()
  }, [isConnected])

  const fetchWorkflows = async () => {
    setLoading(true)
    try {
      const data = await getWorkflows()
      if (data) {
        setWorkflows(data)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleWorkflowAction = async (workflowId: string, action: string) => {
    let success = false
    
    switch (action) {
      case 'activate':
        success = await activateWorkflow(workflowId)
        break
      case 'deactivate':
        success = await deactivateWorkflow(workflowId)
        break
      case 'execute':
        success = await executeWorkflow(workflowId)
        break
      default:
        console.log(`Unknown action: ${action}`)
        return
    }
    
    if (success && onWorkflowAction) {
      onWorkflowAction(workflowId, action)
      // Refresh the list after action
      fetchWorkflows()
    }
  }

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <AlertCircle className="h-8 w-8 text-yellow-500 mb-2" />
        <p className="text-muted-foreground text-center">
          Connect to n8n to view and manage workflows
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

  if (workflows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <p className="text-muted-foreground text-center">
          No workflows found
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {workflows.map((workflow) => (
        <div 
          key={workflow.id} 
          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            {workflow.active ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <Pause className="h-5 w-5 text-yellow-500" />
            )}
            <div>
              <div className="font-medium">{workflow.name}</div>
              <div className="text-sm text-muted-foreground">
                {workflow.nodes} nodes • Updated {new Date(workflow.updatedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant={workflow.active ? 'default' : 'secondary'}>
              {workflow.active ? 'Active' : 'Inactive'}
            </Badge>
            
            <div className="flex gap-1">
              {workflow.active ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleWorkflowAction(workflow.id, 'deactivate')}
                >
                  <Pause className="h-3 w-3" />
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleWorkflowAction(workflow.id, 'activate')}
                >
                  <Play className="h-3 w-3" />
                </Button>
              )}
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleWorkflowAction(workflow.id, 'execute')}
              >
                <Play className="h-3 w-3" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleWorkflowAction(workflow.id, 'execute')}>
                    Execute Now
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Edit Workflow
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}