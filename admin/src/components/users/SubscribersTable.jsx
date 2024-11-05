import { motion } from 'framer-motion'
import { ChevronDown, ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { axiosInstance } from '../../config'

const ITEMS_PER_PAGE = 5

const fetchBusinessLocations = async (businessOwnerId) => {
  const response = await axiosInstance.get(
    `business/user/${businessOwnerId}/business-names`
  )
  return response.data.data
}

const fetchSubscribers = async (businessId) => {
  if (!businessId) return null
  const response = await axiosInstance.get(
    `subscriptions/businesses/${businessId}/subscribers`
  )
  return response.data.data.subscriptions
}

const SubscribersTable = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBusiness, setSelectedBusiness] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const { currentUser } = useSelector((state) => state.user)
  const activeUser = currentUser?.data?.user

  // Fetch business locations
  const {
    data: businesses = [],
    isLoading: isLoadingBusinesses,
    error: businessesError,
  } = useQuery({
    queryKey: ['businesses', activeUser?._id],
    queryFn: () => fetchBusinessLocations(activeUser?._id),
    enabled: !!activeUser?._id,
  })

  // Set initial selected business when data is loaded
  useEffect(() => {
    if (businesses.length > 0 && !selectedBusiness) {
      setSelectedBusiness(businesses[0])
    }
  }, [businesses])

  // Reset to first page when search term or business changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedBusiness])

  // Fetch subscribers for selected business
  const {
    data: subscribers = [],
    isLoading: isLoadingSubscribers,
    error: subscribersError,
  } = useQuery({
    queryKey: ['subscribers', selectedBusiness?.value],
    queryFn: () => fetchSubscribers(selectedBusiness?.value),
    enabled: !!selectedBusiness?.value,
  })

  const filteredSubscribers = useMemo(() => {
    if (!subscribers) return []

    return subscribers.filter((subscription) => {
      const searchString = searchTerm.toLowerCase()
      return (
        subscription.user.name.toLowerCase().includes(searchString) ||
        subscription.user.email.toLowerCase().includes(searchString)
      )
    })
  }, [searchTerm, subscribers])

  // Pagination calculations
  const totalPages = Math.ceil(filteredSubscribers.length / ITEMS_PER_PAGE)
  const paginatedSubscribers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return filteredSubscribers.slice(startIndex, endIndex)
  }, [filteredSubscribers, currentPage])

  // Handler for business selection
  const handleBusinessChange = (e) => {
    const selected = businesses.find(
      (business) => business.label === e.target.value
    )
    setSelectedBusiness(selected)
  }

  // Pagination controls
  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

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
            {isLoadingBusinesses ? (
              <div className='w-full sm:w-48 bg-gray-700 text-gray-400 rounded-lg pl-4 pr-10 py-2'>
                Loading...
              </div>
            ) : businessesError ? (
              <div className='w-full sm:w-48 bg-gray-700 text-red-400 rounded-lg pl-4 pr-10 py-2'>
                Error loading businesses
              </div>
            ) : businesses.length === 0 ? (
              <div className='w-full sm:w-48 bg-gray-700 text-gray-400 rounded-lg pl-4 pr-10 py-2'>
                No businesses found
              </div>
            ) : (
              <select
                className='w-full sm:w-48 appearance-none bg-gray-700 text-white rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={selectedBusiness?.label || ''}
                onChange={handleBusinessChange}
              >
                {businesses.map((business) => (
                  <option key={business.value} value={business.label}>
                    {business.label}
                  </option>
                ))}
              </select>
            )}
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
                Subscriber
              </th>
              <th className='px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Email
              </th>
              <th className='px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Status
              </th>
              <th className='px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Notifications
              </th>
              <th className='px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Subscription Date
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-700'>
            {isLoadingSubscribers ? (
              <tr>
                <td colSpan='5' className='px-4 py-4 text-center text-gray-400'>
                  Loading subscribers...
                </td>
              </tr>
            ) : subscribersError ? (
              <tr>
                <td colSpan='5' className='px-4 py-4 text-center text-red-400'>
                  Error loading subscribers
                </td>
              </tr>
            ) : paginatedSubscribers.length === 0 ? (
              <tr>
                <td colSpan='5' className='px-4 py-4 text-center text-gray-400'>
                  No subscribers found for this business
                </td>
              </tr>
            ) : (
              paginatedSubscribers.map((subscription) => (
                <motion.tr
                  key={subscription._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className='px-4 py-4 whitespace-nowrap'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0 h-10 w-10'>
                        <div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
                          {subscription.user.name.charAt(0)}
                        </div>
                      </div>
                      <div className='ml-4'>
                        <div className='text-sm font-medium text-gray-100'>
                          {subscription.user.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-300'>
                      {subscription.user.email}
                    </div>
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap'>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        subscription.status === 'active'
                          ? 'bg-green-800 text-green-100'
                          : 'bg-red-800 text-red-100'
                      }`}
                    >
                      {subscription.status}
                    </span>
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-300'>
                      {subscription.notifications.email && (
                        <span className='mr-2'>Turned On</span>
                      )}
                      {subscription.notifications.push && <span>🔔</span>}
                    </div>
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-300'>
                      {new Date(
                        subscription.subscriptionDate
                      ).toLocaleDateString()}
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {filteredSubscribers.length > 0 && (
        <div className='mt-4 flex items-center justify-between border-t border-gray-700 pt-4'>
          <div className='text-sm text-gray-400'>
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredSubscribers.length)}{' '}
            of {filteredSubscribers.length} subscribers
          </div>
          <div className='flex items-center space-x-2'>
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg ${
                currentPage === 1
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              <ChevronLeft size={18} />
            </button>
            <span className='text-gray-400'>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg ${
                currentPage === totalPages
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default SubscribersTable
