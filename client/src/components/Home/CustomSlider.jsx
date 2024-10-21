import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Globe,
  MapPin,
  Phone,
  Tag,
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

// Skeleton Loader Component
const SkeletonLoader = () => (
  <div className='bg-white shadow-lg rounded-lg overflow-hidden animate-pulse'>
    <div className='w-full h-48 sm:h-64 bg-gray-300'></div>
    <div className='p-4 space-y-2'>
      <div className='h-6 bg-gray-300 rounded w-3/4'></div>
      <div className='h-4 bg-gray-300 rounded w-1/2'></div>
      <div className='h-4 bg-gray-300 rounded w-2/3'></div>
      <div className='flex space-x-2'>
        <div className='h-6 bg-gray-300 rounded w-16'></div>
        <div className='h-6 bg-gray-300 rounded w-16'></div>
        <div className='h-6 bg-gray-300 rounded w-16'></div>
      </div>
      <div className='flex justify-between items-center'>
        <div className='h-4 bg-gray-300 rounded w-20'></div>
        <div className='h-4 bg-gray-300 rounded w-24'></div>
      </div>
    </div>
  </div>
)

// Updated CustomSlider Component
const CustomSlider = ({ business, isLoading }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageErrors, setImageErrors] = useState({})

  const images = [
    'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2762&q=80',
    'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=80',
    'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80',
  ]

  const nextSlide = (e) => {
    e.preventDefault()
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = (e) => {
    e.preventDefault()
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    )
  }

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length),
      5000
    )
    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return <SkeletonLoader />
  }

  return (
    <Link to={`/view-business/${business._id}`}>
      <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
        <div className='relative w-full h-48 sm:h-64 overflow-hidden'>
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`${business.name} - Image ${index + 1}`}
                className='w-full h-full object-cover'
                onError={(e) => {
                  console.error('Image failed to load:', image)
                  setImageErrors((prev) => ({ ...prev, [index]: true }))
                  e.target.onerror = null
                  e.target.src = '/api/placeholder/400/300'
                }}
              />
              {imageErrors[index] && (
                <div className='absolute inset-0 bg-red-100 flex items-center justify-center'>
                  <AlertCircle className='text-red-500 mr-2' />
                  <span className='text-red-500'>Image failed to load</span>
                </div>
              )}
            </div>
          ))}
          <button
            onClick={prevSlide}
            className='absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-1 transition-colors duration-300'
          >
            <ChevronLeft className='w-4 h-4 text-white' />
          </button>
          <button
            onClick={nextSlide}
            className='absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-1 transition-colors duration-300'
          >
            <ChevronRight className='w-4 h-4 text-white' />
          </button>
        </div>

        <div className='p-4 space-y-2'>
          <h2 className='text-xl font-semibold'>{business.name}</h2>
          <p className='text-sm text-gray-600'>{business.type}</p>

          <div className='flex items-center text-sm'>
            <MapPin className='w-4 h-4 mr-1 text-gray-500' />
            <span>{`${business.address.city}, ${business.address.state}`}</span>
          </div>

          {business.tags && business.tags.length > 0 && (
            <div className='flex flex-wrap gap-1'>
              {business.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className='bg-gray-200 px-2 py-1 rounded-full text-xs flex items-center'
                >
                  <Tag className='w-3 h-3 mr-1' />
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className='flex justify-between items-center'>
            {business.websiteUrl && (
              <a
                href={business.websiteUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-600 hover:underline text-sm flex items-center'
                onClick={(e) => e.stopPropagation()}
              >
                <Globe className='w-4 h-4 mr-1' />
                Website
              </a>
            )}
            {business.phoneNumber && (
              <span className='text-sm flex items-center'>
                <Phone className='w-4 h-4 mr-1 text-gray-500' />
                {business.phoneNumber}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CustomSlider
