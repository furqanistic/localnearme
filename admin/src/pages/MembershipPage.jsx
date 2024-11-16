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
import React, { useState } from 'react'

const MembershipPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('basic')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const plans = [
    {
      id: 'free',
      name: 'Free',
      description: 'Perfect for getting started',
      price: 0,
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
      id: 'basic',
      name: 'Basic',
      description: 'Great for growing businesses',
      price: 19.99,
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
      id: 'pro',
      name: 'Pro',
      description: 'For power users and teams',
      price: 49.99,
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

  const PlanCard = ({ plan }) => (
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
            <span className='text-3xl font-bold text-white'>${plan.price}</span>
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

      {/* Action Button - Fixed at Bottom */}
      <div className='p-6 pt-0'>
        <button
          onClick={() => setSelectedPlan(plan.id)}
          className={`w-full py-2.5 px-4 rounded-xl font-medium flex items-center justify-center
            ${
              selectedPlan === plan.id
                ? 'bg-blue-500 text-white cursor-default'
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            } transition-colors duration-300`}
        >
          {selectedPlan === plan.id ? (
            'Current Plan'
          ) : (
            <>
              Select Plan
              <ArrowRight className='w-4 h-4 ml-2' />
            </>
          )}
        </button>
      </div>
    </motion.div>
  )

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <div className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
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
                onClick={() => {
                  setIsProcessing(true)
                  setTimeout(() => {
                    setIsProcessing(false)
                    setShowConfirmation(false)
                  }, 1500)
                }}
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
