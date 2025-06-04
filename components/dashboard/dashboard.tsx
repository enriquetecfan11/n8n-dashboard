"use client"

import {
  Activity,
  AlertCircle,
  CheckCircle,
  Database,
  GitBranch,
  TrendingUp,
  Server,
  BarChart3,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const systemStats = {
  totalWorkflows: 24,
  activeWorkflows: 18,
  totalExecutions: 1247,
  successRate: 94.2,
  avgExecutionTime: 2.3,
  systemUptime: "99.8%",
}

export default function N8nDashboard() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Workflows</CardTitle>
            <GitBranch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalWorkflows}</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{systemStats.activeWorkflows}</div>
            <p className="text-xs text-muted-foreground">
              {((systemStats.activeWorkflows / systemStats.totalWorkflows) * 100).toFixed(1)}% active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Executions</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalExecutions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{systemStats.successRate}%</div>
            <Progress value={systemStats.successRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{systemStats.systemUptime}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>CPU Usage</span>
              <span className="text-sm font-medium">23%</span>
            </div>
            <Progress value={23} />

            <div className="flex items-center justify-between">
              <span>Memory Usage</span>
              <span className="text-sm font-medium">67%</span>
            </div>
            <Progress value={67} />

            <div className="flex items-center justify-between">
              <span>Disk Usage</span>
              <span className="text-sm font-medium">45%</span>
            </div>
            <Progress value={45} />

            <div className="flex items-center justify-between">
              <span>Network I/O</span>
              <span className="text-sm font-medium">12%</span>
            </div>
            <Progress value={12} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Connection Status</span>
              <Badge variant="default">Connected</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Active Connections</span>
              <span className="text-sm font-medium">8/20</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Query Performance</span>
              <span className="text-sm font-medium">1.2ms avg</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Storage Used</span>
              <span className="text-sm font-medium">2.4GB</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            System Alerts
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              <div className="flex-1">
                <div className="font-medium">High Memory Usage</div>
                <div className="text-sm text-muted-foreground">Memory usage is above 80%</div>
              </div>
              <Badge variant="secondary">Warning</Badge>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <div className="flex-1">
                <div className="font-medium">All Systems Operational</div>
                <div className="text-sm text-muted-foreground">No critical issues detected</div>
              </div>
              <Badge variant="default">Info</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
