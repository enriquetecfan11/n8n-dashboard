import { mockWorkflows, mockExecutions } from './mock-data'

// Types
export interface N8nWorkflow {
  id: string
  name: string
  active: boolean
  createdAt: string
  updatedAt: string
  nodes: number
  connections: number
}

export interface N8nExecution {
  id: string
  workflowId: string
  status: 'success' | 'error' | 'running' | 'waiting'
  startedAt: string
  finishedAt?: string
  mode: 'manual' | 'trigger' | 'retry'
  retryOf?: string
}

export interface N8nCredentials {
  url: string | null
  apiKey: string | null
}

// API Service Class
class N8nApiService {
  private credentials: N8nCredentials = {
    url: typeof window !== 'undefined' ? localStorage.getItem('n8n-url') : null,
    apiKey: typeof window !== 'undefined' ? localStorage.getItem('n8n-key') : null
  }

  // Update credentials
  setCredentials(url: string, apiKey: string) {
    let absoluteUrl = url;
    if (!absoluteUrl.startsWith('http://') && !absoluteUrl.startsWith('https://')) {
      absoluteUrl = 'https://' + absoluteUrl;
    }
    // Clean the URL of any trailing slashes
    const cleanedUrl = absoluteUrl.replace(/\/+$/, '');
    this.credentials = { url: cleanedUrl, apiKey }
    if (typeof window !== 'undefined') {
      localStorage.setItem('n8n-url', cleanedUrl)
      localStorage.setItem('n8n-key', apiKey)
    }
  }

  // Get credentials
  getCredentials(): N8nCredentials {
    return this.credentials
  }

  // Check if connected
  isConnected(): boolean {
    return !!(this.credentials.url && this.credentials.apiKey)
  }

  // Get headers for API requests
  private getHeaders() {
    return {
      'x-n8n-api-key': this.credentials.apiKey || '',
      'x-n8n-url': this.credentials.url || ''
    }
  }

  // Workflows API
  async getWorkflows(): Promise<N8nWorkflow[]> {
    if (!this.isConnected()) {
      // Return mock data if not connected
      console.warn('Not connected to n8n, returning mock data for workflows.')
      return mockWorkflows
    }

    try {
      const response = await fetch(`/api/n8n/workflows`, {
        headers: this.getHeaders()
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch workflows: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()

      // Transform the n8n API response to our N8nWorkflow format
      return data.data.map((workflow: any) => ({
        id: workflow.id,
        name: workflow.name,
        active: workflow.active,
        createdAt: workflow.createdAt,
        updatedAt: workflow.updatedAt,
        nodes: workflow.nodes?.length || 0,
        connections: workflow.connections?.length || 0
      }))
    } catch (error) {
      console.error('Error fetching workflows:', error)
      // Return mock data on error
      console.warn('Returning mock data for workflows due to an error.')
      return mockWorkflows
    }
  }

  // Executions API
  async getExecutions(workflowId?: string): Promise<N8nExecution[]> {
    if (!this.isConnected()) {
      // Return mock data if not connected
      console.warn('Not connected to n8n, returning mock data for executions.')
      return mockExecutions
    }

    try {
      const url = workflowId
        ? `/api/n8n/executions?filter=${encodeURIComponent(JSON.stringify({ workflowId }))}`
        : `/api/n8n/executions`

      const response = await fetch(url, {
        headers: this.getHeaders()
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch executions: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()

      // Transform the n8n API response to our N8nExecution format
      return data.data.map((execution: any) => ({
        id: execution.id,
        workflowId: execution.workflowId,
        status: execution.status,
        startedAt: execution.startedAt,
        finishedAt: execution.finishedAt,
        mode: execution.mode,
        retryOf: execution.retryOf
      }))
    } catch (error) {
      console.error('Error fetching executions:', error)
      // Return mock data on error
      console.warn('Returning mock data for executions due to an error.')
      return mockExecutions
    }
  }

  // Activate a workflow
  async activateWorkflow(workflowId: string): Promise<boolean> {
    if (!this.isConnected()) {
      return false
    }

    try {
      const response = await fetch(`/api/n8n/workflows/${encodeURIComponent(workflowId)}`, {
        method: 'PATCH',
        headers: {
          ...this.getHeaders(),
          'content-type': 'application/json'
        },
        body: JSON.stringify({ active: true })
      })
      return response.ok
    } catch (error) {
      console.error('Error activating workflow:', error)
      return false
    }
  }

  // Deactivate a workflow
  async deactivateWorkflow(workflowId: string): Promise<boolean> {
    if (!this.isConnected()) {
      return false
    }

    try {
      const response = await fetch(`/api/n8n/workflows/${encodeURIComponent(workflowId)}`, {
        method: 'PATCH',
        headers: {
          ...this.getHeaders(),
          'content-type': 'application/json'
        },
        body: JSON.stringify({ active: false })
      })
      return response.ok
    } catch (error) {
      console.error('Error deactivating workflow:', error)
      return false
    }
  }

  // Execute a workflow once
  async executeWorkflow(workflowId: string): Promise<boolean> {
    if (!this.isConnected()) {
      return false
    }

    const headers = {
      ...this.getHeaders(),
      'content-type': 'application/json'
    } as Record<string, string>

    // Try preferred public API endpoint first
    try {
      const runResp = await fetch(`/api/n8n/workflows/${encodeURIComponent(workflowId)}/run`, {
        method: 'POST',
        headers,
        body: JSON.stringify({})
      })
      if (runResp.ok) return true

      // If not found or not allowed, try legacy create execution route
      if (runResp.status === 404 || runResp.status === 405) {
        const execResp = await fetch(`/api/n8n/executions`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ workflowId })
        })
        return execResp.ok
      }

      return false
    } catch (error) {
      console.error('Error executing workflow:', error)
      return false
    }
  }

  // Test connection
  async testConnection(): Promise<boolean> {
    if (!this.isConnected()) {
      return false
    }

    try {
      const response = await fetch(`/api/n8n/workflows?limit=1`, {
        headers: this.getHeaders()
      })

      return response.ok
    } catch (error) {
      console.error('Connection test failed:', error)
      return false
    }
  }
}

// Export singleton instance
export const n8nApi = new N8nApiService()
