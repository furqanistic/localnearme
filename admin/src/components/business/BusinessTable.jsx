import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { motion } from 'framer-motion'
import { Edit, Eye, Plus, QrCode, Search, Trash2 } from 'lucide-react'
import QRCode from 'qrcode'
import { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { deleteBusiness, fetchbusiness } from './apiServiceBusiness'

const BusinessTable = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBusiness, setSelectedBusiness] = useState(null)
  const [showQRModal, setShowQRModal] = useState(false)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    data: businesses,
    isLoading,
    isError,
  } = useQuery('businesses', fetchbusiness)

  const deleteBusinessMutation = useMutation(deleteBusiness, {
    onSuccess: () => {
      queryClient.invalidateQueries('businesses')
    },
  })

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
    navigate('/business/add')
  }

  const handleEditBusiness = (business) => {
    navigate(`/business/edit/${business._id}`)
  }

  const handleDeleteBusiness = (id) => {
    if (window.confirm('Are you sure you want to delete this business?')) {
      deleteBusinessMutation.mutate(id)
    }
  }

  const handleViewQR = (business, e) => {
    e.stopPropagation()
    setSelectedBusiness(business)
    setShowQRModal(true)
  }

  const handleDownloadQR = () => {
    if (!selectedBusiness) return

    const canvas = document.querySelector('#qr-canvas')
    if (canvas) {
      const link = document.createElement('a')
      link.download = `${selectedBusiness.name}-qr.png`
      link.href = canvas.toDataURL('image/png')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleRowClick = (business) => {
    navigate(`/business/${business._id}`)
  }

  const QRCodeDisplay = ({ business }) => {
    const canvasRef = useRef(null)

    useEffect(() => {
      if (!canvasRef.current) return

      const qrValue = `https://bisslocal.com/view-business/${business._id}`
      QRCode.toCanvas(canvasRef.current, qrValue, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      }).catch((err) => {
        console.error(err)
      })
    }, [business])

    return (
      <div className='flex flex-col items-center space-y-4 p-4'>
        <canvas
          ref={canvasRef}
          id='qr-canvas'
          className='w-64 h-64 bg-white p-4 rounded-lg'
        />
        <div className='text-center text-gray-300'>
          <p className='font-semibold text-lg'>{business.name}</p>
          <p className='text-sm text-gray-400'>{business.type}</p>
          <p className='text-xs text-gray-500 mt-1'>
            {`https://bisslocal.com/view-business/${business._id}`}
          </p>
        </div>
        <Button
          onClick={handleDownloadQR}
          className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white'
        >
          <QrCode className='w-4 h-4' />
          Download QR Code
        </Button>
      </div>
    )
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching businesses</div>

  return (
    <>
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
                        onClick={(e) => handleViewQR(business, e)}
                        className='text-green-400 hover:text-green-300 transition-colors duration-200'
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <Dialog open={showQRModal} onOpenChange={setShowQRModal}>
        <DialogContent className='sm:max-w-md bg-gray-800 border border-gray-700'>
          <DialogHeader>
            <DialogTitle className='text-gray-100'>
              Business QR Code
            </DialogTitle>
          </DialogHeader>
          {selectedBusiness && <QRCodeDisplay business={selectedBusiness} />}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default BusinessTable
