// lib/n8n-api.test.ts
import { n8nApi } from './n8n-api'

// This is a simple test to verify the API functions are working
async function testN8nApi() {
  console.log('Testing n8n API connection...')
  
  // Test credentials
  const testUrl = process.env.N8N_TEST_URL || 'http://localhost:5678'
  const testApiKey = process.env.N8N_TEST_API_KEY || 'test-key'
  
  // Set test credentials
  n8nApi.setCredentials(testUrl, testApiKey)
  
  try {
    // Test connection
    const isConnected = await n8nApi.testConnection()
    console.log('Connection test:', isConnected ? 'PASSED' : 'FAILED')
    
    if (isConnected) {
      // Test getting workflows
      try {
        const workflows = await n8nApi.getWorkflows()
        console.log('Get workflows test: PASSED')
        console.log(`Found ${workflows?.length || 0} workflows`)
      } catch (error) {
        console.log('Get workflows test: FAILED')
        console.error(error)
      }
      
      // Test getting executions
      try {
        const executions = await n8nApi.getExecutions()
        console.log('Get executions test: PASSED')
        console.log(`Found ${executions?.length || 0} executions`)
      } catch (error) {
        console.log('Get executions test: FAILED')
        console.error(error)
      }
    }
  } catch (error) {
    console.log('Connection test: FAILED')
    console.error(error)
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testN8nApi()
}

export default testN8nApi