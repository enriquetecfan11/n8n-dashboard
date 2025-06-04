'use client'
import { Sidebar, SidebarBody, SidebarLink } from "@/components/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Activity, FolderGit2, GitBranch, LayoutDashboard, LogOut, RefreshCw, Settings, Users, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DashboardLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter()

    const links = [
        {
            label: "Monitoring",
            href: "/dashboard",
            icon: (
                <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Workflows",
            href: "/dashboard/workflows",
            icon: (
                <GitBranch className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Users",
            href: "/dashboard/users",
            icon: (
                <Users className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Executions",
            href: "/dashboard/executions",
            icon: (
                <Activity className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Projects",
            href: "/dashboard/projects",
            icon: (
                <FolderGit2 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Settings",
            href: "/dashboard/settings",
            icon: (
                <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Logout",
            href: "/",
            icon: (
                <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
    ];
    const [open, setOpen] = useState(false);
    return (
        <div
            className={cn(
                "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden"
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        <Zap className="h-6 w-6 text-primary" />
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                </SidebarBody>
                <div className="min-h-screen min-w-screen bg-background">
                    <div className="bg-card">
                        <div className="container mx-auto px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Badge variant="outline">
                                        v1.2.2
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button variant="outline" size="sm" onClick={() => router.refresh()}>
                                        <RefreshCw className="h-4 w-4 mr-2" />
                                        Refresh
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container mx-auto px-6 py-6">
                        {children}
                    </div>
                </div>
            </Sidebar>
        </div>
    );

}