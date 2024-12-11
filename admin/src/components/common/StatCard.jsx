import { motion } from 'framer-motion'

const StatCard = ({ name, icon: Icon, value, color }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md border border-gray-700 rounded-xl p-6'
    >
      <div className='flex items-center gap-4'>
        <div
          className='p-2 rounded-lg'
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className='h-6 w-6' style={{ color }} />
        </div>
        <div>
          <p className='text-gray-400 text-sm'>{name}</p>
          <p className='text-xl font-semibold text-gray-100'>{value}</p>
        </div>
      </div>
    </motion.div>
  )
}
export default StatCard
