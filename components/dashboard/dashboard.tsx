"use client"
import {
  Activity,
  GitBranch,
  TrendingUp,
  BarChart3,
  Users,
  Database,
  Zap,
  Play,
  Pause,
  Square,
  AlertCircle
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ConnectionStatus from "@/components/connection-status"
import RealTimeStats from "@/components/real-time-stats"
import WorkflowList from "@/components/workflow-list"
import RecentExecutions from "@/components/recent-executions"
import { useN8nApi } from "@/lib/use-n8n-api"

export default function N8nDashboard() {
  const { connected } = useN8nApi()
  
  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="h-12 w-12 text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Not Connected to n8n</h2>
        <p className="text-muted-foreground mb-6 text-center max-w-md">
          Please configure your n8n connection in the Settings page to view real-time workflow data.
        </p>
        <Button onClick={() => window.location.href = '/dashboard/settings'}>
          Go to Settings
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Connection Status and Real-time Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-1">
          <ConnectionStatus />
        </div>
        <div className="lg:col-span-4">
          <RealTimeStats />
        </div>
      </div>

      {/* Workflows and Recent Executions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Workflows */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Active Workflows
            </CardTitle>
          </CardHeader>
          <CardContent>
            <WorkflowList onlyActive />
          </CardContent>
        </Card>

        {/* Recent Executions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Executions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RecentExecutions />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button>
              <Play className="h-4 w-4 mr-2" />
              Start All Workflows
            </Button>
            <Button variant="outline">
              <Pause className="h-4 w-4 mr-2" />
              Pause All Workflows
            </Button>
            <Button variant="outline">
              <Square className="h-4 w-4 mr-2" />
              Stop All Workflows
            </Button>
            <Button variant="outline">
              <GitBranch className="h-4 w-4 mr-2" />
              Create New Workflow
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">--</div>
            <p className="text-muted-foreground">Users working with workflows</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data Processed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">--</div>
            <p className="text-muted-foreground">In the last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              System Uptime
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">--</div>
            <p className="text-muted-foreground">System availability</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
