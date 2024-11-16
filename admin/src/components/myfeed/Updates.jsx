import { motion } from 'framer-motion'
import { Bell, ChevronRight, Clock, MapPin, Store, Tag } from 'lucide-react'
import { useEffect, useState } from 'react'

const fetchUpdates = async () => {
  // Simulating API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return [
    {
      id: 1,
      type: 'update',
      business: 'Acme Corp',
      content: "We've just launched our summer collection!",
      timestamp: '2024-06-15T10:00:00Z',
      image: 'https://cdn-icons-png.flaticon.com/512/2098/2098439.png',
    },
    {
      id: 2,
      type: 'deal',
      business: 'Local Cafe',
      content: '50% off on all desserts this weekend!',
      location: 'Downtown',
      validUntil: '2024-06-18T23:59:59Z',
      image: 'https://cdn-icons-png.flaticon.com/512/2098/2098439.png',
    },
    {
      id: 3,
      type: 'update',
      business: 'TechGadgets',
      content: 'New smartphones in stock. Visit our store for exclusive deals!',
      timestamp: '2024-06-14T14:30:00Z',
      image: 'https://cdn-icons-png.flaticon.com/512/2098/2098439.png',
    },
    {
      id: 4,
      type: 'deal',
      business: 'FitLife Gym',
      content: 'Join now and get 3 months free on annual membership',
      location: 'Westside',
      validUntil: '2024-06-30T23:59:59Z',
      image: 'https://cdn-icons-png.flaticon.com/512/2098/2098439.png',
    },
    {
      id: 5,
      type: 'update',
      business: 'GreenGrocer',
      content:
        'Fresh organic produce just arrived. First 50 customers get a free reusable bag!',
      timestamp: '2024-06-16T08:00:00Z',
      image: 'https://cdn-icons-png.flaticon.com/512/2098/2098439.png',
    },
  ]
}

const Updates = ({ userCity = 'New York' }) => {
  const [feedItems, setFeedItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    const loadFeed = async () => {
      try {
        const updates = await fetchUpdates()
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
    const diffTime = Math.abs(now - date)
    const diffMinutes = Math.ceil(diffTime / (1000 * 60))

    if (diffMinutes < 60) {
      return `${diffMinutes}m ago`
    } else if (diffMinutes < 1440) {
      const hours = Math.floor(diffMinutes / 60)
      return `${hours}h ago`
    } else if (diffMinutes < 10080) {
      const days = Math.floor(diffMinutes / 1440)
      return `${days}d ago`
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    }
  }

  const filteredItems =
    activeTab === 'all'
      ? feedItems
      : feedItems.filter((item) => item.type === activeTab)

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'update', label: 'Updates' },
    { id: 'deal', label: 'Deals' },
  ]

  return (
    <div className='min-h-screen bg-gray-800 bg-opacity-50'>
      <div className='sticky top-0  backdrop-blur-xl bg-gray-900/80 border-b border-gray-900'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex items-center justify-between py-4 px-4'>
            <div className='flex items-center gap-6'>
              <div className='flex items-center gap-2'>
                <Bell className='w-5 h-5 text-blue-400' />
                <span className='text-base font-medium text-gray-100'>
                  Updates
                </span>
              </div>

              <div className='flex gap-1'>
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'text-gray-400 hover:bg-gray-800'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {tab.label}
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.div
              className='flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MapPin className='w-4 h-4 text-blue-400' />
              <span className='text-sm font-medium text-gray-300'>
                {userCity}
              </span>
              <ChevronRight className='w-4 h-4 text-gray-400' />
            </motion.div>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 py-6'>
        {loading ? (
          <div className='flex flex-col items-center justify-center h-64 gap-4'>
            <div className='w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin' />
            <p className='text-sm text-gray-400'>Loading updates...</p>
          </div>
        ) : (
          <div className='grid gap-4'>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                className='bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-all duration-200'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className='flex gap-4'>
                  <img
                    src={item.image}
                    alt={item.business}
                    className='w-12 h-12 rounded-lg object-cover flex-shrink-0'
                  />

                  <div className='flex-grow min-w-0'>
                    <div className='flex items-center gap-2 mb-1'>
                      <span className='text-sm font-medium text-gray-100 truncate'>
                        {item.business}
                      </span>
                      {item.type === 'update' ? (
                        <span className='bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-xs font-medium'>
                          Update
                        </span>
                      ) : (
                        <span className='bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-xs font-medium'>
                          Deal
                        </span>
                      )}
                    </div>

                    <p className='text-sm text-gray-300 mb-2 line-clamp-2'>
                      {item.content}
                    </p>

                    <div className='flex items-center text-xs text-gray-400'>
                      {item.type === 'update' ? (
                        <span>{formatDate(item.timestamp)}</span>
                      ) : (
                        <div className='flex items-center gap-3'>
                          <span>{item.location}</span>
                          <span>•</span>
                          <span>Ends {formatDate(item.validUntil)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Updates
