import { motion } from 'framer-motion'
import { Bell, ChevronRight, ExternalLink, Search, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const SubscribedBusinesses = () => {
  const [businesses, setBusinesses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBusiness, setSelectedBusiness] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mock data
  useEffect(() => {
    const fetchData = async () => {
      const data = [
        {
          id: 1,
          name: 'Local Cafe',
          type: 'Restaurant',
          accent: '#A78BFA',
          updates: 12,
          lastFlyer: 'Spring Menu 2024',
          subscribedDate: '2024-02-15',
        },
        {
          id: 2,
          name: 'Tech Hub',
          type: 'Electronics',
          accent: '#34D399',
          updates: 8,
          lastFlyer: 'New Arrivals',
          subscribedDate: '2024-01-20',
        },
        {
          id: 3,
          name: 'Fitness Zone',
          type: 'Health & Wellness',
          accent: '#F472B6',
          updates: 15,
          lastFlyer: 'March Promotions',
          subscribedDate: '2024-03-01',
        },
      ]
      setBusinesses(data)
      setLoading(false)
    }
    fetchData()
  }, [])

  const filteredBusinesses = businesses.filter(
    (business) =>
      business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='min-h-screen bg-gray-800 bg-opacity-50 p-4 md:p-6'>
      {/* Main Container */}
      <div className='max-w-5xl mx-auto'>
        {/* Header */}
        <div className='flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 mb-8'>
          <h1 className='text-2xl font-light text-white'>
            Subscribed <span className='font-medium'>Businesses</span>
          </h1>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search subscriptions...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full md:w-64 bg-gray-800/50 text-white pl-10 pr-4 py-2 rounded-full 
                         border border-gray-700/50 focus:outline-none focus:border-gray-600 
                         placeholder-gray-500 transition-all'
            />
            <Search
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'
              size={18}
            />
          </div>
        </div>

        {/* Business List */}
        {loading ? (
          <div className='flex justify-center items-center h-64'>
            <div className='animate-spin rounded-full h-8 w-8 border-2 border-gray-500 border-t-white'></div>
          </div>
        ) : (
          <div className='grid gap-4'>
            {filteredBusinesses.map((business) => (
              <motion.div
                key={business.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`relative group cursor-pointer`}
                onClick={() => setSelectedBusiness(business)}
              >
                <div
                  className='bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 
                              overflow-hidden transition-all duration-300 
                              hover:bg-gray-800/50 hover:border-gray-600/50'
                >
                  <div className='p-4 md:p-6'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-4'>
                        {/* Business Icon */}
                        <div
                          className='w-12 h-12 rounded-full flex items-center justify-center text-white'
                          style={{
                            background: `${business.accent}20`,
                            color: business.accent,
                          }}
                        >
                          {business.name.charAt(0)}
                        </div>

                        {/* Business Info */}
                        <div>
                          <h3 className='text-lg font-medium text-white group-hover:text-[${business.accent}] transition-colors'>
                            {business.name}
                          </h3>
                          <p className='text-sm text-gray-400'>
                            {business.type}
                          </p>
                        </div>
                      </div>

                      {/* Updates Badge */}
                      <div className='flex items-center space-x-4'>
                        <div className='hidden md:flex items-center space-x-2'>
                          <Bell size={16} className='text-gray-400' />
                          <span className='text-sm text-gray-400'>
                            {business.updates} updates
                          </span>
                        </div>
                        <ChevronRight
                          size={20}
                          className='text-gray-500 group-hover:text-gray-300 transition-colors'
                        />
                      </div>
                    </div>
                  </div>

                  {/* Accent Line */}
                  <div
                    className='h-1 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'
                    style={{ background: business.accent }}
                  />
                </div>
              </motion.div>
            ))}

            {filteredBusinesses.length === 0 && (
              <div className='text-center py-12'>
                <p className='text-gray-400'>No subscriptions found</p>
              </div>
            )}
          </div>
        )}

        {/* Selected Business Details Modal */}
        {selectedBusiness && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50'
            onClick={() => setSelectedBusiness(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className='bg-gray-800 rounded-xl w-full max-w-lg overflow-hidden'
              onClick={(e) => e.stopPropagation()}
            >
              <div className='p-6 space-y-4'>
                <div className='flex justify-between items-start'>
                  <div className='flex items-center space-x-4'>
                    <div
                      className='w-14 h-14 rounded-full flex items-center justify-center text-xl'
                      style={{
                        background: `${selectedBusiness.accent}20`,
                        color: selectedBusiness.accent,
                      }}
                    >
                      {selectedBusiness.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className='text-xl font-medium text-white'>
                        {selectedBusiness.name}
                      </h2>
                      <p className='text-gray-400'>{selectedBusiness.type}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedBusiness(null)}
                    className='text-gray-400 hover:text-white transition-colors'
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className='space-y-4 pt-4'>
                  <div className='flex justify-between items-center py-3 border-b border-gray-700'>
                    <span className='text-gray-400'>Latest Flyer</span>
                    <div className='flex items-center space-x-2'>
                      <span className='text-white'>
                        {selectedBusiness.lastFlyer}
                      </span>
                      <ExternalLink size={16} className='text-gray-400' />
                    </div>
                  </div>

                  <div className='flex justify-between items-center py-3 border-b border-gray-700'>
                    <span className='text-gray-400'>Subscribed Since</span>
                    <span className='text-white'>
                      {new Date(
                        selectedBusiness.subscribedDate
                      ).toLocaleDateString()}
                    </span>
                  </div>

                  <div className='flex justify-between items-center py-3 border-b border-gray-700'>
                    <span className='text-gray-400'>Updates Received</span>
                    <span className='text-white'>
                      {selectedBusiness.updates}
                    </span>
                  </div>
                </div>

                <div className='flex justify-end space-x-3 pt-4'>
                  <button
                    onClick={() => setSelectedBusiness(null)}
                    className='px-4 py-2 text-gray-400 hover:text-white transition-colors'
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setBusinesses(
                        businesses.filter((b) => b.id !== selectedBusiness.id)
                      )
                      setSelectedBusiness(null)
                    }}
                    className='px-4 py-2 text-red-400 hover:text-red-300 transition-colors'
                  >
                    Unsubscribe
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default SubscribedBusinesses
