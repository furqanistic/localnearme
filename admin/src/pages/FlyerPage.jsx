import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, Clock, Mail, Users } from 'lucide-react'
import React from 'react'
import Header from '../components/common/Header'
import DigitalFlyerForm from '../components/sales/DigitalFlyerForm'

const FlyerPage = () => {
  const metrics = [
    {
      title: 'Monthly Limit',
      value: '0',
      icon: Mail,
      description: 'Flyers sent this month',
      color: 'bg-blue-500',
    },
    {
      title: 'Active Subscribers',
      value: '0',
      icon: Users,
      description: '+12% this month',
      color: 'bg-purple-500',
    },
    {
      title: 'Average Response',
      value: '0',
      icon: Clock,
      description: 'Response time',
      color: 'bg-emerald-500',
    },
  ]

  const recentFlyers = [
    {
      id: 1,
      title: 'Spring Collection Launch',
      date: 'Mar 15, 2024',
      status: 'sent',
    },
    {
      id: 2,
      title: 'Easter Special Promotion',
      date: 'Mar 20, 2024',
      status: 'scheduled',
    },
    {
      id: 3,
      title: 'New Arrivals Announcement',
      date: 'Mar 10, 2024',
      status: 'sent',
    },
  ]

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Digital Flyers' />

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8 space-y-6'>
        {/* Metrics */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className='bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4'
            >
              <div className='flex items-center space-x-4'>
                <div className={`${metric.color} bg-opacity-10 p-3 rounded-lg`}>
                  <metric.icon
                    className={`w-5 h-5 ${metric.color.replace(
                      'bg-',
                      'text-'
                    )}`}
                  />
                </div>
                <div>
                  <h3 className='text-gray-400 text-sm'>{metric.title}</h3>
                  <p className='text-xl font-semibold text-white mt-1'>
                    {metric.value}
                  </p>
                  <p className='text-sm text-gray-400 mt-0.5'>
                    {metric.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Flyer Form */}
        <div className='w-full'>
          <DigitalFlyerForm userType='free' flyersSentThisMonth={30} />
        </div>

        {/* Recent Flyers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className='bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden'
        >
          <div className='p-4 border-b border-gray-700/50'>
            <div className='flex items-center justify-between'>
              <h2 className='text-lg font-medium text-white'>Recent Flyers</h2>
              <button className='text-blue-400 hover:text-blue-300 transition-colors text-sm flex items-center'>
                View All <ArrowRight className='w-4 h-4 ml-1' />
              </button>
            </div>
          </div>

          <div className='divide-y divide-gray-700/50'>
            {recentFlyers.map((flyer) => (
              <div
                key={flyer.id}
                className='p-4 hover:bg-gray-700/30 transition-colors flex items-center justify-between group'
              >
                <div className='flex-1'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <h3 className='text-white font-medium'>{flyer.title}</h3>
                      <p className='text-sm text-gray-400 mt-1'>{flyer.date}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        flyer.status === 'sent'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-blue-500/10 text-blue-400'
                      }`}
                    >
                      {flyer.status === 'sent' ? 'Sent' : 'Scheduled'}
                    </span>
                  </div>
                </div>
                <ChevronRight className='w-5 h-5 text-gray-500 group-hover:text-gray-300 transition-colors ml-4' />
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default FlyerPage
