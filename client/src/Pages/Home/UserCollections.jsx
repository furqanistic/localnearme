import Navigationbar from '@/components/Layout/NavigationBar'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { axiosInstance } from '@/config'
import {
  Bell,
  ChevronRight,
  ExternalLink,
  Heart,
  Mail,
  MapPin,
  Phone,
  Search,
  Star,
  Store,
  X,
} from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

const UserCollections = () => {
  const [activeTab, setActiveTab] = useState('subscriptions')
  const [unsubscribeDialog, setUnsubscribeDialog] = useState({
    isOpen: false,
    businessId: null,
    businessName: '',
  })

  const {
    data: subscriptions,
    isLoading: loadingSubscriptions,
    refetch: refetchSubscriptions,
  } = useQuery('my-subscriptions', async () => {
    const response = await axiosInstance.get('/subscriptions/my-subscriptions')
    return response.data.data.subscriptions
  })

  const {
    data: favorites,
    isLoading: loadingFavorites,
    refetch: refetchFavorites,
  } = useQuery('my-favorites', async () => {
    const response = await axiosInstance.get('/users/favorites')
    return response.data.data.favorites
  })

  const handleUnsubscribeConfirm = async () => {
    try {
      await axiosInstance.post(
        `/subscriptions/businesses/${unsubscribeDialog.businessId}/unsubscribe`
      )
      toast.success('Successfully unsubscribed')
      refetchSubscriptions()
      setUnsubscribeDialog({
        isOpen: false,
        businessId: null,
        businessName: '',
      })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to unsubscribe')
    }
  }

  const handleRemoveFavorite = async (businessId) => {
    try {
      await axiosInstance.post(`/users/favorites/${businessId}/remove`)
      toast.success('Removed from favorites')
      refetchFavorites()
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to remove from favorites'
      )
    }
  }

  const EmptyState = ({ type }) => (
    <div className='relative overflow-hidden'>
      <div className='relative p-8 text-center'>
        <div className='mb-6'>
          {type === 'subscriptions' ? (
            <div className='w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
              <Bell className='w-12 h-12 text-white' />
            </div>
          ) : (
            <div className='w-24 h-24 mx-auto bg-gradient-to-br from-pink-500 to-red-600 rounded-full flex items-center justify-center'>
              <Heart className='w-12 h-12 text-white' />
            </div>
          )}
        </div>

        <h3 className='text-2xl font-bold text-white mb-4'>
          {type === 'subscriptions'
            ? 'No Subscriptions Yet'
            : 'No Favorites Yet'}
        </h3>

        <p className='text-gray-300 mb-8 max-w-md mx-auto'>
          {type === 'subscriptions'
            ? "Stay updated with your favorite businesses by subscribing to them. You'll receive the latest updates and special offers."
            : 'Start building your collection of favorite businesses. Save the places you love for quick access.'}
        </p>

        <Link
          to='/local-guide'
          className='inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium transition-transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25'
        >
          <Search className='w-5 h-5 mr-2' />
          Explore Businesses
          <ChevronRight className='w-5 h-5 ml-2' />
        </Link>
      </div>
    </div>
  )

  const BusinessCard = ({ business, type }) => (
    <div className='group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10'>
      <div className='relative h-48 overflow-hidden'>
        <img
          src={business.images[0]}
          alt={business.name}
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent' />

        <div className='absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
          {type === 'subscription' ? (
            <button
              onClick={() =>
                setUnsubscribeDialog({
                  isOpen: true,
                  businessId: business._id,
                  businessName: business.name,
                })
              }
              className='p-2 bg-red-500/90 backdrop-blur-sm rounded-full text-white hover:bg-red-600 transition-all hover:scale-110'
            >
              <X size={16} />
            </button>
          ) : (
            <button
              onClick={() => handleRemoveFavorite(business._id)}
              className='p-2 bg-red-500/90 backdrop-blur-sm rounded-full text-white hover:bg-red-600 transition-all hover:scale-110'
            >
              <X size={16} />
            </button>
          )}
        </div>

        {business.isPremium && (
          <div className='absolute top-4 left-4'>
            <div className='px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-xs font-bold text-black flex items-center gap-1'>
              <Star size={12} />
              PREMIUM
            </div>
          </div>
        )}
      </div>

      <div className='p-6 space-y-4'>
        <div className='flex items-start justify-between'>
          <div>
            <h3 className='text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors'>
              {business.name}
            </h3>
            <p className='text-gray-400 text-sm flex items-center'>
              <Store size={14} className='mr-1.5' />
              {business.type}
            </p>
          </div>
          <div className='flex items-center bg-blue-500/10 px-2 py-1 rounded-lg'>
            <Star size={14} className='text-yellow-500 mr-1' />
            <span className='text-sm font-medium text-blue-400'>
              {business.minimumReviewFilter}
            </span>
          </div>
        </div>

        <div className='space-y-2'>
          <p className='text-sm text-gray-400 flex items-center'>
            <MapPin size={14} className='mr-2 flex-shrink-0' />
            <span className='truncate'>{`${business.address.city}, ${business.address.country}`}</span>
          </p>
          {business.phoneNumber && (
            <p className='text-sm text-gray-400 flex items-center'>
              <Phone size={14} className='mr-2' />
              {business.phoneNumber}
            </p>
          )}
          {business.contactEmail && (
            <p className='text-sm text-gray-400 flex items-center'>
              <Mail size={14} className='mr-2' />
              <span className='truncate'>{business.contactEmail}</span>
            </p>
          )}
        </div>

        {business.tags && business.tags.length > 0 && (
          <div className='flex flex-wrap gap-2'>
            {business.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className='text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20'
              >
                {tag}
              </span>
            ))}
            {business.tags.length > 3 && (
              <span className='text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20'>
                +{business.tags.length - 3}
              </span>
            )}
          </div>
        )}

        <Link
          to={`/view-business/${business._id}`}
          className='mt-4 block w-full text-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02] flex items-center justify-center'
        >
          View Details
          <ExternalLink size={16} className='ml-2' />
        </Link>
      </div>
    </div>
  )

  return (
    <>
      <Navigationbar />
      <div className='min-h-screen bg-[#141414] py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto relative z-10'>
          <div className='mb-12'>
            <h1 className='text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400'>
              My Collections
            </h1>
            <p className='text-gray-400'>
              Manage your subscribed and favorite businesses all in one place
            </p>
          </div>

          <div className='flex space-x-2 p-1 mb-12 max-w-md bg-gray-800/50 backdrop-blur-sm rounded-2xl'>
            <button
              onClick={() => setActiveTab('subscriptions')}
              className={`flex-1 py-3 px-6 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                activeTab === 'subscriptions'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <Bell size={18} />
              Subscriptions
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex-1 py-3 px-6 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                activeTab === 'favorites'
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-purple-500/25'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <Heart size={18} />
              Favorites
            </button>
          </div>

          {activeTab === 'subscriptions' ? (
            <div>
              {loadingSubscriptions ? (
                <div className='flex items-center justify-center h-64'>
                  <div className='relative'>
                    <div className='w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin' />
                    <div className='w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin absolute inset-0 rotate-45' />
                  </div>
                </div>
              ) : !subscriptions || subscriptions.length === 0 ? (
                <EmptyState type='subscriptions' />
              ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                  {subscriptions.map((subscription) => (
                    <BusinessCard
                      key={subscription.business._id}
                      business={subscription.business}
                      type='subscription'
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              {loadingFavorites ? (
                <div className='flex items-center justify-center h-64'>
                  <div className='relative'>
                    <div className='w-12 h-12 border-4 border-pink-400 border-t-transparent rounded-full animate-spin' />
                    <div className='w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin absolute inset-0 rotate-45' />
                  </div>
                </div>
              ) : !favorites || favorites.length === 0 ? (
                <EmptyState type='favorites' />
              ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                  {favorites.map((favorite) => (
                    <BusinessCard
                      key={favorite._id}
                      business={favorite}
                      type='favorite'
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          <AlertDialog
            open={unsubscribeDialog.isOpen}
            onOpenChange={(isOpen) =>
              setUnsubscribeDialog((prev) => ({ ...prev, isOpen }))
            }
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Unsubscribe</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to unsubscribe from{' '}
                  {unsubscribeDialog.businessName}? You will no longer receive
                  updates from this business.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleUnsubscribeConfirm}>
                  Unsubscribe
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </>
  )
}

export default UserCollections
