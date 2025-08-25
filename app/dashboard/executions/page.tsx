'use client'

import { useState, useEffect } from 'react'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, Eye, RefreshCw } from "lucide-react";
import { useN8nApi } from '@/lib/use-n8n-api';
import { N8nExecution } from '@/lib/n8n-api';

export default function ExecutionsPage() {
    const [executions, setExecutions] = useState<N8nExecution[]>([])
    const { loading, getExecutions, connected } = useN8nApi()
    
    useEffect(() => {
        fetchExecutions();
    }, [])
    
    const fetchExecutions = async () => {
        const data = await getExecutions();
        if (data) {
            setExecutions(data);
        }
    }

    const getStatusBadge = (status: string) => {
        const variants = {
            success: "default",
            error: "destructive",
            running: "secondary",
            waiting: "outline",
        } as const

        return <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
            {status}
        </Badge>
    }
    
    const formatDuration = (startedAt: string, finishedAt?: string) => {
        if (!finishedAt) return 'Running...';
        
        const start = new Date(startedAt);
        const end = new Date(finishedAt);
        const diffMs = end.getTime() - start.getTime();
        
        if (diffMs < 1000) {
            return `${diffMs}ms`;
        }
        
        return `${(diffMs / 1000).toFixed(1)}s`;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Executions</h1>
                    <p className="text-muted-foreground">
                        Track and monitor all workflow executions
                    </p>
                </div>
                <Button onClick={fetchExecutions} disabled={loading}>
                    <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        Recent Executions
                    </CardTitle>
                    <CardDescription>Latest workflow execution history and results</CardDescription>
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
                                    <TableHead>Execution ID</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Start Time</TableHead>
                                    <TableHead>Duration</TableHead>
                                    <TableHead>Mode</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {executions.map((execution) => (
                                    <TableRow key={execution.id}>
                                        <TableCell className="font-medium">
                                            <div>{execution.id.substring(0, 8)}...</div>
                                            <div className="text-sm text-muted-foreground">
                                                Workflow: {execution.workflowId}
                                            </div>
                                        </TableCell>
                                        <TableCell>{getStatusBadge(execution.status)}</TableCell>
                                        <TableCell className="text-sm">
                                            {new Date(execution.startedAt).toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            {formatDuration(execution.startedAt, execution.finishedAt)}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{execution.mode}</Badge>
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
                    )}
                </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Execution Tracking</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Monitor real-time execution status and performance metrics.
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Error Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Identify and troubleshoot failed executions with detailed logs.
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Performance Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Analyze execution times and optimize workflow performance.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}