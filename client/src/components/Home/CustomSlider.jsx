import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Globe,
  MapPin,
  Phone,
  Star,
  Tag,
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const SkeletonLoader = () => (
  <div className='bg-white shadow-lg rounded-xl overflow-hidden animate-pulse'>
    <div className='w-full h-52 bg-gray-300'></div>
    <div className='p-4 space-y-2'>
      <div className='h-6 bg-gray-300 rounded-full w-3/4'></div>
      <div className='h-4 bg-gray-300 rounded-full w-1/2'></div>
      <div className='flex gap-2'>
        {[1, 2, 3].map((i) => (
          <div key={i} className='h-6 bg-gray-300 rounded-full w-16'></div>
        ))}
      </div>
    </div>
  </div>
)

const CustomSlider = ({ business, isLoading }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageErrors, setImageErrors] = useState({})
  const [isHovered, setIsHovered] = useState(false)
  const [touchStart, setTouchStart] = useState(null)

  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }))
  }

  const nextSlide = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (business.images?.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % business.images.length)
    }
  }

  const prevSlide = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (business.images?.length > 0) {
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex - 1 + business.images.length) % business.images.length
      )
    }
  }

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e) => {
    if (!touchStart) return
    const touchEnd = e.touches[0].clientX
    const diff = touchStart - touchEnd
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
      setTouchStart(null)
    }
  }

  useEffect(() => {
    if (!isHovered && business.images?.length > 1) {
      const interval = setInterval(nextSlide, 5000)
      return () => clearInterval(interval)
    }
  }, [isHovered, business.images])

  if (isLoading) {
    return <SkeletonLoader />
  }

  return (
    <Link to={`/view-business/${business._id}`} className='block'>
      <div
        className='bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group max-w-sm mx-auto h-[400px] flex flex-col'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className='relative w-full h-52 overflow-hidden'
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10'></div>

          {business.images?.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentIndex
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-105'
              }`}
            >
              {!imageErrors[index] ? (
                <img
                  src={image}
                  alt={`${business.name} - Image ${index + 1}`}
                  className='w-full h-full object-cover'
                  onError={() => handleImageError(index)}
                />
              ) : (
                <img
                  src='https://client.bisstek.com/assets/img/blog/AI5.jpg'
                  alt='Fallback'
                  className='w-full h-full object-cover'
                />
              )}
            </div>
          ))}

          {business.images?.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className='absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-1.5 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 md:block hidden'
                aria-label='Previous image'
              >
                <ChevronLeft className='w-4 h-4 text-gray-800' />
              </button>
              <button
                onClick={nextSlide}
                className='absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-1.5 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 md:block hidden'
                aria-label='Next image'
              >
                <ChevronRight className='w-4 h-4 text-gray-800' />
              </button>
            </>
          )}

          {business.images?.length > 1 && (
            <div className='absolute top-2 right-2 z-20 bg-black/70 text-white px-2 py-0.5 rounded-full text-xs backdrop-blur-sm'>
              {currentIndex + 1} / {business.images.length}
            </div>
          )}

          {business.images?.length > 1 && (
            <div className='absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-20'>
              {business.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setCurrentIndex(index)
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-white scale-110'
                      : 'bg-white/60 hover:bg-white/80'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className='p-4 flex-1 flex flex-col'>
          <div className='flex justify-between items-start mb-2'>
            <div>
              <h2 className='text-lg font-semibold text-gray-800 line-clamp-1'>
                {business.name}
              </h2>
              <p className='text-sm text-gray-600 line-clamp-1'>
                {business.type}
              </p>
            </div>
            <div className='flex items-center bg-green-50 px-2 py-0.5 rounded-full'>
              <Star className='w-3 h-3 text-yellow-500 mr-1' />
              <span className='text-xs font-medium text-gray-700'>4.5</span>
            </div>
          </div>

          <div className='flex items-center text-sm text-gray-600 mb-2'>
            <MapPin className='w-4 h-4 mr-1 text-gray-500 flex-shrink-0' />
            <span className='line-clamp-1'>{`${business.address.city}, ${business.address.state}`}</span>
          </div>

          {business.tags && business.tags.length > 0 && (
            <div className='flex flex-wrap gap-1 mb-2'>
              {business.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className='bg-gray-50 px-2 py-0.5 rounded-full text-xs text-gray-600 flex items-center'
                >
                  <Tag className='w-3 h-3 mr-1 text-gray-400' />
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className='flex justify-between items-center mt-auto pt-2 border-t border-gray-100'>
            {business.websiteUrl && (
              <a
                href={business.websiteUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center text-blue-600 hover:text-blue-700 text-sm'
                onClick={(e) => e.stopPropagation()}
              >
                <Globe className='w-4 h-4 mr-1' />
                Website
              </a>
            )}
            {business.phoneNumber && (
              <a
                href={`tel:${business.phoneNumber}`}
                className='flex items-center text-gray-600 hover:text-gray-800 text-sm'
                onClick={(e) => e.stopPropagation()}
              >
                <Phone className='w-4 h-4 mr-1' />
                {business.phoneNumber}
              </a>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CustomSlider
