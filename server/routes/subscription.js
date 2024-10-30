import express from 'express'
import {
  getBusinessSubscribers,
  getMySubscriptions,
  subscribe,
  unsubscribe,
} from '../controller/subscription.js'
import { verifyToken } from '../middleware/authMiddleware.js'

const router = express.Router()

// All routes require authentication
router.use(verifyToken)

// Subscribe/unsubscribe routes
router.post('/businesses/:businessId/subscribe', subscribe)
router.post('/businesses/:businessId/unsubscribe', unsubscribe)

// Get user's subscriptions
router.get('/my-subscriptions', getMySubscriptions)

// Get business subscribers (restricted to business owner and admin)
router.get('/businesses/:businessId/subscribers', getBusinessSubscribers)

export default router
