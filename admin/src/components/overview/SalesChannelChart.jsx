import { motion } from 'framer-motion'
import { Award, TrendingUp, Users } from 'lucide-react'
import React from 'react'

const SalesChannelChart = () => {
  const topBusinesses = [
    {
      name: "Joe's Cafe",
      category: 'Cafes',
      subscribers: 0,
      icon: '☕',
      color: '#d97706',
    },
    {
      name: 'Tech Haven',
      category: 'Electronics',
      subscribers: 0,
      icon: '💻',
      color: '#4b5563',
    },
    {
      name: 'Fresh Bites',
      category: 'Restaurants',
      subscribers: 0,
      icon: '🍽️',
      color: '#ef4444',
    },
    {
      name: 'Fitness Plus',
      category: 'Gyms',
      subscribers: 0,
      icon: '💪',
      color: '#8b5cf6',
    },
    {
      name: 'Green Market',
      category: 'Groceries',
      subscribers: 0,
      icon: '🛒',
      color: '#22c55e',
    },
  ]

  const totalSubscribers = topBusinesses.reduce(
    (sum, business) => sum + business.subscribers,
    0
  )

  return (
    <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'>
      <h2 className='text-xl font-semibold text-gray-100 mb-6'>
        Top Performing Businesses
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
        <div className='bg-gray-700 rounded-lg p-4 flex items-center'>
          <Award className='text-blue-400 mr-4' size={24} />
          <div>
            <p className='text-gray-400 text-sm'>Top Business</p>
            <p className='text-2xl font-bold text-gray-100'>
              {topBusinesses[0].name}
            </p>
          </div>
        </div>

        <div className='bg-gray-700 rounded-lg p-4 flex items-center'>
          <Users className='text-green-400 mr-4' size={24} />
          <div>
            <p className='text-gray-400 text-sm'>Total Subscribers</p>
            <p className='text-2xl font-bold text-gray-100'>
              {totalSubscribers.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className='space-y-4'>
        {topBusinesses.map((business, index) => (
          <motion.div
            key={index}
            className='bg-gray-700 bg-opacity-30 rounded-lg p-4 flex items-center justify-between hover:bg-opacity-40 transition-all'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className='flex items-center space-x-4'>
              <div
                className='w-12 h-12 rounded-full flex items-center justify-center text-2xl'
                style={{ backgroundColor: `${business.color}20` }}
              >
                {business.icon}
              </div>
              <div>
                <p className='text-gray-200 font-medium'>{business.name}</p>
                <div className='flex items-center space-x-2 mt-1'>
                  <span className='text-sm text-gray-400'>
                    {business.category}
                  </span>
                  <span className='text-gray-500'>•</span>
                  <span className='text-sm font-medium text-emerald-500'>
                    #{index + 1} Ranked
                  </span>
                </div>
              </div>
            </div>
            <div className='text-right'>
              <p className='text-lg font-semibold text-gray-200'>
                {business.subscribers.toLocaleString()}
              </p>
              <p className='text-sm text-gray-400'>subscribers</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default SalesChannelChart
