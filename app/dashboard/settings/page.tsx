'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Settings, TestTube } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { n8nApi } from "@/lib/n8n-api";
import { useN8nApi } from "@/lib/use-n8n-api";
import { useNotification } from "@/components/notification-provider";

export default function SettingsPage() {
    const [url, setUrl] = useState<string>('')
    const [key, setKey] = useState<string>('')
    const [isConnected, setIsConnected] = useState<boolean>(false)
    const { testConnection } = useN8nApi()
    const { showSuccess, showError } = useNotification()

    useEffect(() => {
        const credentials = n8nApi.getCredentials();
        setUrl(credentials.url || '');
        setKey(credentials.apiKey || '');
        
        // Check if already connected
        if (credentials.url && credentials.apiKey) {
            setIsConnected(true);
        }
    }, [])

    const { theme, setTheme } = useTheme();

    const handleChange = (checked: boolean) => {
        if (checked && theme !== 'dark') {
            setTheme('dark');
        } else if (!checked && theme !== 'light') {
            setTheme('light');
        }
    };

    const handleTestConnection = async () => {
        const success = await testConnection({ url, apiKey: key });
        setIsConnected(success);
    }

    const saveCredentials = async () => {
        const success = await testConnection({ url, apiKey: key });
        if (success) {
            n8nApi.setCredentials(url, key);
            setIsConnected(true);
            showSuccess('Credentials saved successfully');
        } else {
            setIsConnected(false);
            showError('Failed to save credentials. Please check your connection.');
        }
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground">
                    Configure your dashboard preferences and n8n connection
                </p>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Dashboard Settings
                    </CardTitle>
                    <CardDescription>Customize your dashboard experience</CardDescription>
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
                    <CardTitle className="flex items-center gap-2">
                        <TestTube className="h-5 w-5" />
                        n8n Connection
                    </CardTitle>
                    <CardDescription>Connect to your n8n instance to manage workflows</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium">n8n URL</label>
                            <input
                                className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
                                placeholder="https://your-n8n-instance.com"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">API Key</label>
                            <input
                                type="password"
                                className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
                                placeholder="Your API key"
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="flex gap-2">
                            <Button onClick={handleTestConnection}>
                                <TestTube className="h-4 w-4 mr-2" />
                                Test Connection
                            </Button>
                            <Button variant="outline" onClick={saveCredentials}>
                                Save Settings
                            </Button>
                        </div>
                        
                        {isConnected && (
                            <div className="flex items-center gap-2 text-green-600">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                <span className="text-sm">Connected</span>
                            </div>
                        )}
                    </div>
                    
                    <div className="p-4 bg-muted/30 rounded-md">
                        <h3 className="font-medium mb-2">How to get your n8n API key</h3>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                            <li>Log in to your n8n instance</li>
                            <li>Go to Settings → API</li>
                            <li>Generate a new Personal Access Token</li>
                            <li>Copy the token and paste it above</li>
                        </ol>
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>System Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-3 bg-muted/30 rounded-md">
                            <div className="text-sm font-medium">Version</div>
                            <div className="text-2xl font-bold">v1.3.0</div>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-md">
                            <div className="text-sm font-medium">Status</div>
                            <div className="text-2xl font-bold text-green-600">Operational</div>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-md">
                            <div className="text-sm font-medium">Last Updated</div>
                            <div className="text-2xl font-bold">Today</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}