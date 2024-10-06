import jwt from 'jsonwebtoken'
import { createError } from '../error.js'
import User from '../models/User.js'

export const authenticate = async (req, res, next) => {
  try {
    console.log('Cookies:', req.cookies)

    // Get token from cookie
    const token = req.cookies.jwt

    if (!token) {
      console.log('No token found')
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in. Please log in to get access.',
      })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log('Decoded token:', decoded)

    // Check if user still exists
    const currentUser = await User.findById(decoded.id)
    if (!currentUser) {
      console.log('User not found')
      return res.status(401).json({
        status: 'fail',
        message: 'The user belonging to this token no longer exists.',
      })
    }

    // Grant access to protected route
    req.user = currentUser
    console.log('User set on request:', req.user)
    next()
  } catch (error) {
    console.error('Authentication error:', error)
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid token or authentication failed.',
    })
  }
}

export const verifyToken = async (req, res, next) => {
  try {
    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt
    }

    if (!token) {
      return next(
        createError(401, 'You are not logged in! Please log in to get access.')
      )
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const currentUser = await User.findById(decoded.id)
    if (!currentUser) {
      return next(
        createError(401, 'The user belonging to this token no longer exists.')
      )
    }

    req.user = currentUser
    next()
  } catch (err) {
    next(err)
  }
}

export const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    console.log('User object:', req.user)
    console.log('Allowed roles:', allowedRoles)

    // Check if user exists and has a role
    if (!req.user || !req.user.role) {
      console.log('No user or role found')
      return res.status(401).json({
        status: 'fail',
        message:
          'You are not logged in or do not have permission to perform this action',
      })
    }

    console.log('User role:', req.user.role)

    // Check if user's role is allowed
    if (!allowedRoles.includes(req.user.role)) {
      console.log('User role not in allowed roles')
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to perform this action',
      })
    }

    console.log('Access granted')
    next()
  }
}
