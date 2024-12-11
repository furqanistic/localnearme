import { motion } from 'framer-motion'
import { MapPin, Search, Star } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const BusinessExplorer = ({ userLocation = 'New York' }) => {
  const [businesses, setBusinesses] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Simplified categories
  const categories = ['All', 'Food', 'Retail', 'Services', 'Health']

  useEffect(() => {
    const loadBusinesses = async () => {
      try {
        // Simulated API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const data = [
          {
            id: 1,
            name: 'Local Cafe',
            category: 'Food',
            distance: '0.5',
            special: '50% off on desserts',
            isFollowing: false,
          },
          {
            id: 2,
            name: 'Tech Store',
            category: 'Retail',
            distance: '1.2',
            special: 'Buy one, get one 50% off',
            isFollowing: true,
          },
          {
            id: 3,
            name: 'Fitness Center',
            category: 'Health',
            distance: '0.8',
            special: 'First month free',
            isFollowing: false,
          },
        ]
        setBusinesses(data)
      } catch (error) {
        console.error('Failed to fetch businesses:', error)
      } finally {
        setLoading(false)
      }
    }

    loadBusinesses()
  }, [])

  const filteredBusinesses = businesses.filter(
    (business) =>
      (selectedCategory === 'All' || business.category === selectedCategory) &&
      business.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-xl font-semibold text-gray-100'>
          Nearby Businesses
        </h2>
        <div className='flex items-center text-gray-400 text-sm'>
          <MapPin className='w-4 h-4 mr-1' />
          {userLocation}
        </div>
      </div>

      <div className='space-y-4 mb-6'>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search businesses...'
            className='w-full bg-gray-700 text-white rounded-lg border-gray-600 pl-10 py-2 focus:ring-blue-500'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
        </div>

        <div className='flex gap-2 overflow-x-auto pb-2'>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap
                ${
                  selectedCategory === category
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className='flex justify-center py-12'>
          <div className='w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin' />
        </div>
      ) : (
        <div className='space-y-4'>
          {filteredBusinesses.map((business) => (
            <motion.div
              key={business.id}
              className='bg-gray-700 bg-opacity-30 rounded-lg p-4'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className='flex justify-between items-start mb-2'>
                <div>
                  <h3 className='text-lg font-medium text-gray-100'>
                    {business.name}
                  </h3>
                  <p className='text-sm text-gray-400'>{business.category}</p>
                </div>
                <button
                  onClick={() => {
                    setBusinesses(
                      businesses.map((b) =>
                        b.id === business.id
                          ? { ...b, isFollowing: !b.isFollowing }
                          : b
                      )
                    )
                  }}
                  className={`flex items-center gap-1 text-sm
                    ${
                      business.isFollowing ? 'text-yellow-400' : 'text-gray-400'
                    }`}
                >
                  <Star
                    className='w-4 h-4'
                    fill={business.isFollowing ? 'currentColor' : 'none'}
                  />
                </button>
              </div>

              <p className='text-gray-300 text-sm mb-2'>{business.special}</p>

              <div className='text-xs text-gray-400'>
                {business.distance} miles away
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BusinessExplorer
