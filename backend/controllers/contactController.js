import asyncHandler from 'express-async-handler'
import Contact from '../models/contactModel.js'

// @desc    Create a contact message
// @route   POST /api/contacts
// @access  Public
const createContactMessage = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    res.status(400)
    throw new Error('Please provide name, email and message')
  }

  const contact = await Contact.create({ name, email, message })

  res.status(201).json({
    _id: contact._id,
    name: contact.name,
    email: contact.email,
    message: contact.message,
    createdAt: contact.createdAt,
  })
})

// @desc    Get all contact messages
// @route   GET /api/contacts
// @access  Private/Admin
const getContactMessages = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({}).sort({ createdAt: -1 })
  res.json(contacts)
})

export { createContactMessage, getContactMessages }
