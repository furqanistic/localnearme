import { motion } from 'framer-motion'
import { UserCheck, UserPlus, UsersIcon, UserX } from 'lucide-react'
import { useQuery } from 'react-query'
import Header from '../components/common/Header'
import StatCard from '../components/common/StatCard'
import SubscribersTable from '../components/users/SubscribersTable'
import UserActivityHeatmap from '../components/users/UserActivityHeatmap'
import UserDemographicsChart from '../components/users/UserDemographicsChart'
import UserGrowthChart from '../components/users/UserGrowthChart'
import { axiosInstance } from '../config.js'
import { useSelector } from 'react-redux'

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
        {/* STATS */}
        <motion.div
          className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name='Total Subscribers'
            icon={UsersIcon}
            value={businesses?.data?.results.toLocaleString() || '0'}
            color='#6366F1'
          />
          <StatCard
            name='New Users Today'
            icon={UserPlus}
            value={userStats.newUsersToday}
            color='#10B981'
          />
          <StatCard
            name='Active Users'
            icon={UserCheck}
            value={userStats.activeUsers.toLocaleString()}
            color='#F59E0B'
          />
          <StatCard
            name='Churn Rate'
            icon={UserX}
            value={userStats.churnRate}
            color='#EF4444'
          />
        </motion.div>

        <SubscribersTable />

        {/* USER CHARTS */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
          <UserGrowthChart />
          <UserActivityHeatmap />
          <UserDemographicsChart />
        </div>
      </main>
    </div>
  )
}
export default SubscribersPage
