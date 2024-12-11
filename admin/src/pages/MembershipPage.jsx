import { axiosInstance } from '@/config'
import { getStripe } from '@/utils/strips'
import { loadStripe } from '@stripe/stripe-js'
import { motion } from 'framer-motion'
import {
  AlertCircle,
  ArrowRight,
  Check,
  Rocket,
  Star,
  X,
  Zap,
} from 'lucide-react'
import React, { useEffect, useState } from 'react'

// Initialize Stripe

const MembershipPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('basic')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentSubscription, setCurrentSubscription] = useState(null)
  const [error, setError] = useState(null)

  // Fetch current subscription on component mount
  // Fetch current subscription on component mount
  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const { data } = await axiosInstance.get('/subscriptions/status')
        if (data.subscription) {
          setCurrentSubscription(data.subscription)
          setSelectedPlan(data.subscription.subscriptionPlan)
        }
      } catch (error) {
        console.error('Error fetching subscription:', error)
        setError(
          error.response?.data?.message || 'Failed to load subscription status'
        )
      }
    }

    fetchSubscription()
  }, [])

  const plans = [
    {
      id: 'starter',
      name: 'Free',
      description: 'Perfect for getting started',
      price: 0,
      stripePriceId: import.meta.env.VITE_STRIPE_PRICE_STARTER,
      icon: Star,
      color: 'from-gray-400 to-gray-500',
      features: [
        '50 digital flyers per month',
        'Basic analytics',
        'Standard support',
        'Basic templates',
      ],
    },
    {
      id: 'standard',
      name: 'Basic',
      description: 'Great for growing businesses',
      price: 19.99,
      stripePriceId: import.meta.env.VITE_STRIPE_PRICE_STANDARD,
      icon: Zap,
      color: 'from-blue-400 to-blue-500',
      popular: true,
      features: [
        '200 digital flyers per month',
        'Advanced analytics',
        'Priority support',
        'Premium templates',
        'Custom branding',
        'API access',
      ],
    },
    {
      id: 'business',
      name: 'Pro',
      description: 'For power users and teams',
      price: 49.99,
      stripePriceId: import.meta.env.VITE_STRIPE_PRICE_BUSINESS,
      icon: Rocket,
      color: 'from-purple-400 to-purple-500',
      features: [
        'Unlimited digital flyers',
        'Complete analytics suite',
        '24/7 priority support',
        'All templates',
        'White-label option',
        'API access',
        'Team collaboration',
        'Custom integrations',
      ],
    },
  ]

  const handleSubscribe = async (planId) => {
    try {
      setIsProcessing(true)
      setError(null)

      const selectedPlan = plans.find((plan) => plan.id === planId)
      if (!selectedPlan) {
        throw new Error('Invalid plan selected')
      }

      const { data } = await axiosInstance.post(
        '/subscriptions/create-checkout-session',
        {
          planId,
          priceId: selectedPlan.stripePriceId,
        }
      )

      // Get Stripe instance
      const stripe = await getStripe()

      // Redirect to checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      })

      if (error) {
        setError(error.message)
      }
    } catch (error) {
      console.error('Error:', error)
      setError(
        error.response?.data?.message || 'Failed to process subscription'
      )
    } finally {
      setIsProcessing(false)
      setShowConfirmation(false)
    }
  }

  const PlanCard = ({ plan }) => {
    const isCurrentPlan = currentSubscription?.subscriptionPlan === plan.id
    const isFreePlan = plan.price === 0

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative flex flex-col h-full bg-gray-800/50 backdrop-blur-sm rounded-2xl border 
          ${
            selectedPlan === plan.id
              ? 'border-blue-500 shadow-lg shadow-blue-500/10'
              : 'border-gray-700/50 hover:border-gray-600/50'
          } transition-all duration-300`}
      >
        {plan.popular && (
          <div className='absolute top-4 right-4'>
            <span className='px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full'>
              Most Popular
            </span>
          </div>
        )}

        <div className='flex-1 p-6'>
          {/* Plan Header */}
          <div className='flex items-center space-x-3'>
            <div className={`p-2 rounded-xl bg-gradient-to-br ${plan.color}`}>
              <plan.icon className='w-5 h-5 text-white' />
            </div>
            <div>
              <h3 className='text-lg font-medium text-white'>{plan.name}</h3>
              <p className='text-sm text-gray-400'>{plan.description}</p>
            </div>
          </div>

          {/* Price */}
          <div className='mt-6'>
            <div className='flex items-baseline'>
              <span className='text-3xl font-bold text-white'>
                ${plan.price}
              </span>
              <span className='ml-2 text-gray-400'>/month</span>
            </div>
          </div>

          {/* Features */}
          <div className='mt-6 space-y-3'>
            {plan.features.map((feature, index) => (
              <div key={index} className='flex items-start'>
                <Check className='w-4 h-4 text-emerald-400 mr-3 shrink-0 mt-0.5' />
                <span className='text-sm text-gray-300'>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className='p-6 pt-0'>
          <button
            onClick={() => {
              if (isCurrentPlan) return
              if (isFreePlan) {
                handleSubscribe(plan.id)
              } else {
                setSelectedPlan(plan.id)
                setShowConfirmation(true)
              }
            }}
            disabled={isProcessing}
            className={`w-full py-2.5 px-4 rounded-xl font-medium flex items-center justify-center
              ${
                isCurrentPlan
                  ? 'bg-green-500/20 text-green-400 cursor-default'
                  : isProcessing
                  ? 'bg-gray-700 text-gray-400 cursor-wait'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              } transition-colors duration-300`}
          >
            {isCurrentPlan ? (
              'Current Plan'
            ) : isProcessing ? (
              'Processing...'
            ) : (
              <>
                {plan.price === 0 ? 'Start Free' : 'Select Plan'}
                <ArrowRight className='w-4 h-4 ml-2' />
              </>
            )}
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <div className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        {error && (
          <div className='mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400'>
            {error}
          </div>
        )}
        <div className='max-w-2xl mb-8'>
          <h1 className='text-3xl font-semibold text-white'>
            Choose Your Plan
          </h1>
          <p className='mt-2 text-gray-400'>
            Select the perfect plan for your business needs. All plans include
            access to our core features.
          </p>
        </div>

        {/* Plans Grid */}
        <div className='grid md:grid-cols-3 gap-6'>
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Information Section */}
        <div className='mt-8 bg-gray-800/30 border border-gray-700/50 rounded-xl p-4'>
          <div className='flex items-start space-x-3'>
            <AlertCircle className='w-5 h-5 text-blue-400 shrink-0 mt-0.5' />
            <div className='text-sm text-gray-400'>
              <p className='text-gray-300 font-medium mb-1'>
                Plan Change Information
              </p>
              <p>
                When upgrading, you'll be charged the prorated amount for the
                remainder of your billing cycle. Downgrading will take effect at
                the end of your current billing period.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50'>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className='bg-gray-800 rounded-2xl p-6 max-w-md w-full'
          >
            <div className='flex justify-between items-start mb-4'>
              <h3 className='text-lg font-medium text-white'>
                Confirm Plan Change
              </h3>
              <button
                onClick={() => setShowConfirmation(false)}
                className='text-gray-400 hover:text-white transition-colors'
              >
                <X className='w-5 h-5' />
              </button>
            </div>
            <p className='text-gray-300 mb-6'>
              Are you sure you want to change your plan? This will update your
              billing immediately.
            </p>
            <div className='flex justify-end space-x-3'>
              <button
                onClick={() => setShowConfirmation(false)}
                className='px-4 py-2 text-gray-400 hover:text-white transition-colors'
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubscribe(selectedPlan)}
                disabled={isProcessing}
                className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50'
              >
                {isProcessing ? 'Processing...' : 'Confirm Change'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default MembershipPage
