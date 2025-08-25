'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Play, 
  Square, 
  RotateCcw, 
  Settings,
  Zap,
  CheckSquare,
  Square as SquareIcon,
  Circle,
  Minus,
  Plus,
  Type,
  Calendar,
  Hash
} from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

// Mock workflow data
const mockWorkflows = [
  { id: 'wf-1', name: 'Customer Onboarding', status: 'active' },
  { id: 'wf-2', name: 'Data Sync Pipeline', status: 'active' },
  { id: 'wf-3', name: 'Email Campaign', status: 'paused' }
]

export default function InteractiveControls() {
  const [workflows, setWorkflows] = useState(mockWorkflows)
  const [switchStates, setSwitchStates] = useState<Record<string, boolean>>({})
  const [sliderValues, setSliderValues] = useState<Record<string, number>>({})
  const [inputValues, setInputValues] = useState<Record<string, string>>({})
  const [checkboxStates, setCheckboxStates] = useState<Record<string, boolean>>({})

  const toggleWorkflow = (id: string) => {
    setWorkflows(workflows.map(wf => 
      wf.id === id 
        ? { ...wf, status: wf.status === 'active' ? 'paused' : 'active' } 
        : wf
    ))
  }

  const handleSwitchChange = (id: string, checked: boolean) => {
    setSwitchStates({ ...switchStates, [id]: checked })
  }

  const handleSliderChange = (id: string, value: number[]) => {
    setSliderValues({ ...sliderValues, [id]: value[0] })
  }

  const handleInputChange = (id: string, value: string) => {
    setInputValues({ ...inputValues, [id]: value })
  }

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setCheckboxStates({ ...checkboxStates, [id]: checked })
  }

  const controls = [
    {
      id: 'control-1',
      name: 'Workflow Toggle',
      type: 'switch',
      icon: Zap,
      description: 'Toggle workflows on/off'
    },
    {
      id: 'control-2',
      name: 'Progress Slider',
      type: 'slider',
      icon: Minus,
      description: 'Adjust workflow parameters'
    },
    {
      id: 'control-3',
      name: 'Text Input',
      type: 'input',
      icon: Type,
      description: 'Enter custom values'
    },
    {
      id: 'control-4',
      name: 'Checkbox',
      type: 'checkbox',
      icon: CheckSquare,
      description: 'Select options'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Interactive Controls</h3>
        <p className="text-sm text-muted-foreground">
          Embed interactive elements directly in your documents to trigger workflows
        </p>
      </div>

      {/* Workflow Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">Workflow Controls</h4>
            <Badge variant="secondary">3 Active</Badge>
          </div>
          <div className="space-y-3">
            {workflows.map((workflow) => (
              <div key={workflow.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                <div className="flex items-center gap-3">
                  {workflow.status === 'active' ? (
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  ) : (
                    <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  )}
                  <span className="font-medium">{workflow.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => toggleWorkflow(workflow.id)}
                  >
                    {workflow.status === 'active' ? (
                      <>
                        <Square className="h-4 w-4 mr-1" />
                        Stop
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-1" />
                        Start
                      </>
                    )}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Control Library */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {controls.map((control) => {
          const Icon = control.icon
          return (
            <Card key={control.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{control.name}</div>
                    <div className="text-xs text-muted-foreground">{control.description}</div>
                  </div>
                </div>
                
                {/* Control Preview */}
                <div className="mt-3">
                  {control.type === 'switch' && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Enable feature</span>
                      <Switch 
                        checked={switchStates[control.id] || false}
                        onCheckedChange={(checked) => handleSwitchChange(control.id, checked)}
                      />
                    </div>
                  )}
                  
                  {control.type === 'slider' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Value: {sliderValues[control.id] || 50}</span>
                        <span className="text-xs text-muted-foreground">0-100</span>
                      </div>
                      <Slider
                        value={[sliderValues[control.id] || 50]}
                        onValueChange={(value) => handleSliderChange(control.id, value)}
                        max={100}
                        step={1}
                      />
                    </div>
                  )}
                  
                  {control.type === 'input' && (
                    <Input
                      value={inputValues[control.id] || ''}
                      onChange={(e) => handleInputChange(control.id, e.target.value)}
                      placeholder="Enter value..."
                      className="text-sm"
                    />
                  )}
                  
                  {control.type === 'checkbox' && (
                    <div className="flex items-center gap-2">
                      <div 
                        className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer ${
                          checkboxStates[control.id] 
                            ? 'bg-primary border-primary' 
                            : 'border-muted-foreground'
                        }`}
                        onClick={() => handleCheckboxChange(control.id, !checkboxStates[control.id])}
                      >
                        {checkboxStates[control.id] && (
                          <CheckSquare className="h-4 w-4 text-primary-foreground" />
                        )}
                      </div>
                      <span className="text-sm">Accept terms and conditions</span>
                    </div>
                  )}
                </div>
                
                <Button variant="outline" size="sm" className="w-full mt-3">
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Document
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm">
          <Play className="h-4 w-4 mr-2" />
          Run Workflow
        </Button>
        <Button variant="outline" size="sm">
          <SquareIcon className="h-4 w-4 mr-2" />
          Stop Workflow
        </Button>
        <Button variant="outline" size="sm">
          <RotateCcw className="h-4 w-4 mr-2" />
          Restart
        </Button>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Configure
        </Button>
      </div>
    </div>
  )
}