import express from 'express'
import multer from 'multer'
import { sendNewsletter } from '../controller/newsletter.js'
import { verifyToken } from '../middleware/authMiddleware.js'

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

router.post(
  '/businesses/:businessId/newsletter',
  verifyToken,
  upload.array('attachments'),
  sendNewsletter
)

export default router
