"use client"

import { useState } from "react"
import {
    BarChart3,
    CheckCircle,
    GitBranch,
    Monitor,
    Play,
    Shield,
    Zap,
    ArrowRight,
    Github,
    Twitter,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

const features = [
    {
        icon: Monitor,
        title: "Real-time Monitoring",
        description: "Monitor all your workflows, executions, and system health in real-time with live updates.",
    },
    {
        icon: GitBranch,
        title: "Workflow Control",
        description: "Start, stop, pause, and manage all your n8n workflows directly from one central dashboard.",
    },
    {
        icon: BarChart3,
        title: "Performance Analytics",
        description: "Track success rates, execution times, and system performance with detailed analytics.",
    },
    {
        icon: Shield,
        title: "System Health",
        description: "Monitor CPU, memory, database status, and get alerts when something needs attention.",
    },
]

const stats = [
    { label: "Workflows Managed", value: "10K+" },
    { label: "Executions Tracked", value: "1M+" },
    { label: "Uptime Monitoring", value: "99.9%" },
    { label: "Response Time", value: "<100ms" },
]

export default function LandingPage() {
    const router = useRouter()
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Zap className="h-8 w-8 text-primary" />
                            <span className="text-xl font-bold">n8n Dashboard Pro</span>
                        </div>
                        <div className="flex items-center gap-4">
                            {/* <Button variant="ghost" size="sm">
                                Documentation
                            </Button>
                            <Button variant="ghost" size="sm">
                                Pricing
                            </Button> */}
                            <Button size="sm" onClick={() => router.push('/dashboard')}>
                                Get Started
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-20 px-6">
                <div className="container mx-auto text-center max-w-4xl">
                    <Badge variant="secondary" className="mb-6">
                        <Zap className="h-3 w-3 mr-1" />
                        The Ultimate n8n Management Tool
                    </Badge>

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Monitor & Control Your <span className="text-primary">n8n Workflows</span> Like Never Before
                    </h1>

                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        A powerful, intuitive dashboard that gives you complete visibility and control over your n8n automation
                        workflows. Monitor performance, manage executions, and ensure everything runs smoothly.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <Button size="lg" className="text-lg px-8" onClick={() => router.push('/dashboard')}>
                            Start Free
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6 bg-muted/30">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Manage n8n</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            From real-time monitoring to workflow control, get all the tools you need in one beautiful dashboard.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader className="text-center pb-4">
                                    <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                                        <feature.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Dashboard Preview */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">See Your n8n Instance at a Glance</h2>
                        <p className="text-xl text-muted-foreground">
                            Beautiful, intuitive interface designed for productivity and clarity.
                        </p>
                    </div>

                    <div
                        className="relative rounded-xl border bg-card shadow-2xl overflow-hidden transform transition-transform hover:scale-[1.02]"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 hover:opacity-100 transition-opacity" />

                        {/* Mock Dashboard Preview */}
                        <div className="p-6 bg-background">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <Zap className="h-6 w-6 text-primary" />
                                    <span className="font-semibold">n8n Dashboard</span>
                                </div>
                                <div className="flex gap-2">
                                    <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-xs text-muted-foreground">Live</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="bg-muted/50 rounded-lg p-4">
                                    <div className="text-2xl font-bold text-green-600">24</div>
                                    <div className="text-xs text-muted-foreground">Active Workflows</div>
                                </div>
                                <div className="bg-muted/50 rounded-lg p-4">
                                    <div className="text-2xl font-bold">1,247</div>
                                    <div className="text-xs text-muted-foreground">Total Executions</div>
                                </div>
                                <div className="bg-muted/50 rounded-lg p-4">
                                    <div className="text-2xl font-bold text-green-600">94.2%</div>
                                    <div className="text-xs text-muted-foreground">Success Rate</div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {[
                                    { name: "Customer Onboarding", status: "active", rate: "98%" },
                                    { name: "Data Sync Pipeline", status: "active", rate: "96%" },
                                    { name: "Email Automation", status: "paused", rate: "92%" },
                                ].map((workflow, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                            <span className="text-sm font-medium">{workflow.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant={workflow.status === "active" ? "default" : "secondary"}>{workflow.status}</Badge>
                                            <span className="text-xs text-muted-foreground">{workflow.rate}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-primary text-primary-foreground">
                <div className="container mx-auto text-center max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Take Control of Your n8n Workflows?</h2>
                    <p className="text-xl opacity-90 mb-8">
                        Join thousands of automation experts who trust n8n Dashboard Pro to monitor and manage their workflows.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary" className="text-lg px-8" onClick={() => router.push('/dashboard')}>
                            Start Free
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t bg-muted/30">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center gap-2 mb-4 md:mb-0">
                            <Zap className="h-6 w-6 text-primary" />
                            <span className="font-semibold">n8n Dashboard Pro</span>
                        </div>

                        <div className="flex items-center gap-6">
                            <Button variant="ghost" size="sm">
                                Privacy
                            </Button>
                            <Button variant="ghost" size="sm">
                                Terms
                            </Button>
                            <Button variant="ghost" size="sm">
                                Support
                            </Button>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                    <Github className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                    <Twitter className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                        © 2024 n8n Dashboard. Built with ❤️ by <a href="https://github.com/forjoa" className="underline">Joaquin</a>.
                    </div>
                </div>
            </footer>
        </div>
    )
}
