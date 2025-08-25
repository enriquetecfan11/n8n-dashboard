'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { n8nApi } from '@/lib/n8n-api'
import { useN8nApi } from '@/lib/use-n8n-api'
import { RefreshCw, CheckCircle, XCircle } from 'lucide-react'

export default function ConnectionStatus() {
  const [isConnected, setIsConnected] = useState(false)
  const [lastChecked, setLastChecked] = useState<Date | null>(null)
  const { loading, testConnection } = useN8nApi()

  const checkConnection = async () => {
    const credentials = n8nApi.getCredentials()
    if (credentials.url && credentials.apiKey) {
      const success = await testConnection()
      setIsConnected(!!success)
      setLastChecked(new Date())
    } else {
      setIsConnected(false)
      setLastChecked(new Date())
    }
  }

  useEffect(() => {
    checkConnection()
    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connection Status</CardTitle>
        <CardDescription>n8n API Connection</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isConnected ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
            <span className="font-medium">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={checkConnection}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        {lastChecked && (
          <div className="text-xs text-muted-foreground mt-2">
            Last checked: {lastChecked.toLocaleTimeString()}
          </div>
        )}
      </CardContent>
    </Card>
  )
}