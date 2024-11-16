import express from 'express'
import multer from 'multer'
import { sendNewsletters } from '../controller/newsletters.js'
import { verifyToken } from '../middleware/authMiddleware.js'
const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })
router.post(
  '/businesses/:businessId/newsletters',
  verifyToken,
  upload.array('attachments'),
  sendNewsletters
)
export default router
