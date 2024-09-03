import { motion } from 'framer-motion'
import { ChevronDown, Search } from 'lucide-react'
import { useMemo, useState } from 'react'

// Sample data - replace with your actual data
const subscriberData = [
  {
    id: 1,
    firstName: 'John',
    city: 'New York',
    country: 'USA',
    province: 'NY',
    storeLocation: 'Manhattan',
  },
  {
    id: 2,
    firstName: 'Emma',
    city: 'London',
    country: 'UK',
    province: 'England',
    storeLocation: 'Central London',
  },
  {
    id: 3,
    firstName: 'Liam',
    city: 'Toronto',
    country: 'Canada',
    province: 'Ontario',
    storeLocation: 'Downtown Toronto',
  },
  {
    id: 4,
    firstName: 'Sophia',
    city: 'Paris',
    country: 'France',
    province: 'Île-de-France',
    storeLocation: 'Champs-Élysées',
  },
  {
    id: 5,
    firstName: 'Noah',
    city: 'Sydney',
    country: 'Australia',
    province: 'NSW',
    storeLocation: 'CBD',
  },
]

const storeLocations = [
  'All',
  'Manhattan',
  'Central London',
  'Downtown Toronto',
  'Champs-Élysées',
  'CBD',
]

const SubscribersTable = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('All')

  const filteredSubscribers = useMemo(() => {
    return subscriberData.filter((subscriber) => {
      const matchesSearch =
        subscriber.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subscriber.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subscriber.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subscriber.province.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesLocation =
        selectedLocation === 'All' ||
        subscriber.storeLocation === selectedLocation
      return matchesSearch && matchesLocation
    })
  }, [searchTerm, selectedLocation])

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className='flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0'>
        <h2 className='text-xl font-semibold text-gray-100'>Subscribers</h2>
        <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search subscribers...'
              className='w-full sm:w-64 bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className='absolute left-3 top-2.5 text-gray-400'
              size={18}
            />
          </div>
          <div className='relative'>
            <select
              className='w-full sm:w-48 appearance-none bg-gray-700 text-white rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              {storeLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
            <ChevronDown
              className='absolute right-3 top-2.5 text-gray-400'
              size={18}
            />
          </div>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-700'>
          <thead>
            <tr>
              <th className='px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Name
              </th>
              <th className='px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Location
              </th>
              <th className='px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Store
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-700'>
            {filteredSubscribers.map((subscriber) => (
              <motion.tr
                key={subscriber.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className='px-4 py-4 whitespace-nowrap'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0 h-10 w-10'>
                      <div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
                        {subscriber.firstName.charAt(0)}
                      </div>
                    </div>
                    <div className='ml-4'>
                      <div className='text-sm font-medium text-gray-100'>
                        {subscriber.firstName}
                      </div>
                    </div>
                  </div>
                </td>
                <td className='px-4 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-300'>
                    {subscriber.city}, {subscriber.province}
                  </div>
                  <div className='text-sm text-gray-400'>
                    {subscriber.country}
                  </div>
                </td>
                <td className='px-4 py-4 whitespace-nowrap'>
                  <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100'>
                    {subscriber.storeLocation}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

export default SubscribersTable
