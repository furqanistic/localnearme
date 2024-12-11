import { axiosInstance } from '@/config'
import LoginRequiredModal from '@/Pages/Auth/LoginRequiredModal'
import {
  Award,
  Bell,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  Copy,
  Globe,
  Heart,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  QrCode,
  Share2,
  X,
} from 'lucide-react'
import React, { useState } from 'react'
import QRCode from 'react-qr-code'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

const ViewBusinessListing = ({ business }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showQRModal, setShowQRModal] = useState(false)
  const location = useLocation()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.user)
  const [showShareModal, setShowShareModal] = useState(false)
  const [copied, setCopied] = useState(false)
  const currentUrl = window.location.href
  // Subscription status query
  const { data: subscriptionStatus, isLoading: checkingSubscription } =
    useQuery(
      ['subscription', business._id],
      async () => {
        try {
          const response = await axiosInstance.get(
            '/subscriptions/my-subscriptions'
          )
          return response.data.data.subscriptions.some(
            (sub) => sub.business._id === business._id
          )
        } catch (error) {
          if (error.response?.status === 401) return false
          throw error
        }
      },
      {
        enabled: !!business._id && !!currentUser,
        retry: 1,
        initialData: false,
      }
    )

  // Subscribe mutation
  const subscribeMutation = useMutation(
    async () => {
      const response = await axiosInstance.post(
        `/subscriptions/businesses/${business._id}/subscribe`
      )
      return response.data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['subscription', business._id])
        queryClient.invalidateQueries(['business', business._id])
      },
    }
  )

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const ShareModal = () => {
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentUrl
      )}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        currentUrl
      )}&text=${encodeURIComponent(`Check out ${business.name}!`)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        currentUrl
      )}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(
        `Check out ${business.name}! ${currentUrl}`
      )}`,
    }

    return (
      <div className='fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4'>
        <div className='bg-gray-900 rounded-xl max-w-md w-full relative'>
          {/* Header */}
          <div className='border-b border-gray-700 p-4'>
            <div className='flex justify-between items-center'>
              <h3 className='text-xl font-semibold'>Share {business.name}</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className='text-gray-400 hover:text-white transition-colors'
              >
                <X className='w-6 h-6' />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className='p-6 space-y-6'>
            {/* Copy Link Section */}
            <div className='space-y-3'>
              <h4 className='text-sm font-medium text-gray-400'>Copy Link</h4>
              <div className='flex gap-2'>
                <div className='flex-1 bg-gray-800 rounded-lg px-4 py-2 text-sm truncate'>
                  {currentUrl}
                </div>
                <button
                  onClick={handleCopyLink}
                  className='bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-lg flex items-center gap-2 transition-colors'
                >
                  {copied ? (
                    <CheckCheck className='w-4 h-4' />
                  ) : (
                    <Copy className='w-4 h-4' />
                  )}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Social Share Section */}
            <div className='space-y-3'>
              <h4 className='text-sm font-medium text-gray-400'>
                Share on Social Media
              </h4>
              <div className='grid grid-cols-2 gap-3'>
                <a
                  href={shareUrls.facebook}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-3 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] p-3 rounded-lg transition-colors'
                >
                  <Share2 className='w-5 h-5' />
                  <span>Facebook</span>
                </a>
                <a
                  href={shareUrls.twitter}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-3 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] p-3 rounded-lg transition-colors'
                >
                  <MessageCircle className='w-5 h-5' />
                  <span>Twitter</span>
                </a>
                <a
                  href={shareUrls.linkedin}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-3 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2] p-3 rounded-lg transition-colors'
                >
                  <Linkedin className='w-5 h-5' />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={shareUrls.whatsapp}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] p-3 rounded-lg transition-colors'
                >
                  <MessageCircle className='w-5 h-5' />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Unsubscribe mutation
  const unsubscribeMutation = useMutation(
    async () => {
      const response = await axiosInstance.post(
        `/subscriptions/businesses/${business._id}/unsubscribe`
      )
      return response.data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['subscription', business._id])
        queryClient.invalidateQueries(['business', business._id])
      },
    }
  )

  const handleSubscribe = async () => {
    if (!currentUser) {
      setShowLoginModal(true)
      return
    }

    try {
      if (subscriptionStatus) {
        await unsubscribeMutation.mutateAsync()
      } else {
        await subscribeMutation.mutateAsync()
      }
    } catch (error) {
      console.error('Subscription error:', error)
    }
  }

  const handleFavorite = () => {
    if (!currentUser) {
      setShowLoginModal(true)
      return
    }
    // Add favorite logic here
  }

  const handleReview = () => {
    if (!currentUser) {
      setShowLoginModal(true)
      return
    }
    // Add review logic here
  }

  const QRModal = () => (
    <div className='fixed inset-0 bg-black/80 flex items-center justify-center z-50'>
      <div className='bg-gray-900 p-8 rounded-xl relative max-w-md w-full mx-4'>
        <button
          onClick={() => setShowQRModal(false)}
          className='absolute top-4 right-4 text-gray-400 hover:text-white'
        >
          <X className='w-6 h-6' />
        </button>
        <h3 className='text-xl font-semibold mb-6 text-white text-center'>
          Scan to Visit
        </h3>
        <div className='bg-white p-4 rounded-lg'>
          <QRCode value={currentUrl} className='w-full h-auto' />
        </div>
        <p className='text-sm text-gray-400 mt-4 text-center'>
          Scan this QR code to open this page on your mobile device
        </p>
      </div>
    </div>
  )

  if (checkingSubscription) {
    return (
      <div className='min-h-screen bg-[#141414] flex items-center justify-center'>
        <div className='w-8 h-8 border-t-2 border-b-2 border-blue-400 rounded-full animate-spin'></div>
      </div>
    )
  }

  return (
    <div className='bg-[#141414] text-gray-200 min-h-screen'>
      {/* Hero Section */}
      <div className='relative h-[80vh] w-full'>
        <div className='absolute inset-0'>
          <img
            src={business.images[currentImageIndex]}
            alt={business.name}
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-[#141414] via-black/50 to-transparent' />
        </div>

        {/* Navigation arrows */}
        <div className='absolute inset-0 flex items-center justify-between px-4'>
          <button
            onClick={() =>
              setCurrentImageIndex(
                (prev) =>
                  (prev - 1 + business.images.length) % business.images.length
              )
            }
            className='bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors'
          >
            <ChevronLeft className='w-6 h-6' />
          </button>
          <button
            onClick={() =>
              setCurrentImageIndex(
                (prev) => (prev + 1) % business.images.length
              )
            }
            className='bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors'
          >
            <ChevronRight className='w-6 h-6' />
          </button>
        </div>

        {/* Hero content */}
        <div className='absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto'>
          <div className='flex items-start justify-between'>
            <div>
              <h1 className='text-5xl font-bold text-white mb-4'>
                {business.name}
              </h1>
              <div className='flex items-center space-x-4 text-sm'>
                <span className='flex items-center'>
                  <MapPin className='w-4 h-4 mr-1' />
                  {business.address.city}, {business.address.country}
                </span>
                {business.isPremium && (
                  <span className='flex items-center text-yellow-400'>
                    <Award className='w-4 h-4 mr-1' />
                    Premium
                  </span>
                )}
              </div>
            </div>
            <div className='flex space-x-3'>
              <button
                onClick={() => setShowQRModal(true)}
                className='bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors'
              >
                <QrCode className='w-6 h-6' />
              </button>
              <button
                onClick={() => setShowShareModal(true)}
                className='bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors'
              >
                <Share2 className='w-6 h-6' />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Column */}
          <div className='lg:col-span-2 space-y-8'>
            {/* About Section */}
            <div className='bg-gray-900/50 backdrop-blur-sm rounded-xl p-8'>
              <h2 className='text-2xl font-semibold mb-6'>About</h2>
              <p className='text-gray-300 leading-relaxed'>
                {business.description}
              </p>

              <div className='grid grid-cols-2 gap-6 mt-8'>
                <div className='space-y-4'>
                  <h3 className='text-lg font-medium text-blue-400'>Contact</h3>
                  <div className='space-y-2'>
                    <p className='flex items-center'>
                      <Phone className='w-4 h-4 mr-2 text-gray-400' />
                      {business.phoneNumber}
                    </p>
                    <p className='flex items-center'>
                      <Mail className='w-4 h-4 mr-2 text-gray-400' />
                      {business.contactEmail}
                    </p>
                    {business.websiteUrl && (
                      <a
                        href={business.websiteUrl}
                        className='flex items-center text-blue-400 hover:text-blue-300'
                      >
                        <Globe className='w-4 h-4 mr-2' />
                        Visit Website
                      </a>
                    )}
                  </div>
                </div>

                <div className='space-y-4'>
                  <h3 className='text-lg font-medium text-blue-400'>
                    Location
                  </h3>
                  <p className='flex items-start'>
                    <MapPin className='w-4 h-4 mr-2 mt-1 text-gray-400' />
                    <span>
                      {business.address.street}, {business.address.city},
                      <br />
                      {business.address.state} {business.address.zipCode}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Hours Section */}
            <div className='bg-gray-900/50 backdrop-blur-sm rounded-xl p-8'>
              <h2 className='text-2xl font-semibold mb-6'>Opening Hours</h2>
              <div className='grid grid-cols-2 gap-4'>
                {business.openingHours.map((hours, index) => (
                  <div
                    key={index}
                    className='flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0'
                  >
                    <span className='font-medium text-blue-400'>
                      {hours.day}
                    </span>
                    <span>{`${hours.open} - ${hours.close}`}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags Section */}
            {business.tags && business.tags.length > 0 && (
              <div className='bg-gray-900/50 backdrop-blur-sm rounded-xl p-8'>
                <h2 className='text-2xl font-semibold mb-6'>Tags</h2>
                <div className='flex flex-wrap gap-2'>
                  {business.tags.map((tag, index) => (
                    <span
                      key={index}
                      className='bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Action Buttons */}
            <div className='bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 space-y-4'>
              <button
                onClick={handleSubscribe}
                disabled={
                  subscribeMutation.isLoading || unsubscribeMutation.isLoading
                }
                className={`w-full py-3 px-6 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  subscriptionStatus
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {subscribeMutation.isLoading ||
                unsubscribeMutation.isLoading ? (
                  <div className='flex items-center space-x-2'>
                    <div className='w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin' />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <>
                    <Bell className='w-5 h-5 mr-2' />
                    {subscriptionStatus ? 'Subscribed' : 'Subscribe'}
                  </>
                )}
              </button>

              <button
                onClick={handleFavorite}
                className='w-full bg-pink-600/20 text-pink-400 border border-pink-600/30 py-3 px-6 rounded-xl flex items-center justify-center hover:bg-pink-600/30 transition-colors'
              >
                <Heart className='w-5 h-5 mr-2' />
                Add to Favorites
              </button>

              {business.reviewSystem?.isActive && (
                <button
                  onClick={handleReview}
                  className='w-full bg-green-600/20 text-green-400 border border-green-600/30 py-3 px-6 rounded-xl flex items-center justify-center hover:bg-green-600/30 transition-colors'
                >
                  <MessageCircle className='w-5 h-5 mr-2' />
                  Write a Review
                </button>
              )}
            </div>

            {/* Business Stats */}
            <div className='bg-gray-900/50 backdrop-blur-sm rounded-xl p-6'>
              <h3 className='text-xl font-semibold mb-4'>Stats</h3>
              <div className='grid grid-cols-2 gap-4'>
                <div className='text-center p-4 bg-gray-800/50 rounded-lg'>
                  <p className='text-2xl font-bold text-blue-400'>
                    {business.subscriberCount}
                  </p>
                  <p className='text-sm text-gray-400'>Subscribers</p>
                </div>
                <div className='text-center p-4 bg-gray-800/50 rounded-lg'>
                  <p className='text-2xl font-bold text-pink-400'>
                    {business.favoriteCount}
                  </p>
                  <p className='text-sm text-gray-400'>Favorites</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showShareModal && <ShareModal />}
      {showQRModal && <QRModal />}
      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  )
}

export default ViewBusinessListing
