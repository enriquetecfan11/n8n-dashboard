"use client"

import { useState } from "react"
import {
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Database,
  GitBranch,
  Pause,
  Play,
  RefreshCw,
  Settings,
  CircleStopIcon as Stop,
  Zap,
  TrendingUp,
  Server,
  BarChart3,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"

const systemStats = {
  totalWorkflows: 24,
  activeWorkflows: 18,
  totalExecutions: 1247,
  successRate: 94.2,
  avgExecutionTime: 2.3,
  systemUptime: "99.8%",
}

const workflows = [
  {
    id: "wf_001",
    name: "Customer Onboarding",
    status: "active",
    lastExecution: "2 minutes ago",
    executions: 156,
    successRate: 98.1,
    avgDuration: 1.2,
    trigger: "webhook",
    nodes: 8,
  },
  {
    id: "wf_002",
    name: "Data Sync Pipeline",
    status: "active",
    lastExecution: "5 minutes ago",
    executions: 89,
    successRate: 96.6,
    avgDuration: 4.1,
    trigger: "schedule",
    nodes: 12,
  },
  {
    id: "wf_003",
    name: "Email Campaign Automation",
    status: "paused",
    lastExecution: "1 hour ago",
    executions: 234,
    successRate: 92.3,
    avgDuration: 0.8,
    trigger: "manual",
    nodes: 6,
  },
  {
    id: "wf_004",
    name: "Slack Notifications",
    status: "error",
    lastExecution: "10 minutes ago",
    executions: 45,
    successRate: 88.9,
    avgDuration: 0.3,
    trigger: "webhook",
    nodes: 4,
  },
  {
    id: "wf_005",
    name: "Database Backup",
    status: "active",
    lastExecution: "30 minutes ago",
    executions: 67,
    successRate: 100,
    avgDuration: 8.2,
    trigger: "schedule",
    nodes: 5,
  },
]

const recentExecutions = [
  {
    id: "exec_001",
    workflowName: "Customer Onboarding",
    status: "success",
    startTime: "2024-01-15 14:32:15",
    duration: "1.2s",
    trigger: "webhook",
  },
  {
    id: "exec_002",
    workflowName: "Data Sync Pipeline",
    status: "success",
    startTime: "2024-01-15 14:30:45",
    duration: "4.1s",
    trigger: "schedule",
  },
  {
    id: "exec_003",
    workflowName: "Slack Notifications",
    status: "error",
    startTime: "2024-01-15 14:28:22",
    duration: "0.8s",
    trigger: "webhook",
  },
  {
    id: "exec_004",
    workflowName: "Database Backup",
    status: "success",
    startTime: "2024-01-15 14:25:10",
    duration: "8.2s",
    trigger: "schedule",
  },
  {
    id: "exec_005",
    workflowName: "Email Campaign Automation",
    status: "success",
    startTime: "2024-01-15 13:45:33",
    duration: "0.9s",
    trigger: "manual",
  },
]

export default function N8nDashboard() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null)
  const { theme, setTheme } = useTheme();

  const handleChange = (checked: boolean) => {
    if (checked && theme !== 'dark') {
      setTheme('dark');
    } else if (!checked && theme !== 'light') {
      setTheme('light');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "paused":
        return <Pause className="h-4 w-4 text-yellow-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      paused: "secondary",
      error: "destructive",
      success: "default",
    } as const

    return <Badge variant={variants[status as keyof typeof variants] || "secondary"}>{status}</Badge>
  }

  const handleWorkflowAction = (workflowId: string, action: string) => {
    console.log(`${action} workflow ${workflowId}`)
    // Here you would make API calls to n8n
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Zap className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold">n8n Dashboard</h1>
              </div>
              <Badge variant="outline" className="ml-4">
                v1.0.0
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
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
              <CardTitle className="text-sm font-medium">Avg Execution Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.avgExecutionTime}s</div>
              <p className="text-xs text-muted-foreground">-0.3s from last week</p>
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

        <Tabs defaultValue="workflows" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="workflows">Workflows</TabsTrigger>
            <TabsTrigger value="executions">Recent Executions</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="workflows" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5" />
                  Workflow Management
                </CardTitle>
                <CardDescription>
                  Monitor and control all your n8n workflows from this central dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Workflow</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Execution</TableHead>
                      <TableHead>Executions</TableHead>
                      <TableHead>Success Rate</TableHead>
                      <TableHead>Avg Duration</TableHead>
                      <TableHead>Trigger</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {workflows.map((workflow) => (
                      <TableRow key={workflow.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(workflow.status)}
                            <div>
                              <div className="font-medium">{workflow.name}</div>
                              <div className="text-sm text-muted-foreground">{workflow.nodes} nodes</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(workflow.status)}</TableCell>
                        <TableCell className="text-sm">{workflow.lastExecution}</TableCell>
                        <TableCell>{workflow.executions}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span
                              className={
                                workflow.successRate >= 95
                                  ? "text-green-600"
                                  : workflow.successRate >= 90
                                    ? "text-yellow-600"
                                    : "text-red-600"
                              }
                            >
                              {workflow.successRate}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{workflow.avgDuration}s</TableCell>
                        <TableCell>
                          <Badge variant="outline">{workflow.trigger}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {workflow.status === "active" ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleWorkflowAction(workflow.id, "pause")}
                              >
                                <Pause className="h-3 w-3" />
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleWorkflowAction(workflow.id, "start")}
                              >
                                <Play className="h-3 w-3" />
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleWorkflowAction(workflow.id, "stop")}
                            >
                              <Stop className="h-3 w-3" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <MoreHorizontal className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Workflow
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <RefreshCw className="h-4 w-4 mr-2" />
                                  Execute Now
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recent Executions Tab */}
          <TabsContent value="executions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Executions
                </CardTitle>
                <CardDescription>Latest workflow execution history and results</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Workflow</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Start Time</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Trigger</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentExecutions.map((execution) => (
                      <TableRow key={execution.id}>
                        <TableCell className="font-medium">{execution.workflowName}</TableCell>
                        <TableCell>{getStatusBadge(execution.status)}</TableCell>
                        <TableCell className="text-sm">{execution.startTime}</TableCell>
                        <TableCell>{execution.duration}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{execution.trigger}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            View Logs
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Monitoring Tab */}
          <TabsContent value="monitoring" className="space-y-6">
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

            <Card>
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
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Dashboard Settings
                </CardTitle>
                <CardDescription>Configure your dashboard preferences and n8n connection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Auto Refresh</div>
                      <div className="text-sm text-muted-foreground">Automatically refresh dashboard data</div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Real-time Notifications</div>
                      <div className="text-sm text-muted-foreground">Show notifications for workflow events</div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Dark Mode</div>
                      <div className="text-sm text-muted-foreground">Use dark theme for the dashboard</div>
                    </div>
                    <Switch checked={theme === 'dark'} onCheckedChange={handleChange} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Compact View</div>
                      <div className="text-sm text-muted-foreground">Show more data in less space</div>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>n8n Connection</CardTitle>
                <CardDescription>Configure connection to your n8n instance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">n8n URL</label>
                    <input
                      className="w-full mt-1 px-3 py-2 border rounded-md"
                      placeholder="https://your-n8n-instance.com"
                      defaultValue="https://n8n.example.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">API Key</label>
                    <input
                      type="password"
                      className="w-full mt-1 px-3 py-2 border rounded-md"
                      placeholder="Your API key"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button>Test Connection</Button>
                  <Button variant="outline">Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
