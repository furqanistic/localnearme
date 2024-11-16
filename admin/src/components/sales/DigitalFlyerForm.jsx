import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import {
  AlertCircle,
  Check,
  ChevronsUpDown,
  FilePlus,
  NotepadTextDashed,
  Pencil,
  Save,
  Send,
  Trash2,
  Upload,
  X,
} from 'lucide-react'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { axiosInstance } from '../../config.js'

const fetchBusinesses = async (userId) => {
  const response = await axiosInstance.get(
    `/business/user/${userId}/business-names`
  )
  return response.data
}

const fetchSubscriberCount = async (businessId) => {
  const response = await axiosInstance.get(
    `/subscriptions/businesses/${businessId}/subscribers`
  )
  return response.data.results
}

// Template management component
const TemplateManager = ({ onSelectTemplate, selectedTemplate }) => {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: `Monthly Newsletter`,
      subject: `{businessName} - Monthly Updates for {month}`,
      content: `Dear {subscriberName},\n\nWe hope this newsletter finds you well! Here's what's happening at {businessName} this month.\n\n{custom_message}\n\nMonthly Highlights:\n• Latest Updates & News\n• Upcoming Events\n• Community Spotlights\n\nStay connected with us:\n• Website: {businessName}.com\n• Follow us on social media for daily updates\n\nWarm regards,\nTeam {businessName}`,
    },
    {
      id: 2,
      name: `Product Launch`,
      subject: `Introducing Our Latest Product at {businessName}`,
      content: `Dear {subscriberName},\n\nExciting news! We're thrilled to announce our latest product launch at {businessName}.\n\n{custom_message}\n\nKey Features:\n• Innovative Technology\n• User-Friendly Design\n• Premium Quality\n\nBe among the first to experience it!\n\nVisit our website or store to learn more.\n\nBest regards,\nTeam {businessName}`,
    },
    {
      id: 3,
      name: `Event Announcement`,
      subject: `You're Invited! Special Event at {businessName}`,
      content: `Dear {subscriberName},\n\nMark your calendars! {businessName} is hosting a special event.\n\n{custom_message}\n\nEvent Details:\n• Date & Time: [Insert Details]\n• Location: [Insert Location]\n• What to Expect: [Insert Activities]\n\nRSVP Required\nLimited spots available!\n\nLooking forward to seeing you,\nTeam {businessName}`,
    },
    {
      id: 4,
      name: `Special Offer`,
      subject: `Exclusive Offer for {businessName} Subscribers`,
      content: `Dear {subscriberName},\n\nAs a valued customer of {businessName}, we're excited to bring you this exclusive offer!\n\n{custom_message}\n\nOffer Details:\n• Special Discount\n• Limited Time Only\n• Exclusive to Newsletter Subscribers\n\nDon't miss out on this amazing opportunity!\n\nBest regards,\nTeam {businessName}`,
    },
    {
      id: 5,
      name: `Company Update`,
      subject: `Important Updates from {businessName}`,
      content: `Dear {subscriberName},\n\nWe're reaching out to share some important updates about {businessName}.\n\n{custom_message}\n\nKey Updates:\n• Company News\n• Recent Achievements\n• Future Plans\n\nThank you for being part of our journey.\n\nBest regards,\nTeam {businessName}`,
    },
    {
      id: 6,
      name: `Holiday Special`,
      subject: `Season's Greetings from {businessName}`,
      content: `Dear {subscriberName},\n\nThe holiday season is here, and we at {businessName} want to celebrate with you!\n\n{custom_message}\n\nHoliday Specials:\n• Seasonal Offers\n• Special Events\n• Holiday Hours\n\nWishing you and your loved ones a wonderful holiday season!\n\nWarm wishes,\nTeam {businessName}`,
    },
    {
      id: 7,
      name: `Customer Appreciation`,
      subject: `Thank You from {businessName}`,
      content: `Dear {subscriberName},\n\nWe want to take a moment to express our gratitude for your continued support of {businessName}.\n\n{custom_message}\n\nAs a token of appreciation:\n• Special Member Benefits\n• Exclusive Access\n• Priority Service\n\nThank you for choosing us!\n\nWith gratitude,\nTeam {businessName}`,
    },
    {
      id: 8,
      name: `Welcome Message`,
      subject: `Welcome to {businessName}!`,
      content: `Dear {subscriberName},\n\nWelcome to the {businessName} family! We're delighted to have you join our community.\n\n{custom_message}\n\nWhat to Expect:\n• Regular Updates\n• Exclusive Offers\n• Community Events\n\nStay connected with us on social media!\n\nBest regards,\nTeam {businessName}`,
    },
    {
      id: 9,
      name: `Business Tips`,
      subject: `{businessName} - Business Tips Newsletter`,
      content: `Dear {subscriberName},\n\nWelcome to this month's business insights from {businessName}.\n\n{custom_message}\n\nThis Month's Topics:\n• Industry Trends\n• Best Practices\n• Success Stories\n\nStay tuned for more valuable insights!\n\nBest regards,\nTeam {businessName}`,
    },
    {
      id: 10,
      name: `Feedback Request`,
      subject: `Your Opinion Matters to {businessName}`,
      content: `Dear {subscriberName},\n\nAt {businessName}, we value your feedback and are committed to providing the best experience possible.\n\n{custom_message}\n\nWe'd Love to Hear About:\n• Your Recent Experience\n• Areas for Improvement\n• Suggestions\n\nThank you for helping us serve you better!\n\nBest regards,\nTeam {businessName}`,
    },
    {
      id: 11,
      name: `New Service Announcement`,
      subject: `New Services Available at {businessName}`,
      content: `Dear {subscriberName},\n\nWe're excited to announce new services at {businessName}!\n\n{custom_message}\n\nNew Services Include:\n• [Service 1]\n• [Service 2]\n• [Service 3]\n\nBook now to experience our new offerings!\n\nBest regards,\nTeam {businessName}`,
    },
    {
      id: 12,
      name: `Weekly Update`,
      subject: `{businessName} - Your Weekly Update`,
      content: `Dear {subscriberName},\n\nHere's your weekly update from {businessName}.\n\n{custom_message}\n\nThis Week's Highlights:\n• Latest News\n• Special Offers\n• Upcoming Events\n\nStay tuned for more updates!\n\nBest regards,\nTeam {businessName}`,
    },
    {
      id: 13,
      name: `Important Notice`,
      subject: `Important Notice from {businessName}`,
      content: `Dear {subscriberName},\n\nWe have an important announcement from {businessName}.\n\n{custom_message}\n\nKey Points:\n• [Important Point 1]\n• [Important Point 2]\n• [Important Point 3]\n\nThank you for your attention to this matter.\n\nBest regards,\nTeam {businessName}`,
    },
    {
      id: 14,
      name: `Anniversary Special`,
      subject: `Celebrating Our Anniversary at {businessName}`,
      content: `Dear {subscriberName},\n\nWe're celebrating another amazing year at {businessName}, and you're part of our success!\n\n{custom_message}\n\nAnniversary Specials:\n• Special Offers\n• Celebration Events\n• Customer Rewards\n\nJoin us in the celebration!\n\nCheers,\nTeam {businessName}`,
    },
    {
      id: 15,
      name: `Survey Request`,
      subject: `Quick Survey from {businessName}`,
      content: `Dear {subscriberName},\n\nWe at {businessName} value your opinion and would love to hear from you.\n\n{custom_message}\n\nThe Survey:\n• Takes only 5 minutes\n• Helps us improve\n• Your feedback matters\n\nThank you for your time and input!\n\nBest regards,\nTeam {businessName}`,
    },
  ])

  const [newTemplate, setNewTemplate] = useState({
    name: '',
    subject: '',
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
      setNewTemplate({ name: '', subject: '', content: '' })
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
                    Subject Line Template
                  </label>
                  <input
                    type='text'
                    value={
                      editingTemplate
                        ? editingTemplate.subject
                        : newTemplate.subject
                    }
                    onChange={(e) =>
                      editingTemplate
                        ? setEditingTemplate({
                            ...editingTemplate,
                            subject: e.target.value,
                          })
                        : setNewTemplate({
                            ...newTemplate,
                            subject: e.target.value,
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
                  Available variables: {'{recipient}'}, {'{position}'},{' '}
                  {'{company}'}, {'{field}'}, {'{custom_message}'},{' '}
                  {'{sender_name}'}
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
              <div className='text-sm text-gray-400 mb-2'>
                Subject: {template.subject}
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

const DigitalFlyerForm = () => {
  const { currentUser } = useSelector((state) => state.user)
  const activeUser = currentUser.data.user
  const [open, setOpen] = useState(false)
  const [selectedBusiness, setSelectedBusiness] = useState(null)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [variables, setVariables] = useState({
    product_name: '',
    custom_message: '',
    month: new Date().toLocaleString('default', { month: 'long' }),
  })
  const [attachments, setAttachments] = useState([])
  const [sending, setSending] = useState(false)
  const [sendProgress, setSendProgress] = useState(0)
  const [result, setResult] = useState(null)

  const { data: businessesData, isLoading: isLoadingBusinesses } = useQuery(
    ['businesses', activeUser._id],
    () => fetchBusinesses(activeUser._id),
    {
      enabled: !!activeUser._id,
    }
  )

  const { data: subscriberCount = 0 } = useQuery(
    ['subscriberCount', selectedBusiness?.value],
    () => fetchSubscriberCount(selectedBusiness.value),
    {
      enabled: !!selectedBusiness?.value,
    }
  )

  const handleVariableChange = (name, value) => {
    setVariables((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setAttachments((prev) => [...prev, ...files])
  }

  const removeFile = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  const processTemplate = () => {
    if (!selectedTemplate) return { subject: '', content: '' }

    let processedSubject = selectedTemplate.subject
    let processedContent = selectedTemplate.content

    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{${key}}`, 'g') // Changed from {{key}} to {key}
      processedSubject = processedSubject.replace(regex, value || `[${key}]`)
      processedContent = processedContent.replace(regex, value || `[${key}]`)
    })

    return { subject: processedSubject, content: processedContent }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedBusiness || !selectedTemplate) {
      setResult({
        type: 'error',
        message: 'Please select a business and template first',
      })
      return
    }

    setSending(true)
    setResult(null)
    setSendProgress(0)

    const { subject, content } = processTemplate()
    const newsletterData = new FormData()
    newsletterData.append('subject', subject)
    newsletterData.append('message', content)
    attachments.forEach((file) => {
      newsletterData.append('attachments', file)
    })

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setSendProgress((prev) => Math.min(prev + 10, 90))
      }, 300)

      const response = await axiosInstance.post(
        `/newsletter/businesses/${selectedBusiness.value}/newsletters`,
        newsletterData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      clearInterval(progressInterval)
      setSendProgress(100)

      setTimeout(() => {
        setResult({
          type: 'success',
          message: `Cover letters sent successfully to ${response.data.recipientCount} subscribers!`,
        })
        setVariables({
          recipient: '',
          position: '',
          company: '',
          field: '',
          custom_message: '',
          sender_name: '',
        })
        setAttachments([])
        setSendProgress(0)
      }, 500)
    } catch (error) {
      setResult({
        type: 'error',
        message:
          error.response?.data?.message || 'Failed to send cover letters',
      })
    } finally {
      setSending(false)
    }
  }

  const businesses = businessesData?.data || []

  return (
    <div className='space-y-6'>
      <Tabs defaultValue='compose' className='w-full'>
        <TabsList className='bg-gray-800 border-gray-700'>
          <TabsTrigger
            value='compose'
            className='text-white data-[state=active]:bg-blue-600'
          >
            Compose
          </TabsTrigger>
          <TabsTrigger
            value='templates'
            className='text-white data-[state=active]:bg-blue-600'
          >
            Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value='templates'>
          <TemplateManager
            onSelectTemplate={setSelectedTemplate}
            selectedTemplate={selectedTemplate}
          />
        </TabsContent>

        <TabsContent value='compose'>
          <Card className='bg-[#1b2431] border-gray-700'>
            <CardHeader>
              <CardTitle className='text-2xl font-semibold text-white'>
                Send Cover Letters
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      role='combobox'
                      aria-expanded={open}
                      className='w-full justify-between bg-gray-800 text-white border-gray-700 hover:bg-gray-700 hover:text-white'
                    >
                      {selectedBusiness
                        ? selectedBusiness.label
                        : 'Select business...'}
                      <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-full p-0 bg-gray-800 border-gray-700'>
                    <Command className='bg-gray-800'>
                      <CommandInput
                        placeholder='Search business...'
                        className='text-white'
                      />
                      <CommandList>
                        {isLoadingBusinesses ? (
                          <div className='py-6 text-center text-sm text-gray-400'>
                            Loading businesses...
                          </div>
                        ) : businesses.length === 0 ? (
                          <div className='py-6 text-center text-sm text-gray-400'>
                            No businesses found
                          </div>
                        ) : (
                          <>
                            <CommandEmpty className='text-gray-400 py-6 text-center'>
                              No business found.
                            </CommandEmpty>
                            <CommandGroup>
                              {businesses.map((business) => (
                                <CommandItem
                                  key={business.value}
                                  value={business.value}
                                  onSelect={() => {
                                    setSelectedBusiness(business)
                                    setOpen(false)
                                  }}
                                  className='text-white hover:bg-gray-700'
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      selectedBusiness?.value === business.value
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )}
                                  />
                                  {business.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </>
                        )}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {selectedBusiness && (
                <div className='bg-gray-800/50 border border-gray-700 rounded-lg p-4'>
                  <div className='flex items-start'>
                    <AlertCircle className='h-5 w-5 text-blue-400 mt-0.5 mr-2' />
                    <div>
                      <h3 className='text-sm font-medium text-blue-400'>
                        Subscriber Information
                      </h3>
                      <p className='mt-1 text-sm text-gray-300'>
                        Your cover letter will be sent to {subscriberCount}{' '}
                        active subscribers.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedTemplate ? (
                <div className='space-y-4'>
                  <div className='flex items-center justify-between bg-blue-900/20 border border-blue-500 rounded-lg p-4'>
                    <div className='flex items-center'>
                      <NotepadTextDashed className='w-5 h-5 text-blue-400 mr-2' />
                      <span className='text-blue-400 font-medium'>
                        Using template: {selectedTemplate.name}
                      </span>
                    </div>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => setSelectedTemplate(null)}
                      className='text-gray-400 hover:text-white'
                    >
                      <X className='w-4 h-4' />
                    </Button>
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-300 mb-1'>
                        Recipient Name
                      </label>
                      <input
                        type='text'
                        value={variables.recipient}
                        onChange={(e) =>
                          handleVariableChange('recipient', e.target.value)
                        }
                        className='w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-blue-500 focus:border-blue-500'
                        placeholder='e.g., Valued Customer'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-300 mb-1'>
                        Company Name
                      </label>
                      <input
                        type='text'
                        value={variables.company}
                        onChange={(e) =>
                          handleVariableChange('company', e.target.value)
                        }
                        className='w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-blue-500 focus:border-blue-500'
                        placeholder='Your company name'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-300 mb-1'>
                        Month/Date
                      </label>
                      <input
                        type='text'
                        value={variables.month}
                        onChange={(e) =>
                          handleVariableChange('month', e.target.value)
                        }
                        className='w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-blue-500 focus:border-blue-500'
                        placeholder='e.g., January 2024'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-300 mb-1'>
                        Field/Industry
                      </label>
                      <input
                        type='text'
                        value={variables.field}
                        onChange={(e) =>
                          handleVariableChange('field', e.target.value)
                        }
                        className='w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-blue-500 focus:border-blue-500'
                        placeholder='e.g., Technology'
                      />
                    </div>
                    {/* Add conditional fields based on selected template */}
                    {selectedTemplate?.name.includes('Product') && (
                      <div>
                        <label className='block text-sm font-medium text-gray-300 mb-1'>
                          Product Name
                        </label>
                        <input
                          type='text'
                          value={variables.product_name}
                          onChange={(e) =>
                            handleVariableChange('product_name', e.target.value)
                          }
                          className='w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-blue-500 focus:border-blue-500'
                          placeholder='Name of your product'
                        />
                      </div>
                    )}
                    {selectedTemplate?.name.includes('Event') && (
                      <>
                        <div>
                          <label className='block text-sm font-medium text-gray-300 mb-1'>
                            Event Name
                          </label>
                          <input
                            type='text'
                            value={variables.event_name}
                            onChange={(e) =>
                              handleVariableChange('event_name', e.target.value)
                            }
                            className='w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-blue-500 focus:border-blue-500'
                            placeholder='Name of your event'
                          />
                        </div>
                        <div>
                          <label className='block text-sm font-medium text-gray-300 mb-1'>
                            Event Date
                          </label>
                          <input
                            type='text'
                            value={variables.event_date}
                            onChange={(e) =>
                              handleVariableChange('event_date', e.target.value)
                            }
                            className='w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-blue-500 focus:border-blue-500'
                            placeholder='Date of your event'
                          />
                        </div>
                        <div>
                          <label className='block text-sm font-medium text-gray-300 mb-1'>
                            Event Time
                          </label>
                          <input
                            type='text'
                            value={variables.event_time}
                            onChange={(e) =>
                              handleVariableChange('event_time', e.target.value)
                            }
                            className='w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-blue-500 focus:border-blue-500'
                            placeholder='Time of your event'
                          />
                        </div>
                        <div>
                          <label className='block text-sm font-medium text-gray-300 mb-1'>
                            Event Location
                          </label>
                          <input
                            type='text'
                            value={variables.event_location}
                            onChange={(e) =>
                              handleVariableChange(
                                'event_location',
                                e.target.value
                              )
                            }
                            className='w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-blue-500 focus:border-blue-500'
                            placeholder='Location of your event'
                          />
                        </div>
                      </>
                    )}
                    {selectedTemplate?.name.includes('Offer') && (
                      <>
                        <div>
                          <label className='block text-sm font-medium text-gray-300 mb-1'>
                            Offer Duration
                          </label>
                          <input
                            type='text'
                            value={variables.offer_duration}
                            onChange={(e) =>
                              handleVariableChange(
                                'offer_duration',
                                e.target.value
                              )
                            }
                            className='w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-blue-500 focus:border-blue-500'
                            placeholder='e.g., Limited time only'
                          />
                        </div>
                        <div>
                          <label className='block text-sm font-medium text-gray-300 mb-1'>
                            Discount
                          </label>
                          <input
                            type='text'
                            value={variables.discount}
                            onChange={(e) =>
                              handleVariableChange('discount', e.target.value)
                            }
                            className='w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-blue-500 focus:border-blue-500'
                            placeholder='e.g., 20% off'
                          />
                        </div>
                        <div>
                          <label className='block text-sm font-medium text-gray-300 mb-1'>
                            Promo Code
                          </label>
                          <input
                            type='text'
                            value={variables.promo_code}
                            onChange={(e) =>
                              handleVariableChange('promo_code', e.target.value)
                            }
                            className='w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-blue-500 focus:border-blue-500'
                            placeholder='e.g., SPECIAL20'
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-300 mb-1'>
                      Custom Message
                    </label>
                    <textarea
                      value={variables.custom_message}
                      onChange={(e) =>
                        handleVariableChange('custom_message', e.target.value)
                      }
                      rows='4'
                      className='w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-blue-500 focus:border-blue-500'
                      placeholder='Add your personalized message here...'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-300 mb-1'>
                      Your Name
                    </label>
                    <input
                      type='text'
                      value={variables.sender_name}
                      onChange={(e) =>
                        handleVariableChange('sender_name', e.target.value)
                      }
                      className='w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-blue-500 focus:border-blue-500'
                      placeholder='Your full name'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-300 mb-2'>
                      Attachments
                    </label>
                    <div className='space-y-2'>
                      <div className='flex items-center space-x-2'>
                        <Button
                          type='button'
                          variant='secondary'
                          className='bg-blue-600 hover:bg-blue-700 text-white'
                          onClick={() =>
                            document.getElementById('file-upload').click()
                          }
                        >
                          <Upload className='w-4 h-4 mr-2' />
                          Add Files
                        </Button>
                        <input
                          id='file-upload'
                          type='file'
                          onChange={handleFileChange}
                          className='hidden'
                          multiple
                          accept='.pdf,.doc,.docx,.txt'
                        />
                      </div>

                      {attachments.length > 0 && (
                        <div className='space-y-2'>
                          {attachments.map((file, index) => (
                            <div
                              key={index}
                              className='flex items-center justify-between bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2'
                            >
                              <span className='text-sm text-gray-300 truncate'>
                                {file.name}
                              </span>
                              <Button
                                type='button'
                                variant='ghost'
                                size='sm'
                                onClick={() => removeFile(index)}
                                className='text-gray-400 hover:text-white'
                              >
                                <X className='h-4 w-4' />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-300 mb-1'>
                      Preview
                    </label>
                    <div>
                      <label className='block text-sm font-medium text-gray-300 mb-1'>
                        Preview (Subscriber details will be automatically
                        filled)
                      </label>
                      <div className='bg-gray-800/50 border border-gray-700 rounded-md p-4 whitespace-pre-wrap text-gray-300'>
                        {processTemplate().content}
                      </div>
                    </div>
                  </div>

                  {sending && (
                    <div className='space-y-2'>
                      <Progress value={sendProgress} className='h-2' />
                      <p className='text-sm text-gray-400 text-center'>
                        Sending cover letters... {sendProgress}%
                      </p>
                    </div>
                  )}

                  <Button
                    onClick={handleSubmit}
                    disabled={sending}
                    className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-50'
                  >
                    {sending ? (
                      <div className='flex items-center space-x-2'>
                        <div className='animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent' />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <>
                        <Send className='w-4 h-4 mr-2' />
                        Send Cover Letters
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className='text-center py-12 text-gray-400'>
                  <NotepadTextDashed className='w-12 h-12 mx-auto mb-4 opacity-50' />
                  <p>Select a template from the Templates tab to get started</p>
                </div>
              )}

              {result && (
                <div
                  className={cn(
                    'p-3 rounded-md',
                    result.type === 'success'
                      ? 'bg-green-900/50 text-green-400 border border-green-900'
                      : 'bg-red-900/50 text-red-400 border border-red-900'
                  )}
                >
                  {result.message}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default DigitalFlyerForm
