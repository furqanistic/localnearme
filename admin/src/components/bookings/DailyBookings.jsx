import { motion } from 'framer-motion'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const dailyBookingsData = [
  { date: '07/01', Bookings: 45 },
  { date: '07/02', Bookings: 52 },
  { date: '07/03', Bookings: 49 },
  { date: '07/04', Bookings: 60 },
  { date: '07/05', Bookings: 55 },
  { date: '07/06', Bookings: 58 },
  { date: '07/07', Bookings: 62 },
]

const DailyBookings = () => {
  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className='text-xl font-semibold text-gray-100 mb-4'>
        Daily Bookings
      </h2>

      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={dailyBookingsData}>
            <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
            <XAxis dataKey='date' stroke='#9CA3AF' />
            <YAxis stroke='#9CA3AF' />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(31, 41, 55, 0.8)',
                borderColor: '#4B5563',
              }}
              itemStyle={{ color: '#E5E7EB' }}
            />
            <Legend />
            <Line
              type='monotone'
              dataKey='Bookings'
              stroke='#8B5CF6'
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
export default DailyBookings
