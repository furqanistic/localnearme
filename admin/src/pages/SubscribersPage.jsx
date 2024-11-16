import { motion } from 'framer-motion'
import { UserCheck, UserPlus, UsersIcon, UserX } from 'lucide-react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import Header from '../components/common/Header'
import StatCard from '../components/common/StatCard'
import SubscriberCharts from '../components/users/SubscriberDashboard'
import SubscribersTable from '../components/users/SubscribersTable'

import SubscriberDashboard from '../components/users/SubscriberDashboard'
import { axiosInstance } from '../config.js'

const userStats = {
  totalUsers: 152845,
  newUsersToday: 243,
  activeUsers: 98520,
  churnRate: '2.4%',
}

const fetchBusinessLocations = async (businessOwnerId) => {
  const response = await axiosInstance.get(
    `business/user/${businessOwnerId}/business-names`
  )
  return response
}

const SubscribersPage = () => {
  const { currentUser } = useSelector((state) => state.user)
  const activeUser = currentUser?.data?.user
  // Fetch business locations
  const {
    data: businesses = [],
    isLoading: isLoadingBusinesses,
    error: businessesError,
  } = useQuery({
    queryKey: ['businesses-count', activeUser?._id],
    queryFn: () => fetchBusinessLocations(activeUser?._id),
    enabled: !!activeUser?._id,
  })

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Subscribers' />

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        <div className='flex-1 overflow-auto'>
          <SubscriberDashboard />
        </div>
        <SubscribersTable />
      </main>
    </div>
  )
}
export default SubscribersPage
