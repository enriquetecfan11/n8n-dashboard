'use client'

import { useState, useEffect } from 'react'
import { n8nApi, N8nWorkflow, N8nExecution, N8nCredentials } from '@/lib/n8n-api'
import { useNotification } from '@/components/notification-provider'

export function useN8nApi() {
  const { showSuccess, showError } = useNotification()
  const [loading, setLoading] = useState(false)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    setConnected(n8nApi.isConnected())
  }, [])

  const handleApiCall = async <T,>(apiCall: () => Promise<T>, successMessage?: string, errorMessage?: string): Promise<T | null> => {
    if (!n8nApi.isConnected()) {
      showError('Not connected to n8n. Please configure your connection in Settings.')
      return null
    }
    setLoading(true)
    try {
      const result = await apiCall()
      if (successMessage) {
        showSuccess(successMessage)
      }
      return result
    } catch (error: any) {
      const message = errorMessage || error.message || 'An unexpected error occurred'
      showError(message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const getWorkflows = (): Promise<N8nWorkflow[] | null> => handleApiCall(() => n8nApi.getWorkflows(), undefined, 'Failed to fetch workflows')
  const getExecutions = (workflowId?: string): Promise<N8nExecution[] | null> => handleApiCall(() => n8nApi.getExecutions(workflowId), undefined, 'Failed to fetch executions')
  const activateWorkflow = (workflowId: string): Promise<boolean | null> => handleApiCall(() => n8nApi.activateWorkflow(workflowId), 'Workflow activated', 'Failed to activate workflow')
  const deactivateWorkflow = (workflowId: string): Promise<boolean | null> => handleApiCall(() => n8nApi.deactivateWorkflow(workflowId), 'Workflow deactivated', 'Failed to deactivate workflow')
  const executeWorkflow = (workflowId: string): Promise<boolean | null> => handleApiCall(() => n8nApi.executeWorkflow(workflowId), 'Execution started', 'Failed to execute workflow')

  const testConnection = async (credentials?: N8nCredentials): Promise<boolean> => {
    const providedUrl = credentials?.url ?? n8nApi.getCredentials().url
    const providedKey = credentials?.apiKey ?? n8nApi.getCredentials().apiKey
    if (!providedUrl || !providedKey) {
      showError('Please enter both n8n URL and API key')
      return false
    }

    n8nApi.setCredentials(providedUrl, providedKey)

    const result = await handleApiCall(
      () => n8nApi.testConnection(),
      'Connection successful!',
      'Connection failed. Please check your credentials.'
    )

    const isConnected = result || false
    setConnected(isConnected)
    return isConnected
  }

  return {
    loading,
    connected,
    getWorkflows,
    getExecutions,
    activateWorkflow,
    deactivateWorkflow,
    executeWorkflow,
    testConnection,
    setCredentials: n8nApi.setCredentials,
    getCredentials: n8nApi.getCredentials,
    // expose boolean for components expecting isConnected flag
    isConnected: connected,
  }
}
