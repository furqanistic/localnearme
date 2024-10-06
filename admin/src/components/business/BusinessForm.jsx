import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { axiosInstance } from '../../config'

const BusinessForm = ({ business, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
    },
    contactEmail: '',
    phoneNumber: '',
    websiteUrl: '',
    googleMapsUrl: '',
    googleReviewsUrl: '',
    isPremium: false,
    minimumReviewFilter: 5,
    tags: '',
  })

  useEffect(() => {
    if (business) {
      setFormData({
        ...business,
        tags: business.tags.join(', '),
      })
    }
  }, [business])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleAddressChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      },
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const submissionData = {
      ...formData,
      tags: formData.tags.split(',').map((tag) => tag.trim()),
    }

    try {
      const response = await axiosInstance.post('/business/', submissionData)
      console.log('Business created:', response.data)
      onSave(response.data)
    } catch (error) {
      console.error('Error creating business:', error)
      // Handle error (e.g., show error message to user)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4 w-full'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold text-gray-100'>
          {business ? 'Edit Business' : 'Add Business'}
        </h2>
        <button
          type='button'
          onClick={onClose}
          className='text-gray-400 hover:text-gray-200'
        >
          <X size={24} />
        </button>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-300'
          >
            Business Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Enter business name'
            className='mt-1 block w-full p-2 bg-gray-700 text-white rounded-md border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
            required
          />
        </div>

        <div>
          <label
            htmlFor='type'
            className='block text-sm font-medium text-gray-300'
          >
            Business Type
          </label>
          <select
            id='type'
            name='type'
            value={formData.type}
            onChange={handleChange}
            className='mt-1 block w-full p-2 bg-gray-700 text-white rounded-md border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
            required
          >
            <option value=''>Select a type</option>
            <option value='Store'>Store</option>
            <option value='Restaurant'>Restaurant</option>
            <option value='Point of Interest'>Point of Interest</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor='description'
          className='block text-sm font-medium text-gray-300'
        >
          Description
        </label>
        <textarea
          id='description'
          name='description'
          value={formData.description}
          onChange={handleChange}
          placeholder='Describe your business'
          rows='3'
          className='mt-1 block w-full p-2 bg-gray-700 text-white rounded-md border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
          required
        ></textarea>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div>
          <label
            htmlFor='street'
            className='block text-sm font-medium text-gray-300'
          >
            Street
          </label>
          <input
            type='text'
            id='street'
            name='street'
            value={formData.address.street}
            onChange={handleAddressChange}
            placeholder='123 Main St'
            className='mt-1 block w-full p-2 bg-gray-700 text-white rounded-md border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
          />
        </div>

        <div>
          <label
            htmlFor='city'
            className='block text-sm font-medium text-gray-300'
          >
            City
          </label>
          <input
            type='text'
            id='city'
            name='city'
            value={formData.address.city}
            onChange={handleAddressChange}
            placeholder='Anytown'
            className='mt-1 block w-full p-2 bg-gray-700 text-white rounded-md border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
          />
        </div>

        <div>
          <label
            htmlFor='state'
            className='block text-sm font-medium text-gray-300'
          >
            State
          </label>
          <input
            type='text'
            id='state'
            name='state'
            value={formData.address.state}
            onChange={handleAddressChange}
            placeholder='CA'
            className='mt-1 block w-full p-2 bg-gray-700 text-white rounded-md border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
          />
        </div>

        <div>
          <label
            htmlFor='country'
            className='block text-sm font-medium text-gray-300'
          >
            Country
          </label>
          <input
            type='text'
            id='country'
            name='country'
            value={formData.address.country}
            onChange={handleAddressChange}
            placeholder='USA'
            className='mt-1 block w-full p-2 bg-gray-700 text-white rounded-md border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
          />
        </div>

        <div>
          <label
            htmlFor='zipCode'
            className='block text-sm font-medium text-gray-300'
          >
            Zip Code
          </label>
          <input
            type='text'
            id='zipCode'
            name='zipCode'
            value={formData.address.zipCode}
            onChange={handleAddressChange}
            placeholder='12345'
            className='mt-1 block w-full p-2 bg-gray-700 text-white rounded-md border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
          />
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div>
          <label
            htmlFor='contactEmail'
            className='block text-sm font-medium text-gray-300'
          >
            Contact Email
          </label>
          <input
            type='email'
            id='contactEmail'
            name='contactEmail'
            value={formData.contactEmail}
            onChange={handleChange}
            placeholder='contact@example.com'
            className='mt-1 block w-full p-2 bg-gray-700 text-white rounded-md border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
            required
          />
        </div>

        <div>
          <label
            htmlFor='phoneNumber'
            className='block text-sm font-medium text-gray-300'
          >
            Phone Number
          </label>
          <input
            type='tel'
            id='phoneNumber'
            name='phoneNumber'
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder='(123) 456-7890'
            className='mt-1 block w-full p-2 bg-gray-700 text-white rounded-md border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
          />
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div>
          <label
            htmlFor='websiteUrl'
            className='block text-sm font-medium text-gray-300'
          >
            Website URL
          </label>
          <input
            type='url'
            id='websiteUrl'
            name='websiteUrl'
            value={formData.websiteUrl}
            onChange={handleChange}
            placeholder='https://www.example.com'
            className='mt-1 block w-full p-2 bg-gray-700 text-white rounded-md border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
          />
        </div>

        <div>
          <label
            htmlFor='googleMapsUrl'
            className='block text-sm font-medium text-gray-300'
          >
            Google Maps URL
          </label>
          <input
            type='url'
            id='googleMapsUrl'
            name='googleMapsUrl'
            value={formData.googleMapsUrl}
            onChange={handleChange}
            placeholder='https://goo.gl/maps/example'
            className='mt-1 block w-full p-2 bg-gray-700 text-white rounded-md border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
          />
        </div>
      </div>

      <div>
        <label
          htmlFor='googleReviewsUrl'
          className='block text-sm font-medium text-gray-300'
        >
          Google Reviews URL
        </label>
        <input
          type='url'
          id='googleReviewsUrl'
          name='googleReviewsUrl'
          value={formData.googleReviewsUrl}
          onChange={handleChange}
          placeholder='https://goo.gl/reviews/example'
          className='mt-1 block w-full p-2 bg-gray-700 text-white rounded-md border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
        />
      </div>

      <div>
        <label
          htmlFor='tags'
          className='block text-sm font-medium text-gray-300'
        >
          Tags (comma-separated)
        </label>
        <input
          type='text'
          id='tags'
          name='tags'
          value={formData.tags}
          onChange={handleChange}
          placeholder='food, restaurant, italian'
          className='mt-1 block w-full p-2 bg-gray-700 text-white rounded-md border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
        />
      </div>

      <div className='flex items-center'>
        <input
          type='checkbox'
          id='isPremium'
          name='isPremium'
          checked={formData.isPremium}
          onChange={handleChange}
          className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
        />
        <label htmlFor='isPremium' className='ml-2 block text-sm text-gray-300'>
          Premium Business
        </label>
      </div>

      <div>
        <label
          htmlFor='minimumReviewFilter'
          className='block text-sm font-medium text-gray-300'
        >
          Minimum Review Filter
        </label>
        <input
          type='number'
          id='minimumReviewFilter'
          name='minimumReviewFilter'
          value={formData.minimumReviewFilter}
          onChange={handleChange}
          min='1'
          max='5'
          placeholder='1-5'
          className='mt-1 block w-full p-2 bg-gray-700 text-white rounded-md border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
        />
      </div>

      <div className='flex justify-end space-x-3'>
        <button
          type='button'
          onClick={onClose}
          className='px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700'
        >
          Cancel
        </button>
        <button
          type='submit'
          className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default BusinessForm
