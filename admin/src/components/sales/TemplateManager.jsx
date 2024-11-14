import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import {
  AlertCircle,
  Check,
  ChevronsUpDown,
  FilePlus,
  Pencil,
  Save,
  Send,
  Template,
  Trash2,
  Upload,
  X,
} from 'lucide-react'
import React, { useState } from 'react'

// Template management component
const TemplateManager = ({ onSelectTemplate, selectedTemplate }) => {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Professional Cover Letter',
      content: `Dear {{recipient}},

I am writing to express my interest in {{position}} at {{company}}. With my background in {{field}}, I believe I would be a valuable addition to your team.

{{custom_message}}

Thank you for considering my application.

Best regards,
{{sender_name}}`,
    },
    {
      id: 2,
      name: 'Creative Cover Letter',
      content: `Hi {{recipient}}!

I'm excited about the opportunity to join {{company}} as a {{position}}. 

{{custom_message}}

I'm looking forward to discussing how my {{field}} experience aligns with your needs.

Best,
{{sender_name}}`,
    },
  ])

  const [newTemplate, setNewTemplate] = useState({
    name: '',
    content: '',
  })

  const [editingTemplate, setEditingTemplate] = useState(null)

  const handleSaveTemplate = () => {
    if (editingTemplate) {
      setTemplates(
        templates.map((t) =>
          t.id === editingTemplate.id ? editingTemplate : t
        )
      )
      setEditingTemplate(null)
    } else {
      setTemplates([
        ...templates,
        {
          id: Date.now(),
          ...newTemplate,
        },
      ])
      setNewTemplate({ name: '', content: '' })
    }
  }

  const handleDeleteTemplate = (id) => {
    setTemplates(templates.filter((t) => t.id !== id))
  }

  return (
    <Card className='bg-[#1b2431] border-gray-700'>
      <CardHeader>
        <CardTitle className='text-2xl font-semibold text-white flex items-center justify-between'>
          <span>Email Templates</span>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant='outline'
                className='bg-blue-600 hover:bg-blue-700 text-white'
              >
                <FilePlus className='w-4 h-4 mr-2' />
                New Template
              </Button>
            </DialogTrigger>
            <DialogContent className='bg-[#1b2431] text-white border-gray-700'>
              <DialogHeader>
                <DialogTitle>
                  {editingTemplate ? 'Edit Template' : 'Create New Template'}
                </DialogTitle>
                <DialogDescription className='text-gray-400'>
                  Create a new email template with custom variables.
                </DialogDescription>
              </DialogHeader>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-1'>
                    Template Name
                  </label>
                  <input
                    type='text'
                    value={
                      editingTemplate ? editingTemplate.name : newTemplate.name
                    }
                    onChange={(e) =>
                      editingTemplate
                        ? setEditingTemplate({
                            ...editingTemplate,
                            name: e.target.value,
                          })
                        : setNewTemplate({
                            ...newTemplate,
                            name: e.target.value,
                          })
                    }
                    className='w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-1'>
                    Template Content
                  </label>
                  <textarea
                    rows='10'
                    value={
                      editingTemplate
                        ? editingTemplate.content
                        : newTemplate.content
                    }
                    onChange={(e) =>
                      editingTemplate
                        ? setEditingTemplate({
                            ...editingTemplate,
                            content: e.target.value,
                          })
                        : setNewTemplate({
                            ...newTemplate,
                            content: e.target.value,
                          })
                    }
                    className='w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-blue-500 focus:border-blue-500'
                    placeholder='Use {{variable}} for dynamic content'
                  />
                </div>
                <div className='text-sm text-gray-400'>
                  Available variables: {{ recipient }}, {{ position }},{' '}
                  {{ company }}, {{ field }}, {{ custom_message }},{' '}
                  {{ sender_name }}
                </div>
                <Button
                  onClick={handleSaveTemplate}
                  className='w-full bg-blue-600 hover:bg-blue-700 text-white'
                >
                  <Save className='w-4 h-4 mr-2' />
                  Save Template
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {templates.map((template) => (
            <div
              key={template.id}
              className={cn(
                'p-4 border rounded-lg transition-colors',
                selectedTemplate?.id === template.id
                  ? 'border-blue-500 bg-blue-900/20'
                  : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
              )}
            >
              <div className='flex items-center justify-between mb-2'>
                <h3 className='text-lg font-medium text-white'>
                  {template.name}
                </h3>
                <div className='flex items-center space-x-2'>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => setEditingTemplate(template)}
                    className='text-gray-400 hover:text-white'
                  >
                    <Pencil className='w-4 h-4' />
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => handleDeleteTemplate(template.id)}
                    className='text-gray-400 hover:text-red-400'
                  >
                    <Trash2 className='w-4 h-4' />
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => onSelectTemplate(template)}
                    className='text-gray-400 hover:text-white'
                  >
                    <Check className='w-4 h-4' />
                  </Button>
                </div>
              </div>
              <pre className='text-sm text-gray-400 whitespace-pre-wrap'>
                {template.content.length > 200
                  ? template.content.slice(0, 200) + '...'
                  : template.content}
              </pre>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default TemplateManager
