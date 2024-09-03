import { motion } from 'framer-motion'
import { Download, Edit, Plus, Search, Trash2 } from 'lucide-react'
import { useState } from 'react'
import BusinessForm from './BusinessForm'

const BUSINESS_DATA = [
  {
    id: 1,
    name: 'Cozy Downtown Studio',
    category: 'Short-term Rental',
    price: 120,
    stock: 20,
    sales: 30,
    address: {
      street: '123 Maple St',
      city: 'Toronto',
      province: 'ON',
      postalCode: 'M5G 1Z4',
    },
  },
  {
    id: 2,
    name: 'Luxury Leather Suite',
    category: 'Boutique Hotel Room',
    price: 200,
    stock: 15,
    sales: 45,
    address: {
      street: '456 Elm Ave',
      city: 'Vancouver',
      province: 'BC',
      postalCode: 'V6B 3K9',
    },
  },
  {
    id: 3,
    name: 'Smart Home with Sea View',
    category: 'Vacation Home',
    price: 350,
    stock: 10,
    sales: 25,
    address: {
      street: '789 Ocean Dr',
      city: 'Halifax',
      province: 'NS',
      postalCode: 'B3J 2K9',
    },
  },
  {
    id: 4,
    name: 'Private Yoga Retreat Space',
    category: 'Cottage',
    price: 90,
    stock: 25,
    sales: 40,
    address: {
      street: '101 Pine St',
      city: 'Whistler',
      province: 'BC',
      postalCode: 'V0N 1B4',
    },
  },
  {
    id: 5,
    name: 'Urban Flat with Coffee Bar',
    category: 'Condo',
    price: 130,
    stock: 15,
    sales: 35,
    address: {
      street: '202 Bay St',
      city: 'Ottawa',
      province: 'ON',
      postalCode: 'K1N 9C4',
    },
  },
]

const BusinessTable = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredBusiness, setFilteredBusiness] = useState(BUSINESS_DATA)
  const [userMembership, setUserMembership] = useState('free')
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false)
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false)
  const [currentBusiness, setCurrentBusiness] = useState(null)

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)
    const filtered = BUSINESS_DATA.filter(
      (business) =>
        business.name.toLowerCase().includes(term) ||
        business.category.toLowerCase().includes(term)
    )
    setFilteredBusiness(filtered)
  }

  const handleAddBusiness = () => {
    const freeListings = BUSINESS_DATA.filter(
      (b) => b.membershipTier === 'free'
    ).length
    if (userMembership === 'free' && freeListings >= 1) {
      alert(
        "You've reached the limit for free listings. Please upgrade your membership to add more."
      )
    } else {
      setIsAddPopupOpen(true)
    }
  }

  const handleEditBusiness = (business) => {
    setCurrentBusiness(business)
    setIsEditPopupOpen(true)
  }

  const handleDeleteBusiness = (id) => {
    // Logic to delete business
    console.log('Delete business', id)
    alert('The business has been successfully deleted.')
  }

  const handleDownloadQR = (id) => {
    // Logic to generate and download QR code
    console.log('Download QR for business', id)
    alert('The QR code has been generated and downloaded.')
  }

  const handleClosePopup = () => {
    setIsAddPopupOpen(false)
    setIsEditPopupOpen(false)
    setCurrentBusiness(null)
  }

  const handleSaveBusiness = (businessData) => {
    // Logic to save or update business
    console.log('Save business', businessData)
    handleClosePopup()
  }

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold text-gray-100'>Your Business</h2>
        <div className='flex items-center gap-4'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search business...'
              className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              onChange={handleSearch}
              value={searchTerm}
            />
            <Search
              className='absolute left-3 top-2.5 text-gray-400'
              size={18}
            />
          </div>
          <button
            onClick={handleAddBusiness}
            className='flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
          >
            <Plus size={18} />
            Add Business
          </button>
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
                Address
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-700'>
            {filteredBusiness.map((business) => (
              <motion.tr
                key={business.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>
                  {business.name}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  {business.category}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  {business.address.street + business.address.city}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <button
                    onClick={() => handleEditBusiness(business)}
                    className='text-indigo-400 hover:text-indigo-300 mr-2'
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteBusiness(business.id)}
                    className='text-red-400 hover:text-red-300 mr-2'
                  >
                    <Trash2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDownloadQR(business.id)}
                    className='text-green-400 hover:text-green-300'
                  >
                    <Download size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {(isAddPopupOpen || isEditPopupOpen) && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'>
          <div className='bg-gray-800 rounded-lg p-6 w-full max-w-md'>
            <BusinessForm
              business={currentBusiness}
              onSave={handleSaveBusiness}
              onClose={handleClosePopup}
            />
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default BusinessTable
