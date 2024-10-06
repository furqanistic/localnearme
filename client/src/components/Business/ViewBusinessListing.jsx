import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Clock,
  Globe,
  Heart,
  Mail,
  MapPin,
  Phone,
  Share2,
  Star,
  Tag,
} from 'lucide-react'
import React, { useState } from 'react'

const ViewBusinessListing = ({ business }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % business.images.length
    )
  }

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + business.images.length) % business.images.length
    )
  }
  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed)
    // Here you would typically make an API call to update the subscription status
  }

  return (
    <div className='bg-[#141414] text-gray-200 min-h-screen'>
      <div className='max-w-7xl mx-auto px-4 py-12'>
        <h1 className='text-4xl font-bold mb-8 text-white'>{business.name}</h1>

        {/* Image Carousel */}
        <div className='relative w-full h-[70vh] mb-12 rounded-xl overflow-hidden'>
          {business.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${business.name} - Image ${index + 1}`}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'></div>
          <button
            onClick={prevImage}
            className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full p-3 transition-colors duration-300'
          >
            <ChevronLeft className='w-6 h-6 text-white' />
          </button>
          <button
            onClick={nextImage}
            className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full p-3 transition-colors duration-300'
          >
            <ChevronRight className='w-6 h-6 text-white' />
          </button>
        </div>

        {/* Business Info */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
          <div className='lg:col-span-2 space-y-8'>
            <div className='bg-gray-900 rounded-xl p-8 shadow-lg'>
              <h2 className='text-3xl font-semibold mb-6 text-white'>
                About {business.name}
              </h2>
              <p className='text-gray-300 mb-6 leading-relaxed'>
                {business.description}
              </p>
              <div className='space-y-4'>
                <div className='flex items-center'>
                  <MapPin className='w-5 h-5 mr-3 text-blue-400' />
                  <span>{`${business.address.street}, ${business.address.city}, ${business.address.state} ${business.address.zipCode}, ${business.address.country}`}</span>
                </div>
                <div className='flex items-center'>
                  <Phone className='w-5 h-5 mr-3 text-blue-400' />
                  <span>{business.phoneNumber}</span>
                </div>
                {business.websiteUrl && (
                  <div className='flex items-center'>
                    <Globe className='w-5 h-5 mr-3 text-blue-400' />
                    <a
                      href={business.websiteUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-400 hover:text-blue-300 transition-colors'
                    >
                      Visit Website
                    </a>
                  </div>
                )}
                <div className='flex items-center'>
                  <Mail className='w-5 h-5 mr-3 text-blue-400' />
                  <span>{business.contactEmail}</span>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className='bg-gray-900 rounded-xl p-8 shadow-lg'>
              <h2 className='text-3xl font-semibold mb-6 text-white'>
                Opening Hours
              </h2>
              <ul className='space-y-2'>
                {business.openingHours.map((hours, index) => (
                  <li
                    key={index}
                    className='flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0'
                  >
                    <span className='font-medium text-blue-400'>
                      {hours.day}
                    </span>
                    <span>{`${hours.open} - ${hours.close}`}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            {business.tags && business.tags.length > 0 && (
              <div className='bg-gray-900 rounded-xl p-8 shadow-lg'>
                <h2 className='text-3xl font-semibold mb-6 text-white'>Tags</h2>
                <div className='flex flex-wrap gap-3'>
                  {business.tags.map((tag, index) => (
                    <span
                      key={index}
                      className='bg-blue-600 text-white px-4 py-2 rounded-full text-sm flex items-center'
                    >
                      <Tag className='w-4 h-4 mr-2' />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className='space-y-8'>
            <div className='bg-gray-900 rounded-xl p-8 shadow-lg'>
              <h2 className='text-3xl font-semibold mb-6 text-white'>
                Business Details
              </h2>
              <div className='space-y-4'>
                <p>
                  <strong className='text-blue-400'>Type:</strong>{' '}
                  {business.type}
                </p>
                <p>
                  <strong className='text-blue-400'>Subscribers:</strong>{' '}
                  {business.subscriberCount}
                </p>
                <p>
                  <strong className='text-blue-400'>Favorites:</strong>{' '}
                  {business.favoriteCount}
                </p>
                {business.isPremium && (
                  <p className='text-yellow-400 font-semibold mt-4'>
                    Premium Business
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className='space-y-4'>
              <button
                onClick={handleSubscribe}
                className={`w-full py-3 px-6 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                  isSubscribed
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                <Bell className='w-5 h-5 mr-3' />
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
              </button>
              <button className='w-full bg-pink-600 text-white py-3 px-6 rounded-xl flex items-center justify-center hover:bg-pink-700 transition-colors duration-300'>
                <Heart className='w-5 h-5 mr-3' />
                Add to Favorites
              </button>
              <button className='w-full bg-purple-600 text-white py-3 px-6 rounded-xl flex items-center justify-center hover:bg-purple-700 transition-colors duration-300'>
                <Share2 className='w-5 h-5 mr-3' />
                Share
              </button>
              {business.googleReviewsUrl && (
                <a
                  href={business.googleReviewsUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='w-full bg-yellow-700 text-white py-3 px-6 rounded-xl flex items-center justify-center hover:bg-yellow-800 transition-colors duration-300'
                >
                  <Star className='w-5 h-5 mr-3' />
                  Google Reviews
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewBusinessListing
