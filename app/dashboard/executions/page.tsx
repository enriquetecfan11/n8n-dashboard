import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, Eye } from "lucide-react";

export default function ExecutionsPage() {
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

    const getStatusBadge = (status: string) => {
        const variants = {
            active: "default",
            paused: "secondary",
            error: "destructive",
            success: "default",
        } as const

        return <Badge variant={variants[status as keyof typeof variants] || "secondary"}>{status}</Badge>
    }

    return (
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
    )
}