'use client'

import { Toaster, toast } from 'sonner'
import React, { createContext, useContext } from 'react'

interface NotificationContextType {
  showSuccess: (message: string, title?: string) => void
  showError: (message: string, title?: string) => void
  showInfo: (message: string, title?: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const showSuccess = (message: string, title?: string) => {
    toast.success(title ? `${title}: ${message}` : message)
  }
  
  const showError = (message: string, title?: string) => {
    toast.error(title ? `${title}: ${message}` : message)
  }
  
  const showInfo = (message: string, title?: string) => {
    toast.info(title ? `${title}: ${message}` : message)
  }
  
  return (
    <NotificationContext.Provider value={{ showSuccess, showError, showInfo }}>
      {children}
      <Toaster position="top-right" richColors />
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}