// config/stripe.js
import dotenv from 'dotenv'
import Stripe from 'stripe'
dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

export const SUBSCRIPTION_PLANS = {
  STARTER: {
    id: 'starter',
    name: 'Starter Plan',
    stripePriceId: process.env.STRIPE_PRICE_STARTER,
    features: ['Basic features', 'Limited access', 'Email support'],
    price: 29.99, // Update with your actual price
  },
  STANDARD: {
    id: 'standard',
    name: 'Standard Plan',
    stripePriceId: process.env.STRIPE_PRICE_STANDARD,
    features: ['All Starter features', 'Advanced features', 'Priority support'],
    price: 69.99, // Update with your actual price
  },
  BUSINESS: {
    id: 'business',
    name: 'Business Plan',
    stripePriceId: process.env.STRIPE_PRICE_BUSINESS,
    features: [
      'All Standard features',
      'Premium features',
      '24/7 support',
      'Custom solutions',
    ],
    price: 99.99, // Update with your actual price
  },
}

export default stripe
