import { AnimatePresence, motion } from 'framer-motion'
import { Download, Edit, Plus, Search, Trash2, X } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  createBusiness,
  deleteBusiness,
  fetchbusiness,
  sendDigitalFlyer,
  updateBusiness,
} from './apiServiceBusiness'
import BusinessForm from './BusinessForm'
import DetailPopup from './DetailPopup'

const PopupWrapper = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className='bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto'
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>,
    document.body
  )
}

const BusinessTable = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false)
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false)
  const [isQRPopupOpen, setIsQRPopupOpen] = useState(false)
  const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false)
  const [currentBusiness, setCurrentBusiness] = useState(null)

  const queryClient = useQueryClient()

  const {
    data: businesses,
    isLoading,
    isError,
  } = useQuery('businesses', fetchbusiness)

  const createBusinessMutation = useMutation(createBusiness, {
    onSuccess: () => {
      queryClient.invalidateQueries('businesses')
      setIsAddPopupOpen(false)
    },
  })

  const updateBusinessMutation = useMutation(updateBusiness, {
    onSuccess: () => {
      queryClient.invalidateQueries('businesses')
      setIsEditPopupOpen(false)
    },
  })

  const deleteBusinessMutation = useMutation(deleteBusiness, {
    onSuccess: () => {
      queryClient.invalidateQueries('businesses')
    },
  })

  const sendDigitalFlyerMutation = useMutation(sendDigitalFlyer)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase())
  }

  const filteredBusinesses =
    businesses?.filter(
      (business) =>
        business.name.toLowerCase().includes(searchTerm) ||
        business.type.toLowerCase().includes(searchTerm)
    ) || []

  const handleAddBusiness = () => {
    setIsAddPopupOpen(true)
  }

  const handleEditBusiness = (business) => {
    setCurrentBusiness(business)
    setIsEditPopupOpen(true)
  }

  const handleDeleteBusiness = (id) => {
    if (window.confirm('Are you sure you want to delete this business?')) {
      deleteBusinessMutation.mutate(id)
    }
  }

  const handleDownloadQR = (business) => {
    setCurrentBusiness(business)
    setIsQRPopupOpen(true)
  }

  const handleRowClick = (business) => {
    setCurrentBusiness(business)
    setIsDetailPopupOpen(true)
  }

  const handleClosePopup = () => {
    setIsAddPopupOpen(false)
    setIsEditPopupOpen(false)
    setIsQRPopupOpen(false)
    setIsDetailPopupOpen(false)
    setCurrentBusiness(null)
  }

  const handleSaveBusiness = (businessData) => {
    if (currentBusiness) {
      updateBusinessMutation.mutate({
        id: currentBusiness._id,
        ...businessData,
      })
    } else {
      createBusinessMutation.mutate(businessData)
    }
    handleClosePopup()
  }

  const QRCodePopup = ({ business, onClose }) => {
    const qrRef = useRef(null)
    const storeLink = `https://bisslocal.com/store/${business._id}`
    const downloadQRCode = () => {
      const canvas = document.createElement('canvas')
      const svg = qrRef.current.querySelector('svg')
      const svgData = new XMLSerializer().serializeToString(svg)
      const img = new Image()
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        const pngFile = canvas.toDataURL('image/png')
        const downloadLink = document.createElement('a')
        downloadLink.download = `${business.name}_QR.png`
        downloadLink.href = pngFile
        downloadLink.click()
      }
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
    }

    return (
      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
        <div className='bg-gray-800 rounded-lg p-6 w-full max-w-md'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-semibold text-gray-100'>
              {business.name}
            </h2>
            <button
              onClick={onClose}
              className='text-gray-400 hover:text-gray-200'
            >
              <X size={24} />
            </button>
          </div>
          <p className='text-gray-300 mb-4'>
            {`${business.address.street}, ${business.address.city}, ${business.address.state} ${business.address.zipCode}`}
          </p>
          <div className='flex justify-center mb-4' ref={qrRef}>
            <QRCodeSVG
              value={storeLink}
              size={200}
              bgColor='#1F2937'
              fgColor='#FFFFFF'
            />
          </div>
          <p className='text-gray-400 text-center mb-4'>
            Scan to visit the store
          </p>
          <button
            onClick={downloadQRCode}
            className='w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center'
          >
            <Download size={18} className='mr-2' />
            Download QR Code
          </button>
        </div>
      </div>
    )
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching businesses</div>

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-4 sm:p-6 border border-gray-700 mb-8 flex flex-col h-full'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4'>
        <h2 className='text-xl font-semibold text-gray-100'>Your Business</h2>
        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto'>
          <div className='relative w-full sm:w-auto'>
            <input
              type='text'
              placeholder='Search business...'
              className='w-full sm:w-64 bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
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
            className='flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full sm:w-auto justify-center'
          >
            <Plus size={18} />
            Add Business
          </button>
        </div>
      </div>

      <div className='flex-grow overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-700'>
          <thead className='bg-gray-700 sticky top-0'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                Name
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                Type
              </th>
              <th className='hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                Address
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                Subscribers
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                Favorites
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>

          <tbody className='bg-gray-800 divide-y divide-gray-700'>
            {filteredBusinesses.map((business) => (
              <motion.tr
                key={business._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className='hover:bg-gray-700 cursor-pointer'
                onClick={() => handleRowClick(business)}
              >
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>
                  {business.name}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  {business.type}
                </td>
                <td className='hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  {`${business.address.street}, ${business.address.city}`}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  {business.subscriberCount}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  {business.favoriteCount}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <div
                    className='flex space-x-2'
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => handleEditBusiness(business)}
                      className='text-indigo-400 hover:text-indigo-300 transition-colors duration-200'
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteBusiness(business._id)}
                      className='text-red-400 hover:text-red-300 transition-colors duration-200'
                    >
                      <Trash2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDownloadQR(business)}
                      className='text-green-400 hover:text-green-300 transition-colors duration-200'
                    >
                      <Download size={18} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {(isAddPopupOpen || isEditPopupOpen) && (
          <PopupWrapper onClose={handleClosePopup}>
            <BusinessForm
              business={currentBusiness}
              onSave={handleSaveBusiness}
              onClose={handleClosePopup}
            />
          </PopupWrapper>
        )}

        {isQRPopupOpen && currentBusiness && (
          <PopupWrapper onClose={handleClosePopup}>
            <QRCodePopup
              business={currentBusiness}
              onClose={handleClosePopup}
            />
          </PopupWrapper>
        )}

        {isDetailPopupOpen && currentBusiness && (
          <PopupWrapper onClose={handleClosePopup}>
            <DetailPopup
              business={currentBusiness}
              onClose={handleClosePopup}
            />
          </PopupWrapper>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default BusinessTable
