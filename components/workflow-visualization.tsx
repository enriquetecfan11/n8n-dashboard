'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Play, 
  Square, 
  RefreshCw, 
  Eye, 
  Download,
  ZoomIn,
  ZoomOut,
  GitBranch,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

// Mock workflow data
const mockWorkflow = {
  id: 'wf-1',
  name: 'Customer Onboarding Process',
  status: 'active',
  lastExecution: '2024-01-15T14:30:00Z',
  successRate: 98.1,
  nodes: [
    { id: 'node-1', name: 'Webhook Trigger', type: 'trigger', status: 'success', x: 100, y: 100 },
    { id: 'node-2', name: 'Fetch Customer Data', type: 'action', status: 'success', x: 300, y: 100 },
    { id: 'node-3', name: 'Send Welcome Email', type: 'action', status: 'success', x: 500, y: 100 },
    { id: 'node-4', name: 'Create CRM Record', type: 'action', status: 'success', x: 300, y: 250 },
    { id: 'node-5', name: 'Send Notification', type: 'action', status: 'pending', x: 500, y: 250 },
    { id: 'node-6', name: 'Update Dashboard', type: 'action', status: 'pending', x: 700, y: 175 }
  ],
  connections: [
    { from: 'node-1', to: 'node-2' },
    { from: 'node-2', to: 'node-3' },
    { from: 'node-2', to: 'node-4' },
    { from: 'node-4', to: 'node-5' },
    { from: 'node-3', to: 'node-6' },
    { from: 'node-5', to: 'node-6' }
  ]
}

export default function WorkflowVisualization() {
  const [workflow] = useState(mockWorkflow)
  const [zoomLevel, setZoomLevel] = useState(100)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'border-green-500 bg-green-500/10'
      case 'error':
        return 'border-red-500 bg-red-500/10'
      case 'pending':
        return 'border-yellow-500 bg-yellow-500/10'
      default:
        return 'border-gray-500 bg-gray-500/10'
    }
  }

  const zoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 25, 200))
  }

  const zoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 25, 50))
  }

  const resetZoom = () => {
    setZoomLevel(100)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">{workflow.name}</h3>
        <p className="text-sm text-muted-foreground">
          Visualize and manage your n8n workflow execution
        </p>
      </div>

      {/* Workflow Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5" />
                {workflow.name}
              </CardTitle>
              <CardDescription>
                Last executed: {new Date(workflow.lastExecution).toLocaleString()}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default" className="text-green-600">
                {workflow.successRate}% Success Rate
              </Badge>
              <Badge variant="secondary">
                {workflow.nodes.length} Nodes
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button>
                <Play className="h-4 w-4 mr-2" />
                Run Workflow
              </Button>
              <Button variant="outline">
                <Square className="h-4 w-4 mr-2" />
                Stop
              </Button>
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View Logs
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workflow Visualization */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Workflow Diagram</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={zoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm">{zoomLevel}%</span>
              <Button variant="outline" size="sm" onClick={zoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={resetZoom}>
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg bg-muted/30 p-6 min-h-[400px] relative overflow-hidden">
            {/* Visualization canvas */}
            <div 
              className="relative w-full h-full"
              style={{ 
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'top left'
              }}
            >
              {/* Connections */}
              <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                {workflow.connections.map((conn, index) => {
                  const fromNode = workflow.nodes.find(n => n.id === conn.from)
                  const toNode = workflow.nodes.find(n => n.id === conn.to)
                  
                  if (!fromNode || !toNode) return null
                  
                  return (
                    <line
                      key={index}
                      x1={fromNode.x + 75}
                      y1={fromNode.y + 25}
                      x2={toNode.x}
                      y2={toNode.y + 25}
                      stroke="#94a3b8"
                      strokeWidth="2"
                      markerEnd="url(#arrowhead)"
                    />
                  )
                })}
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="9"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon
                      points="0 0, 10 3.5, 0 7"
                      fill="#94a3b8"
                    />
                  </marker>
                </defs>
              </svg>
              
              {/* Nodes */}
              {workflow.nodes.map((node) => (
                <div
                  key={node.id}
                  className={`absolute w-36 p-3 rounded-lg border bg-background shadow-sm ${getStatusColor(node.status)}`}
                  style={{ left: node.x, top: node.y }}
                >
                  <div className="flex items-center gap-2">
                    {getStatusIcon(node.status)}
                    <div className="text-sm font-medium truncate">{node.name}</div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 capitalize">
                    {node.type}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Node Details */}
      <Card>
        <CardHeader>
          <CardTitle>Node Execution Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workflow.nodes.map((node) => (
              <div key={node.id} className={`p-3 rounded-lg border ${getStatusColor(node.status)}`}>
                <div className="flex items-center gap-2">
                  {getStatusIcon(node.status)}
                  <div className="font-medium">{node.name}</div>
                </div>
                <div className="text-sm text-muted-foreground mt-1 capitalize">
                  {node.type} node
                </div>
                <div className="text-xs mt-2">
                  Status: <span className="capitalize">{node.status}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}