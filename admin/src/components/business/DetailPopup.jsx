import { motion } from 'framer-motion'
import {
  ChevronDown,
  ChevronUp,
  Clock,
  DollarSign,
  ExternalLink,
  Globe,
  Heart,
  Mail,
  MapPin,
  Star,
  Tag,
  Users,
  X,
} from 'lucide-react'
import React, { useState } from 'react'

const DetailPopup = ({ business, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({})

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-y-auto backdrop-blur-sm'
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className='bg-gray-800 rounded-lg p-6 w-full max-w-3xl shadow-2xl border border-gray-700 relative max-h-[90vh] overflow-y-auto'
      >
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors duration-200'
        >
          <X size={24} />
        </button>

        <h2 className='text-2xl font-bold text-gray-100 mb-4 pr-8'>
          {business.name}
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
          <InfoSection icon={MapPin} title='Address'>
            <p className='text-sm text-gray-300'>
              {`${business.address.street}, ${business.address.city}, ${business.address.state}, ${business.address.country} ${business.address.zipCode}`}
            </p>
          </InfoSection>

          <InfoSection icon={Mail} title='Contact'>
            <p className='text-sm text-gray-300'>{business.contactEmail}</p>
            <p className='text-sm text-gray-300'>{business.phoneNumber}</p>
          </InfoSection>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
          <InfoSection icon={Globe} title='Online Presence'>
            <OnlineLink href={business.websiteUrl} text='Website' />
            <OnlineLink href={business.googleMapsUrl} text='Google Maps' />
            <OnlineLink
              href={business.googleReviewsUrl}
              text='Google Reviews'
            />
          </InfoSection>

          <InfoSection icon={Clock} title='Opening Hours'>
            <ExpandableContent
              content={business.openingHours}
              renderItem={(hours, index) => (
                <p key={index} className='text-sm text-gray-300'>
                  {`${hours.day}: ${hours.open} - ${hours.close}`}
                </p>
              )}
              expanded={expandedSections.hours}
              toggle={() => toggleSection('hours')}
            />
          </InfoSection>
        </div>

        <InfoSection icon={Tag} title='Tags'>
          <ExpandableContent
            content={business.tags}
            renderItem={(tag, index) => (
              <span
                key={index}
                className='bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs mr-2 mb-2 inline-block'
              >
                {tag}
              </span>
            )}
            expanded={expandedSections.tags}
            toggle={() => toggleSection('tags')}
          />
        </InfoSection>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
          <InfoSection icon={Star} title='Review System'>
            <p className='text-sm text-gray-300'>
              Minimum Rating: {business.reviewSystem.minimumRating}
            </p>
            <p className='text-sm text-gray-300'>
              Monthly Quota: {business.reviewSystem.monthlyQuota}
            </p>
            <p className='text-sm text-gray-300'>
              Used Quota: {business.reviewSystem.usedQuota}
            </p>
          </InfoSection>

          <InfoSection icon={Users} title='Digital Flyer'>
            <p className='text-sm text-gray-300'>
              Active: {business.digitalFlyer.isActive ? 'Yes' : 'No'}
            </p>
            <p className='text-sm text-gray-300'>
              Subscriber Count: {business.digitalFlyer.subscriberCount}
            </p>
            <p className='text-sm text-gray-300'>
              Monthly Quota: {business.digitalFlyer.monthlyQuota}
            </p>
            <p className='text-sm text-gray-300'>
              Used Quota: {business.digitalFlyer.usedQuota}
            </p>
          </InfoSection>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
          <InfoSection icon={Heart} title='Engagement'>
            <p className='text-sm text-gray-300'>
              Subscribers: {business.subscriberCount}
            </p>
            <p className='text-sm text-gray-300'>
              Favorites: {business.favoriteCount}
            </p>
          </InfoSection>

          <InfoSection icon={DollarSign} title='Membership'>
            <p className='text-sm text-gray-300'>
              Premium: {business.isPremium ? 'Yes' : 'No'}
            </p>
          </InfoSection>
        </div>

        {business.menu && (
          <div className='mb-4'>
            <h3 className='text-lg font-semibold text-gray-200 mb-2'>Menu</h3>
            <a
              href={business.menu}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-400 hover:text-blue-300 flex items-center'
            >
              View Menu PDF <ExternalLink size={16} className='ml-2' />
            </a>
          </div>
        )}

        {business.images && business.images.length > 0 && (
          <div className='mb-4'>
            <h3 className='text-lg font-semibold text-gray-200 mb-2'>Images</h3>
            <ExpandableContent
              content={business.images}
              renderItem={(image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Business image ${index + 1}`}
                  className='w-24 h-24 object-cover rounded-lg inline-block mr-2 mb-2'
                />
              )}
              expanded={expandedSections.images}
              toggle={() => toggleSection('images')}
            />
          </div>
        )}

        <button
          onClick={onClose}
          className='mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200'
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  )
}

const InfoSection = ({ icon: Icon, title, children }) => (
  <div className='mb-4'>
    <h3 className='text-sm font-semibold text-gray-200 mb-2 flex items-center'>
      <Icon size={16} className='mr-2 text-blue-400' /> {title}
    </h3>
    {children}
  </div>
)

const OnlineLink = ({ href, text }) => (
  <a
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    className='text-sm text-blue-400 hover:text-blue-300 flex items-center mb-1'
  >
    {text} <ExternalLink size={12} className='ml-1' />
  </a>
)

const ExpandableContent = ({ content, renderItem, expanded, toggle }) => {
  const displayContent = expanded ? content : content.slice(0, 3)

  return (
    <>
      {displayContent.map(renderItem)}
      {content.length > 3 && (
        <button
          onClick={toggle}
          className='text-blue-400 hover:text-blue-300 text-sm flex items-center mt-1'
        >
          {expanded ? (
            <>
              Show Less <ChevronUp size={14} className='ml-1' />
            </>
          ) : (
            <>
              Show More ({content.length - 3} more){' '}
              <ChevronDown size={14} className='ml-1' />
            </>
          )}
        </button>
      )}
    </>
  )
}

export default DetailPopup
