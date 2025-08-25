// lib/mock-data.ts
import { N8nWorkflow, N8nExecution } from './n8n-api'

// Mock workflows data
export const mockWorkflows: N8nWorkflow[] = [
  {
    id: 'wf-1',
    name: 'Customer Onboarding',
    active: true,
    createdAt: '2024-01-10T09:30:00Z',
    updatedAt: '2024-01-15T14:30:00Z',
    nodes: 8,
    connections: 12
  },
  {
    id: 'wf-2',
    name: 'Data Sync Pipeline',
    active: true,
    createdAt: '2024-01-08T14:15:00Z',
    updatedAt: '2024-01-15T10:15:00Z',
    nodes: 12,
    connections: 18
  },
  {
    id: 'wf-3',
    name: 'Email Campaign Automation',
    active: false,
    createdAt: '2024-01-05T11:45:00Z',
    updatedAt: '2024-01-14T16:45:00Z',
    nodes: 6,
    connections: 8
  },
  {
    id: 'wf-4',
    name: 'Slack Notifications',
    active: true,
    createdAt: '2024-01-03T16:20:00Z',
    updatedAt: '2024-01-14T09:30:00Z',
    nodes: 4,
    connections: 5
  },
  {
    id: 'wf-5',
    name: 'Database Backup',
    active: true,
    createdAt: '2024-01-01T08:00:00Z',
    updatedAt: '2024-01-13T11:20:00Z',
    nodes: 5,
    connections: 6
  }
]

// Mock executions data
export const mockExecutions: N8nExecution[] = [
  {
    id: 'exec-1',
    workflowId: 'wf-1',
    status: 'success',
    startedAt: '2024-01-15T14:30:00Z',
    finishedAt: '2024-01-15T14:30:05Z',
    mode: 'trigger'
  },
  {
    id: 'exec-2',
    workflowId: 'wf-2',
    status: 'success',
    startedAt: '2024-01-15T14:25:00Z',
    finishedAt: '2024-01-15T14:25:12Z',
    mode: 'trigger'
  },
  {
    id: 'exec-3',
    workflowId: 'wf-4',
    status: 'error',
    startedAt: '2024-01-15T14:20:00Z',
    finishedAt: '2024-01-15T14:20:03Z',
    mode: 'trigger'
  },
  {
    id: 'exec-4',
    workflowId: 'wf-5',
    status: 'success',
    startedAt: '2024-01-15T14:00:00Z',
    finishedAt: '2024-01-15T14:00:25Z',
    mode: 'trigger'
  },
  {
    id: 'exec-5',
    workflowId: 'wf-1',
    status: 'success',
    startedAt: '2024-01-15T13:45:00Z',
    finishedAt: '2024-01-15T13:45:06Z',
    mode: 'manual'
  },
  {
    id: 'exec-6',
    workflowId: 'wf-3',
    status: 'waiting',
    startedAt: '2024-01-15T13:30:00Z',
    mode: 'manual'
  }
]
