import { motion } from 'framer-motion'
import { CheckCircle, Clock, DollarSign, ShoppingBag } from 'lucide-react'

import BookingsTable from '../components/bookings/BookingsTable'
import DailyBookings from '../components/bookings/DailyBookings'
import OrderDistribution from '../components/bookings/OrderDistribution'
import Header from '../components/common/Header'
import StatCard from '../components/common/StatCard'

const Bookingstats = {
  totalBookings: '1,234',
  pendingBookings: '56',
  completedBookings: '1,178',
  totalRevenue: '$98,765',
}

const BookingsPage = () => {
  return (
    <div className='flex-1 relative z-10 overflow-auto'>
      <Header title={'Bookings'} />

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        <motion.div
          className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name='Total Bookings'
            icon={ShoppingBag}
            value={Bookingstats.totalBookings}
            color='#6366F1'
          />
          <StatCard
            name='Pending Bookings'
            icon={Clock}
            value={Bookingstats.pendingBookings}
            color='#F59E0B'
          />
          <StatCard
            name='Completed Bookings'
            icon={CheckCircle}
            value={Bookingstats.completedBookings}
            color='#10B981'
          />
          <StatCard
            name='Total Revenue'
            icon={DollarSign}
            value={Bookingstats.totalRevenue}
            color='#EF4444'
          />
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
          <DailyBookings />
          <OrderDistribution />
        </div>

        <BookingsTable />
      </main>
    </div>
  )
}
export default BookingsPage
