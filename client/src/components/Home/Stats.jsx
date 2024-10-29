import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Gift,
  MapPin,
  Store,
  UserCheck,
  Users,
} from 'lucide-react'
import React from 'react'

const Stats = () => {
  const tabData = [
    {
      value: 'statistics',
      label: 'Statistics',
      content: <StatisticsContent />,
    },
    { value: 'services', label: 'Services', content: <ServicesContent /> },
    { value: 'faq', label: 'FAQ', content: <FAQContent /> },
  ]

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 '>
      <div className='text-center mb-12'>
        <h2 className='text-3xl font-bold text-white mb-4'>
          Platform Overview
        </h2>
        <p className='text-gray-400 max-w-2xl mx-auto'>
          Discover how we're connecting local businesses with travelers and
          residents through our innovative platform
        </p>
      </div>

      <Tabs defaultValue='statistics' className='w-full'>
        <TabsList className='grid w-full max-w-md mx-auto grid-cols-3 mb-12 bg-gray-800/50'>
          {tabData.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className='data-[state=active]:bg-blue-600 data-[state=active]:text-white'
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabData.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

const StatisticsContent = () => {
  const stats = [
    { value: '500+', label: 'Airbnb Hosts', icon: Users },
    { value: '1000+', label: 'Local Guides', icon: MapPin },
    { value: '1500+', label: 'Restaurants', icon: Store },
    { value: '300+', label: 'Contributors', icon: UserCheck },
    { value: '20+', label: 'Featured Businesses', icon: Award },
    { value: '50+', label: 'Active Promotions', icon: Gift },
  ]

  return (
    <dl className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
      {stats.map((stat, index) => (
        <div
          key={index}
          className='bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm transform hover:scale-105 transition-all duration-300'
        >
          <div className='flex items-center justify-between mb-4'>
            <stat.icon className='w-8 h-8 text-blue-500' />
            <span className='text-4xl font-bold text-white'>{stat.value}</span>
          </div>
          <dd className='text-lg font-medium text-gray-400'>{stat.label}</dd>
        </div>
      ))}
    </dl>
  )
}

const ServicesContent = () => {
  const services = [
    {
      title: 'Enhanced Travel Experience',
      description:
        'Personalized local guides and exclusive deals for Airbnb guests',
    },
    {
      title: 'Digital Marketing Solutions',
      description:
        'Advanced flyer system for restaurants to reach customers effectively',
    },
    {
      title: 'Host Benefits',
      description: 'Free advertising for one property and increased visibility',
    },
    {
      title: 'Community Integration',
      description:
        'Platform connecting tourists with local commerce through interactive features',
    },
  ]

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      {services.map((service, index) => (
        <div
          key={index}
          className='bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm group hover:bg-gray-800 transition-all duration-300'
        >
          <div className='flex items-start space-x-4'>
            <div className='bg-blue-500/10 rounded-lg p-3'>
              <CheckCircle2 className='w-6 h-6 text-blue-500' />
            </div>
            <div>
              <h3 className='text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300'>
                {service.title}
              </h3>
              <p className='text-gray-400'>{service.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const FAQContent = () => {
  const faqs = [
    {
      question: 'How does this platform benefit me as an Airbnb host?',
      answer:
        "As an Airbnb host, you can enhance your guests' experience by providing them with free access to comprehensive local guides that include recommended restaurants, attractions, and unique local insights. Additionally, you can advertise one of your properties on our platform for free, increasing your visibility and potential bookings.",
    },
    {
      question: 'What advantages do restaurants have by participating?',
      answer:
        'Restaurants can increase their exposure by being featured in our local guides, which are accessed by tourists and locals looking for dining options. Our unique digital flyer system includes a review prompt feature that encourages satisfied customers to leave positive feedback.',
    },
    {
      question: 'Can you explain how the digital flyer system works?',
      answer:
        'Our digital flyer system provides you with exclusive deals and updates from your favorite local spots. By scanning a QR code at participating businesses, you can subscribe to receive digital flyers with special promotions directly to your phone.',
    },
  ]

  return (
    <Accordion type='single' collapsible className='w-full space-y-4'>
      {faqs.map((faq, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className='bg-gray-800/50 rounded-lg border-none'
        >
          <AccordionTrigger className='px-6 py-4 hover:no-underline group'>
            <div className='flex items-center text-left'>
              <ArrowRight className='w-5 h-5 mr-3 text-blue-500 transition-transform duration-300 group-data-[state=open]:rotate-90' />
              <span className='text-white group-hover:text-blue-400 transition-colors duration-300'>
                {faq.question}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className='px-14 pb-4 text-gray-400'>
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default Stats
