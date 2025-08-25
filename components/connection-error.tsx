// components/connection-error.tsx
'use client'

import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { n8nApi } from '@/lib/n8n-api'
import { useN8nApi } from '@/lib/use-n8n-api'

export default function ConnectionError({ onRetry }: { onRetry: () => void }) {
  const { testConnection } = useN8nApi()
  const credentials = n8nApi.getCredentials()

  const handleRetry = async () => {
    const success = await testConnection()
    if (success) {
      onRetry()
    }
  }

  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertCircle className="h-5 w-5" />
          Connection Error
        </CardTitle>
        <CardDescription>
          Unable to connect to your n8n instance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            We couldn't establish a connection to your n8n instance. Please check the following:
          </p>
          
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Verify your n8n URL is correct: <span className="font-mono">{credentials.url || 'Not set'}</span></li>
            <li>Ensure your API key is valid</li>
            <li>Check that your n8n instance is running and accessible</li>
            <li>Verify network connectivity</li>
          </ul>
          
          <div className="flex gap-2 pt-4">
            <Button onClick={handleRetry}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry Connection
            </Button>
            <Button variant="outline" onClick={() => {
              // Navigate to settings page
              window.location.href = '/dashboard/settings'
            }}>
              Update Credentials
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}