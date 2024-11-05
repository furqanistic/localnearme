import express from 'express'
import {
  createBusiness,
  deleteBusiness,
  getAllBusinesses,
  getBusiness,
  getBusinessNames,
  getUserBusinesses,
  sendDigitalFlyer,
  updateBusiness,
} from '../controller/business.js'
import {
  authenticate,
  restrictTo,
  verifyToken,
} from '../middleware/authMiddleware.js'

const router = express.Router()

// Public routes
router.get('/', getAllBusinesses)
router.get('/:id', getBusiness)

// Protected routes
router.use(verifyToken) // Apply authentication middleware to all routes below this line

// Get user's businesses (for own businesses)
router.get('/user/businesses', getUserBusinesses)

// Admin route to get any user's businesses
router.get('/user/:userId/businesses', restrictTo('Admin'), getUserBusinesses)

router.get(
  '/user/:userId/business-names',
  restrictTo('Admin', 'Business'),
  getBusinessNames
)
router.post('/', authenticate, restrictTo('Admin', 'Business'), createBusiness)
router.patch('/:id', restrictTo('Admin', 'Business'), updateBusiness)
router.delete('/:id', restrictTo('Admin'), deleteBusiness)
router.post(
  '/:id/send-flyer',
  restrictTo('Admin', 'Business'),
  sendDigitalFlyer
)

export default router
