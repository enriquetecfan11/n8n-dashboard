'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";
import { useTheme } from "next-themes";

export default function SettingsPage() {
    const { theme, setTheme } = useTheme();

    const handleChange = (checked: boolean) => {
        if (checked && theme !== 'dark') {
            setTheme('dark');
        } else if (!checked && theme !== 'light') {
            setTheme('light');
        }
    };
    return (
        <>
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

            <Card className="mt-8">
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
        </>
    )
}