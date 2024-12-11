import { motion } from 'framer-motion'
import { Bell, MapPin } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Updates = ({ userCity = 'New York' }) => {
  const [feedItems, setFeedItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const loadFeed = async () => {
      try {
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const updates = [
          {
            id: 1,
            type: 'update',
            business: 'Acme Corp',
            content: "We've just launched our summer collection!",
            timestamp: '2024-06-15T10:00:00Z',
          },
          {
            id: 2,
            type: 'deal',
            business: 'Local Cafe',
            content: '50% off on all desserts this weekend!',
            location: 'Downtown',
            validUntil: '2024-06-18T23:59:59Z',
          },
        ]
        setFeedItems(updates)
      } catch (error) {
        console.error('Failed to fetch feed items:', error)
      } finally {
        setLoading(false)
      }
    }

    loadFeed()
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffHours < 24) {
      return `${diffHours}h ago`
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const filteredItems =
    filter === 'all'
      ? feedItems
      : feedItems.filter((item) => item.type === filter)

  return (
    <div className='bg-opacity-50  p-6 mb-8'>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-4'>
          <Bell className='w-5 h-5 text-blue-400' />
          <h2 className='text-xl font-semibold text-gray-100'>Updates</h2>
        </div>

        <div className='flex items-center gap-2 text-gray-400'>
          <MapPin className='w-4 h-4' />
          <span className='text-sm'>{userCity}</span>
        </div>
      </div>

      <div className='flex gap-2 mb-6'>
        {['all', 'update', 'deal'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize
              ${
                filter === type
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'text-gray-400 hover:bg-gray-700'
              }`}
          >
            {type}
          </button>
        ))}
      </div>

      {loading ? (
        <div className='flex justify-center py-8'>
          <div className='w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin' />
        </div>
      ) : (
        <div className='space-y-4'>
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              className='bg-gray-700 bg-opacity-30 rounded-lg p-4'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className='flex items-center justify-between mb-2'>
                <span className='font-medium text-gray-200'>
                  {item.business}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium
                  ${
                    item.type === 'update'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-green-500/20 text-green-400'
                  }`}
                >
                  {item.type}
                </span>
              </div>

              <p className='text-gray-300 text-sm mb-2'>{item.content}</p>

              <div className='text-xs text-gray-400'>
                {item.type === 'update' ? (
                  formatDate(item.timestamp)
                ) : (
                  <span>Valid until {formatDate(item.validUntil)}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Updates
