// config/n8n.ts
export const N8N_CONFIG = {
  // Default API version
  API_VERSION: 'v1',
  
  // Default endpoints
  ENDPOINTS: {
    WORKFLOWS: '/workflows',
    EXECUTIONS: '/executions',
    USERS: '/users',
    PROJECTS: '/projects'
  },
  
  // Default timeout for API requests (in milliseconds)
  TIMEOUT: 10000,
  
  // Default pagination settings
  PAGINATION: {
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100
  }
}