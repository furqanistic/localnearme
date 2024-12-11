import express from 'express'
import {
  createCheckoutSession,
  getBusinessSubscribers,
  getMySubscriptions,
  getSubscriptionStatus,
  handleStripeWebhook,
  subscribe,
  unsubscribe,
  verifySubscription,
} from '../controller/subscription.js'
import { verifyToken } from '../middleware/authMiddleware.js'

const router = express.Router()

// Webhook route (no auth required)
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  handleStripeWebhook
)

// All other routes require authentication
router.use(verifyToken)

// Stripe checkout session
router.post('/create-checkout-session', createCheckoutSession)
router.get('/verify', verifySubscription)
router.get('/status', getSubscriptionStatus)

// Existing routes
router.post('/businesses/:businessId/subscribe', subscribe)
router.post('/businesses/:businessId/unsubscribe', unsubscribe)
router.get('/my-subscriptions', getMySubscriptions)
router.get('/businesses/:businessId/subscribers', getBusinessSubscribers)

export default router
