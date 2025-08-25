'use client'

import { useState, useEffect } from 'react'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, CheckCircle, Clock, Edit, Eye, GitBranch, MoreHorizontal, Pause, Play, RefreshCw, Trash2, CircleStopIcon as Stop } from "lucide-react";
import WorkflowVisualization from '@/components/workflow-visualization';
import { useN8nApi } from '@/lib/use-n8n-api';
import { N8nWorkflow } from '@/lib/n8n-api';

export default function WorkflowsPage() {
    const [view, setView] = useState<'list' | 'visualization'>('list')
    const [workflows, setWorkflows] = useState<N8nWorkflow[]>([])
    const { loading, getWorkflows, activateWorkflow, deactivateWorkflow, executeWorkflow, isConnected } = useN8nApi()
    
    useEffect(() => {
        fetchWorkflows();
    }, [])
    
    const fetchWorkflows = async () => {
        const data = await getWorkflows();
        if (data) {
            setWorkflows(data);
        }
    }
    
    const getStatusIcon = (active: boolean) => {
        return active ? 
            <CheckCircle className="h-4 w-4 text-green-500" /> : 
            <Pause className="h-4 w-4 text-yellow-500" />
    }

    const getStatusBadge = (active: boolean) => {
        return <Badge variant={active ? "default" : "secondary"}>
            {active ? "active" : "inactive"}
        </Badge>
    }

    const handleWorkflowAction = async (workflowId: string, action: string) => {
        let success = false;
        
        switch (action) {
            case "start":
                success = await activateWorkflow(workflowId);
                break;
            case "pause":
                success = await deactivateWorkflow(workflowId);
                break;
            case "execute":
                success = await executeWorkflow(workflowId);
                break;
            default:
                console.log(`${action} workflow ${workflowId}`);
                return;
        }
        
        if (success) {
            // Refresh the workflow list
            fetchWorkflows();
        }
    }
    
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Workflows</h1>
                    <p className="text-muted-foreground">
                        Manage and monitor all your n8n workflows
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button 
                        variant={view === 'list' ? 'default' : 'outline'}
                        onClick={() => setView('list')}
                    >
                        List View
                    </Button>
                    <Button 
                        variant={view === 'visualization' ? 'default' : 'outline'}
                        onClick={() => setView('visualization')}
                    >
                        Visualization
                    </Button>
                    <Button onClick={fetchWorkflows} disabled={loading}>
                        <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                </div>
            </div>
            
            {view === 'list' ? (
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
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Workflow</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Nodes</TableHead>
                                        <TableHead>Connections</TableHead>
                                        <TableHead>Last Updated</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {workflows.map((workflow) => (
                                        <TableRow key={workflow.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    {getStatusIcon(workflow.active)}
                                                    <div>
                                                        <div className="font-medium">{workflow.name}</div>
                                                        <div className="text-sm text-muted-foreground">
                                                            Created {new Date(workflow.createdAt).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{getStatusBadge(workflow.active)}</TableCell>
                                            <TableCell>{workflow.nodes}</TableCell>
                                            <TableCell>{workflow.connections}</TableCell>
                                            <TableCell className="text-sm">
                                                {new Date(workflow.updatedAt).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    {workflow.active ? (
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
                                                        onClick={() => handleWorkflowAction(workflow.id, "execute")}
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
                                                            <DropdownMenuItem>
                                                                <Eye className="h-4 w-4 mr-2" />
                                                                View Details
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <Edit className="h-4 w-4 mr-2" />
                                                                Edit Workflow
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleWorkflowAction(workflow.id, "execute")}>
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
                        )}
                    </CardContent>
                </Card>
            ) : (
                <WorkflowVisualization />
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Workflow Controls</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Start, stop, and manage your workflows with intuitive controls.
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Execution Monitoring</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Track workflow execution in real-time with detailed logs.
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Performance Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Analyze success rates and optimize your workflow performance.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}