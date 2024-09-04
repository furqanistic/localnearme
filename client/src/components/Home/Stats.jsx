import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChevronDown } from 'lucide-react'

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
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <Tabs defaultValue='statistics' className='w-full'>
        <TabsList className='grid w-full grid-cols-3'>
          {tabData.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
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

const StatisticsContent = () => (
  <dl className='grid grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8'>
    {[
      { value: '500+', label: 'Airbnb Hosts Engaged' },
      { value: '1000+', label: 'Local Guides Published' },
      { value: '1500+', label: 'Restaurants Participating' },
      { value: '300+', label: 'Active Contributors' },
      { value: '20+', label: 'Top-Rated Businesses Featured' },
      { value: '50+', label: 'Deals and Promotions Offered' },
    ].map((stat, index) => (
      <div key={index} className='flex flex-col items-center justify-center'>
        <dt className='mb-2 text-3xl font-extrabold text-deep-purple-700'>
          {stat.value}
        </dt>
        <dd className='text-sm font-medium text-deep-purple-500 text-center'>
          {stat.label}
        </dd>
      </div>
    ))}
  </dl>
)

const ServicesContent = () => (
  <div className='space-y-6'>
    <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
      How we are the best
    </h2>
    <ul className='space-y-4 text-gray-500 dark:text-gray-400'>
      {[
        'Provides Airbnb guests with personalized local guides and exclusive deals, enriching their travel experience.',
        'Features a digital flyer system that allows restaurants to directly market to potential customers and manage online reviews effectively.',
        'Offers Airbnb hosts free advertising for one property, boosting visibility and potential bookings.',
        'Engages both tourists and locals by providing a platform that merges travel with local commerce and interactive features.',
      ].map((service, index) => (
        <li key={index} className='flex items-start'>
          <ChevronDown className='w-4 h-4 mr-1.5 text-deep-purple-600 dark:text-deep-purple-500 flex-shrink-0 mt-1' />
          <span>{service}</span>
        </li>
      ))}
    </ul>
  </div>
)

const FAQContent = () => (
  <Accordion type='single' collapsible className='w-full'>
    {[
      {
        question: 'How does this platform benefit me as an Airbnb host?',
        answer:
          "As an Airbnb host, you can enhance your guests' experience by providing them with free access to comprehensive local guides that include recommended restaurants, attractions, and unique local insights. Additionally, you can advertise one of your properties on our platform for free, increasing your visibility and potential bookings. Our platform is designed to make your listing more appealing to guests by offering them added value during their stay.",
      },
      {
        question: 'What advantages do restaurants have by participating?',
        answer:
          'Restaurants can increase their exposure by being featured in our local guides, which are accessed by tourists and locals looking for dining options. Participating in our platform allows you to publish your deals and flyers, directly engaging with potential customers. Moreover, our unique digital flyer system includes a review prompt feature that encourages satisfied customers to leave positive feedback on Google, enhancing your online reputation and visibility.',
      },
      {
        question:
          'Can you explain how the digital flyer system works and how it benefits me as a customer?',
        answer:
          'Our digital flyer system provides you with exclusive deals and updates from your favorite local spots. By scanning a QR code at participating businesses, you can subscribe to receive digital flyers with special promotions directly to your phone. High ratings prompt you to leave a Google review, while less satisfactory experiences direct you to a feedback form for immediate business attention. This ensures your feedback is valued and you always have access to the latest local deals.',
      },
    ].map((faq, index) => (
      <AccordionItem key={index} value={`item-${index}`}>
        <AccordionTrigger>{faq.question}</AccordionTrigger>
        <AccordionContent>
          <p>{faq.answer}</p>
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
)

export default Stats
