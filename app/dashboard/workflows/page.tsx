'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, CheckCircle, Clock, Edit, Eye, GitBranch, MoreHorizontal, Pause, Play, RefreshCw, Trash2, CircleStopIcon as Stop } from "lucide-react";

export default function WorkflowsPage() {
    const workflows = [
        {
            id: "wf_001",
            name: "Customer Onboarding",
            status: "active",
            lastExecution: "2 minutes ago",
            executions: 156,
            successRate: 98.1,
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
            trigger: "schedule",
            nodes: 5,
        },
    ]
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
    )
}