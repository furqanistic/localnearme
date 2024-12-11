import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  createBusiness,
  fetchbusiness,
  updateBusiness,
} from '../components/business/apiServiceBusiness'
import OpeningHours from '../components/business/OpeningHours'
import Header from '../components/common/Header'

const filterOptions = [
  { id: 1, name: 'Groceries', icon: '🛒' },
  { id: 2, name: 'Restaurants', icon: '🍽️' },
  { id: 3, name: 'Plumbers', icon: '🔧' },
  { id: 4, name: 'Pet Stores', icon: '🐶' },
  { id: 5, name: 'Florists', icon: '💐' },
  { id: 6, name: 'Gyms', icon: '💪' },
  { id: 7, name: 'Parks', icon: '🌳' },
  { id: 8, name: 'Beaches', icon: '🏖️' },
  { id: 9, name: 'Cafes', icon: '☕' },
  { id: 10, name: 'Bakeries', icon: '🍰' },
  { id: 11, name: 'Salons', icon: '💇‍♀️' },
  { id: 12, name: 'Pharmacies', icon: '💊' },
  { id: 13, name: 'Libraries', icon: '📚' },
  { id: 14, name: 'Hospitals', icon: '🏥' },
  { id: 15, name: 'Clothing Stores', icon: '👗' },
  { id: 16, name: 'Electronics Stores', icon: '💻' },
  { id: 17, name: 'Bookstores', icon: '📖' },
  { id: 18, name: 'Convenience Stores', icon: '🛍️' },
  { id: 19, name: 'Massage Parlors', icon: '💆‍♂️' },
  { id: 20, name: 'Auto Repair', icon: '🔧' },
  { id: 21, name: 'Health Services', icon: '🏥' },
  { id: 22, name: 'Beauty & Wellness', icon: '💄' },
  { id: 23, name: 'Fitness Centers', icon: '🏋️‍♂️' },
  { id: 24, name: 'Educational Services', icon: '🎓' },
  { id: 25, name: 'Home Services', icon: '🏠' },
]

const defaultFormData = {
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
  tags: [],
  openingHours: {
    monday: { open: '', close: '' },
    tuesday: { open: '', close: '' },
    wednesday: { open: '', close: '' },
    thursday: { open: '', close: '' },
    friday: { open: '', close: '' },
    saturday: { open: '', close: '' },
    sunday: { open: '', close: '' },
  },
  socialMedia: {
    facebook: '',
    instagram: '',
    twitter: '',
  },
}

const BusinessFormPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const queryClient = useQueryClient()

  const [formData, setFormData] = useState(defaultFormData)

  const { isLoading, isError, error } = useQuery(
    ['business', id],
    () => fetchbusiness(id),
    {
      enabled: !!id,
      onSuccess: (data) => {
        setFormData({
          ...defaultFormData,
          ...data,
          address: {
            ...defaultFormData.address,
            ...(data.address || {}),
          },
          tags: data.tags || [],
          socialMedia: {
            ...defaultFormData.socialMedia,
            ...(data.socialMedia || {}),
          },
          openingHours: {
            ...defaultFormData.openingHours,
            ...(data.openingHours || {}),
          },
        })
      },
    }
  )
  const createBusinessMutation = useMutation(createBusiness, {
    onSuccess: () => {
      queryClient.invalidateQueries('businesses')
      navigate('/business')
    },
  })

  const updateBusinessMutation = useMutation(
    (data) => updateBusiness(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('businesses')
        navigate('/business')
      },
    }
  )

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleTagChange = (tagId) => {
    setFormData((prevData) => {
      const updatedTags = prevData.tags.includes(tagId)
        ? prevData.tags.filter((id) => id !== tagId)
        : [...prevData.tags, tagId]
      return { ...prevData, tags: updatedTags }
    })
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

  const handleSocialMediaChange = (platform, value) => {
    setFormData((prevData) => ({
      ...prevData,
      socialMedia: {
        ...prevData.socialMedia,
        [platform]: value,
      },
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const submissionData = {
      ...formData,
      tags: formData.tags,
    }

    if (id) {
      updateBusinessMutation.mutate(submissionData)
    } else {
      createBusinessMutation.mutate(submissionData)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  return (
    <div className='flex-1 relative z-10 overflow-auto'>
      <Header title={'Add Business'} />
      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        <form onSubmit={handleSubmit} className='space-y-4 w-full'>
          <Link to='/business'>
            <div className='flex center items-center'>
              <ChevronLeft size={24} />
              <p className='text-xl'>Back</p>
            </div>
          </Link>
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
        </form>

        <div>
          <label className='block text-sm font-medium text-gray-300'>
            Tags
          </label>
          <div className='mt-2 space-y-2'>
            {filterOptions.map((option) => (
              <label key={option.id} className='inline-flex items-center mr-4'>
                <input
                  type='checkbox'
                  checked={formData.tags.includes(option.id)}
                  onChange={() => handleTagChange(option.id)}
                  className='form-checkbox h-5 w-5 text-indigo-600'
                />
                <span className='ml-2 text-gray-300'>
                  {option.icon} {option.name}
                </span>
              </label>
            ))}
          </div>
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
          <label
            htmlFor='isPremium'
            className='ml-2 block text-sm text-gray-300'
          >
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

        {/* Opening Hours */}
        <OpeningHours formData={formData} setFormData={setFormData} />

        {/* Social Media */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          {Object.entries(formData.socialMedia).map(([platform, url]) => (
            <div key={platform}>
              <label className='block text-sm font-medium text-gray-300 capitalize'>
                {platform}
              </label>
              <input
                type='url'
                value={url}
                onChange={(e) =>
                  handleSocialMediaChange(platform, e.target.value)
                }
                placeholder={`${
                  platform.charAt(0).toUpperCase() + platform.slice(1)
                } URL`}
                className='mt-1 block w-full p-2 bg-gray-700 text-white rounded-md border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
              />
            </div>
          ))}
        </div>

        <div className='flex justify-end space-x-3'>
          <button
            type='button'
            onClick={() => navigate('/business')}
            className='px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
            disabled={
              createBusinessMutation.isLoading ||
              updateBusinessMutation.isLoading
            }
          >
            {id ? 'Update' : 'Save'}
          </button>
        </div>
      </main>
    </div>
  )
}

export default BusinessFormPage
