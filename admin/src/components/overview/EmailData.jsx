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

const EmailData = () => {
  // Function to get last 7 days
  const getLast7Days = () => {
    const days = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      days.push(date.toLocaleDateString('en-US', { weekday: 'short' }))
    }
    return days
  }

  // Generate mock data with actual day names
  const weekData = getLast7Days().map((day) => ({
    day,
    emailsSent: 1,
    newSubscribers: 1,
  }))

  const totalEmailsSent = weekData.reduce((sum, day) => sum + day.emailsSent, 0)
  const totalNewSubscribers = weekData.reduce(
    (sum, day) => sum + day.newSubscribers,
    0
  )

  return (
    <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'>
      <h2 className='text-xl font-semibold text-gray-100 mb-6'>
        Email Performance
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
        <div className='bg-gray-700 rounded-lg p-4 flex items-center'>
          <Inbox className='text-blue-400 mr-4' size={24} />
          <div>
            <p className='text-gray-400 text-sm'>Total Emails</p>
            <p className='text-2xl font-bold text-gray-100'>1</p>
          </div>
        </div>

        <div className='bg-gray-700 rounded-lg p-4 flex items-center'>
          <UserPlus className='text-green-400 mr-4' size={24} />
          <div>
            <p className='text-gray-400 text-sm'>Subscribers</p>
            <p className='text-2xl font-bold text-gray-100'>1</p>
          </div>
        </div>
      </div>

      <div className='h-64'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={weekData}>
            <XAxis
              dataKey='day'
              stroke='#9CA3AF'
              tickFormatter={(value) => value}
            />
            <YAxis stroke='#9CA3AF' />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
              }}
              itemStyle={{ color: '#E5E7EB' }}
              formatter={(value, name) => [
                value,
                name === 'emailsSent' ? 'Emails' : 'Subscribers',
              ]}
              labelFormatter={(label) => `${label}`}
            />
            <Bar
              dataKey='emailsSent'
              name='Emails'
              fill='#3B82F6'
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey='newSubscribers'
              name='Subscribers'
              fill='#10B981'
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
export default EmailData
