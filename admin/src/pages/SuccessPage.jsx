import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const SuccessPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('verifying')

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const sessionId = searchParams.get('session_id')
        if (!sessionId) {
          navigate('/pricing')
          return
        }

        await axios.get(`/api/subscription/verify?session_id=${sessionId}`)
        setStatus('success')

        // Redirect after short delay
        setTimeout(() => {
          navigate('/dashboard')
        }, 2000)
      } catch (error) {
        setStatus('error')
        console.error('Verification failed:', error)
      }
    }

    verifyPayment()
  }, [searchParams, navigate])

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='p-8 bg-white rounded-lg shadow-md'>
        {status === 'verifying' && (
          <div>
            <h2 className='text-xl font-semibold'>Verifying your payment...</h2>
            <p className='mt-2 text-gray-600'>
              Please wait while we confirm your subscription.
            </p>
          </div>
        )}

        {status === 'success' && (
          <div>
            <h2 className='text-xl font-semibold text-green-600'>
              Payment Successful!
            </h2>
            <p className='mt-2 text-gray-600'>
              Your subscription has been activated.
            </p>
            <p className='mt-2 text-gray-600'>Redirecting to dashboard...</p>
          </div>
        )}

        {status === 'error' && (
          <div>
            <h2 className='text-xl font-semibold text-red-600'>
              Verification Failed
            </h2>
            <p className='mt-2 text-gray-600'>
              There was a problem verifying your payment.
            </p>
            <button
              onClick={() => navigate('/pricing')}
              className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
              Return to Pricing
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SuccessPage
