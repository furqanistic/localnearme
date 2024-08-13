import { motion } from 'framer-motion'
import { Edit, Search, Trash2 } from 'lucide-react'
import { useState } from 'react'

const LISTING_DATA = [
  {
    id: 1,
    name: 'Cozy Downtown Studio',
    category: 'Short-term Rental',
    price: 120,
    stock: 20, // Represents available nights for booking
    sales: 30, // Represents nights already booked
  },
  {
    id: 2,
    name: 'Luxury Leather Suite',
    category: 'Boutique Hotel Room',
    price: 200,
    stock: 15,
    sales: 45,
  },
  {
    id: 3,
    name: 'Smart Home with Sea View',
    category: 'Vacation Home',
    price: 350,
    stock: 10,
    sales: 25,
  },
  {
    id: 4,
    name: 'Private Yoga Retreat Space',
    category: 'Cottage',
    price: 90,
    stock: 25,
    sales: 40,
  },
  {
    id: 5,
    name: 'Urban Flat with Coffee Bar',
    category: 'Condo',
    price: 130,
    stock: 15,
    sales: 35,
  },
]

const ProductsTable = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProducts, setFilteredProducts] = useState(LISTING_DATA)

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)
    const filtered = LISTING_DATA.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
    )

    setFilteredProducts(filtered)
  }

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold text-gray-100'>All Listings</h2>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search products...'
            className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-700'>
          <thead>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Name
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Category
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Price
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Remaining
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Booked
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-700'>
            {filteredProducts.map((product) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center'>
                  <img
                    src='https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200'
                    alt='Product img'
                    className='size-10 rounded-full'
                  />
                  {product.name}
                </td>

                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  {product.category}
                </td>

                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  ${product.price.toFixed(2)}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  {product.stock}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  {product.sales}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <button className='text-indigo-400 hover:text-indigo-300 mr-2'>
                    <Edit size={18} />
                  </button>
                  <button className='text-red-400 hover:text-red-300'>
                    <Trash2 size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
export default ProductsTable
