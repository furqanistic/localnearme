import { motion } from 'framer-motion'
import { ArrowUpDown, Eye, Search } from 'lucide-react'
import React, { useState } from 'react'

const BookingsTable = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState({ field: 'date', ascending: false })

  const orderData = [
    {
      id: 'ORD001',
      customer: 'User 1',
      total: 235.4,
      status: 'Active',
      date: '2024-07-01',
    },
    {
      id: 'ORD002',
      customer: 'User 2',
      total: 412.0,
      status: 'Processing',
      date: '2024-07-02',
    },
    {
      id: 'ORD003',
      customer: 'User 3',
      total: 162.5,
      status: 'Booked',
      date: '2024-07-03',
    },
    {
      id: 'ORD004',
      customer: 'User 4',
      total: 750.2,
      status: 'Pending',
      date: '2024-07-04',
    },
  ]

  const getStatusStyle = (status) => {
    const styles = {
      Active: 'bg-emerald-500/20 text-emerald-400',
      Processing: 'bg-amber-500/20 text-amber-400',
      Booked: 'bg-blue-500/20 text-blue-400',
      Pending: 'bg-rose-500/20 text-rose-400',
    }
    return styles[status] || 'bg-gray-500/20 text-gray-400'
  }

  const filteredData = orderData
    .filter(
      (order) =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortBy.field]
      const bValue = b[sortBy.field]
      const modifier = sortBy.ascending ? 1 : -1
      return aValue > bValue ? modifier : -modifier
    })

  const handleSort = (field) => {
    setSortBy((prev) => ({
      field,
      ascending: prev.field === field ? !prev.ascending : true,
    }))
  }

  return (
    <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
        <div>
          <h2 className='text-xl font-semibold text-gray-100'>Orders</h2>
          <p className='text-sm text-gray-400 mt-1'>
            Manage your recent orders
          </p>
        </div>

        <div className='relative w-full sm:w-auto'>
          <input
            type='text'
            placeholder='Search orders...'
            className='w-full sm:w-64 bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-gray-700'>
              {[
                { label: 'Order ID', field: 'id' },
                { label: 'Customer', field: 'customer' },
                { label: 'Amount', field: 'total' },
                { label: 'Status', field: 'status' },
                { label: 'Date', field: 'date' },
                { label: '', field: null },
              ].map((column) => (
                <th
                  key={column.label}
                  className='text-left py-4 px-4 text-sm font-medium text-gray-400'
                >
                  {column.field ? (
                    <button
                      onClick={() => handleSort(column.field)}
                      className='flex items-center gap-2 hover:text-gray-200'
                    >
                      {column.label}
                      <ArrowUpDown size={14} className='opacity-50' />
                    </button>
                  ) : (
                    column.label
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredData.map((order) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='border-b border-gray-700/50 hover:bg-gray-700/30'
              >
                <td className='py-4 px-4'>
                  <span className='font-medium text-gray-200'>{order.id}</span>
                </td>
                <td className='py-4 px-4'>
                  <span className='text-gray-300'>{order.customer}</span>
                </td>
                <td className='py-4 px-4'>
                  <span className='font-medium text-gray-200'>
                    ${order.total.toFixed(2)}
                  </span>
                </td>
                <td className='py-4 px-4'>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className='py-4 px-4'>
                  <span className='text-gray-300'>{order.date}</span>
                </td>
                <td className='py-4 px-4'>
                  <button className='p-2 hover:bg-gray-700 rounded-lg transition-colors'>
                    <Eye
                      size={18}
                      className='text-gray-400 hover:text-blue-400'
                    />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BookingsTable
