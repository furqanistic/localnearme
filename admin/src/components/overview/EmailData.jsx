import { Inbox, UserPlus } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

// Mock data for the past week
const weekData = [
  { day: 'Mon', emailsSent: 120, newSubscribers: 15 },
  { day: 'Tue', emailsSent: 150, newSubscribers: 20 },
  { day: 'Wed', emailsSent: 180, newSubscribers: 25 },
  { day: 'Thu', emailsSent: 200, newSubscribers: 30 },
  { day: 'Fri', emailsSent: 220, newSubscribers: 35 },
  { day: 'Sat', emailsSent: 190, newSubscribers: 28 },
  { day: 'Sun', emailsSent: 160, newSubscribers: 22 },
]

const EmailData = () => {
  const totalEmailsSent = weekData.reduce((sum, day) => sum + day.emailsSent, 0)
  const totalNewSubscribers = weekData.reduce(
    (sum, day) => sum + day.newSubscribers,
    0
  )

  return (
    <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'>
      <h2 className='text-xl font-semibold text-gray-100 mb-6'>
        This Week's Email Statistics
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
        <div className='bg-gray-700 rounded-lg p-4 flex items-center'>
          <Inbox className='text-blue-400 mr-4' size={24} />
          <div>
            <p className='text-gray-400 text-sm'>Total Emails Sent</p>
            <p className='text-2xl font-bold text-gray-100'>
              {totalEmailsSent}
            </p>
          </div>
        </div>
        <div className='bg-gray-700 rounded-lg p-4 flex items-center'>
          <UserPlus className='text-green-400 mr-4' size={24} />
          <div>
            <p className='text-gray-400 text-sm'>New Subscribers</p>
            <p className='text-2xl font-bold text-gray-100'>
              {totalNewSubscribers}
            </p>
          </div>
        </div>
      </div>

      <div className='h-64 w-full'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={weekData}>
            <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
            <XAxis dataKey='day' stroke='#9CA3AF' />
            <YAxis yAxisId='left' stroke='#9CA3AF' />
            <YAxis yAxisId='right' orientation='right' stroke='#9CA3AF' />
            <Tooltip
              contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
              itemStyle={{ color: '#E5E7EB' }}
            />
            <Legend />
            <Bar
              yAxisId='left'
              dataKey='emailsSent'
              name='Emails Sent'
              fill='#3B82F6'
            />
            <Bar
              yAxisId='right'
              dataKey='newSubscribers'
              name='New Subscribers'
              fill='#10B981'
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default EmailData
