import { createError } from '../error.js'
import Business from '../models/Business.js'
import Subscription from '../models/Subscription.js'

export const subscribe = async (req, res, next) => {
  try {
    const { businessId } = req.params
    const userId = req.user.id

    // Check if business exists
    const business = await Business.findById(businessId)
    if (!business) {
      return next(createError(404, 'Business not found'))
    }

    // Check if subscription already exists
    const existingSubscription = await Subscription.findOne({
      user: userId,
      business: businessId,
    })

    if (existingSubscription) {
      if (existingSubscription.status === 'active') {
        return next(
          createError(400, 'You are already subscribed to this business')
        )
      } else {
        // Reactivate cancelled subscription
        existingSubscription.status = 'active'
        existingSubscription.cancellationDate = null
        await existingSubscription.save()

        // Increment business subscriber count
        await Business.findByIdAndUpdate(businessId, {
          $inc: { subscriberCount: 1 },
        })

        return res.status(200).json({
          status: 'success',
          message: 'Subscription reactivated successfully',
          data: { subscription: existingSubscription },
        })
      }
    }

    // Create new subscription
    const subscription = await Subscription.create({
      user: userId,
      business: businessId,
      status: 'active',
    })

    // Increment business subscriber count
    await Business.findByIdAndUpdate(businessId, {
      $inc: { subscriberCount: 1 },
    })

    res.status(201).json({
      status: 'success',
      data: { subscription },
    })
  } catch (error) {
    next(error)
  }
}

export const unsubscribe = async (req, res, next) => {
  try {
    const { businessId } = req.params
    const userId = req.user.id

    const subscription = await Subscription.findOne({
      user: userId,
      business: businessId,
      status: 'active',
    })

    if (!subscription) {
      return next(createError(404, 'Active subscription not found'))
    }

    // Update subscription status
    subscription.status = 'cancelled'
    subscription.cancellationDate = new Date()
    await subscription.save()

    // Decrement business subscriber count
    await Business.findByIdAndUpdate(businessId, {
      $inc: { subscriberCount: -1 },
    })

    res.status(200).json({
      status: 'success',
      message: 'Successfully unsubscribed',
      data: { subscription },
    })
  } catch (error) {
    next(error)
  }
}

export const getMySubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find({
      user: req.user.id,
      status: 'active',
    }).populate('business', 'name type address images')

    res.status(200).json({
      status: 'success',
      results: subscriptions.length,
      data: { subscriptions },
    })
  } catch (error) {
    next(error)
  }
}

export const getBusinessSubscribers = async (req, res, next) => {
  try {
    const { businessId } = req.params

    // Check if user has permission to view subscribers
    const business = await Business.findById(businessId)
    if (!business) {
      return next(createError(404, 'Business not found'))
    }

    if (
      business.owner.toString() !== req.user.id &&
      req.user.role !== 'Admin'
    ) {
      return next(
        createError(403, 'You do not have permission to view subscribers')
      )
    }

    const subscriptions = await Subscription.find({
      business: businessId,
      status: 'active',
    }).populate('user', 'name email')

    res.status(200).json({
      status: 'success',
      results: subscriptions.length,
      data: { subscriptions },
    })
  } catch (error) {
    next(error)
  }
}
