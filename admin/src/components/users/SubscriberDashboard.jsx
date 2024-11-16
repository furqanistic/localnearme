import { motion } from 'framer-motion'
import { QrCode, Star, Users } from 'lucide-react'
import React from 'react'
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const SubscriberDashboard = () => {
  // Sample data - replace with your actual data
  const monthlyData = [
    { month: 'Jan', subscribers: 25, reviews: 12 },
    { month: 'Feb', subscribers: 40, reviews: 18 },
    { month: 'Mar', subscribers: 55, reviews: 25 },
    { month: 'Apr', subscribers: 75, reviews: 35 },
  ]

  const StatCard = ({ title, value, subValue, icon: Icon, color }) => (
    <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-lg p-4 border border-gray-700'>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-gray-400 text-sm'>{title}</p>
          <p className='text-2xl font-semibold text-white mt-1'>{value}</p>
          {subValue && <p className='text-sm text-gray-400 mt-1'>{subValue}</p>}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className='w-6 h-6' />
        </div>
      </div>
    </div>
  )

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
        <StatCard
          title='Total Subscribers'
          value='1,234'
          subValue='+12% from last month'
          icon={Users}
          color='bg-purple-500/10 text-purple-500'
        />
        <StatCard
          title='Review Count'
          value='856'
          subValue='4.8 average rating'
          icon={Star}
          color='bg-yellow-500/10 text-yellow-500'
        />
        <StatCard
          title='QR Scans'
          value='2,145'
          subValue='45% conversion rate'
          icon={QrCode}
          color='bg-blue-500/10 text-blue-500'
        />
      </div>

      {/* Growth Chart */}
      <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-lg p-4 border border-gray-700'>
        <h3 className='text-lg font-semibold text-gray-100 mb-4'>
          Growth Overview
        </h3>
        <div className='h-[300px] w-full'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              data={monthlyData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis
                dataKey='month'
                stroke='#9CA3AF'
                tick={{ fill: '#9CA3AF' }}
                tickLine={{ stroke: '#4B5563' }}
              />
              <YAxis
                stroke='#9CA3AF'
                tick={{ fill: '#9CA3AF' }}
                tickLine={{ stroke: '#4B5563' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(17, 24, 39, 0.8)',
                  border: '1px solid #374151',
                  borderRadius: '0.5rem',
                }}
                itemStyle={{ color: '#E5E7EB' }}
                labelStyle={{ color: '#9CA3AF' }}
              />
              <Line
                type='monotone'
                dataKey='subscribers'
                stroke='#8B5CF6'
                strokeWidth={2}
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
                name='Newsletter Signups'
              />
              <Line
                type='monotone'
                dataKey='reviews'
                stroke='#10B981'
                strokeWidth={2}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
                name='Reviews'
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  )
}

export default SubscriberDashboard
