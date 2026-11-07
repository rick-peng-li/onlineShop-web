import express from 'express'
const router = express.Router()
import {
  createContactMessage,
  getContactMessages,
} from '../controllers/contactController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router
  .route('/')
  .post(createContactMessage)
  .get(protect, admin, getContactMessages)

export default router
