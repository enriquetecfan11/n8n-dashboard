'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  Users, 
  Send, 
  Smile, 
  Paperclip,
  MoreHorizontal
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'

// Mock collaboration data
const mockCollaborators = [
  { id: 'user-1', name: 'Joaquin Martinez', avatar: 'JM', online: true },
  { id: 'user-2', name: 'Alice Johnson', avatar: 'AJ', online: true },
  { id: 'user-3', name: 'Bob Smith', avatar: 'BS', online: false },
  { id: 'user-4', name: 'Charlie Brown', avatar: 'CB', online: true }
]

const mockMessages = [
  {
    id: 'msg-1',
    user: 'Joaquin Martinez',
    avatar: 'JM',
    message: 'I\'ve updated the customer onboarding workflow. Can you review it?',
    timestamp: '10:30 AM',
    read: true
  },
  {
    id: 'msg-2',
    user: 'Alice Johnson',
    avatar: 'AJ',
    message: 'Looks good to me. I\'ll test it now.',
    timestamp: '10:32 AM',
    read: true
  },
  {
    id: 'msg-3',
    user: 'Bob Smith',
    avatar: 'BS',
    message: 'The data sync workflow is running behind schedule.',
    timestamp: '10:45 AM',
    read: false
  }
]

export default function CollaborationPanel() {
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState('')
  const [collaborators] = useState(mockCollaborators)

  const onlineCollaborators = collaborators.filter(c => c.online)

  const sendMessage = () => {
    if (!newMessage.trim()) return
    
    const message = {
      id: `msg-${Date.now()}`,
      user: 'You',
      avatar: 'YO',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    }
    
    setMessages([...messages, message])
    setNewMessage('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Collaboration Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Collaboration</h3>
            <Badge variant="secondary">{onlineCollaborators.length} online</Badge>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Share Document</DropdownMenuItem>
              <DropdownMenuItem>Manage Permissions</DropdownMenuItem>
              <DropdownMenuItem>View Activity Log</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Online Collaborators */}
        <div className="flex items-center gap-2 mt-3">
          {onlineCollaborators.map((collaborator) => (
            <div 
              key={collaborator.id} 
              className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full text-sm"
            >
              <div className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {collaborator.avatar}
              </div>
              <span>{collaborator.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex gap-3 ${message.user === 'You' ? 'flex-row-reverse' : ''}`}
          >
            <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm flex-shrink-0">
              {message.avatar}
            </div>
            <div className={`max-w-[80%] ${message.user === 'You' ? 'text-right' : ''}`}>
              <div className="text-sm font-medium">{message.user}</div>
              <div 
                className={`mt-1 p-3 rounded-lg ${
                  message.user === 'You' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}
              >
                {message.message}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {message.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="pr-20"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Smile className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button onClick={sendMessage} size="sm">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}