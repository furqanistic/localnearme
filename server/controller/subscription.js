import Stripe from 'stripe'
import { createError } from '../error.js'
import Business from '../models/Business.js'
import Subscription from '../models/Subscription.js'
import User from '../models/User.js'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

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

// Create checkout session
export const createCheckoutSession = async (req, res) => {
  try {
    const { planId } = req.body
    const user = await User.findById(req.user.id)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Get or create Stripe customer
    let customerId = user.stripeCustomerId
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { userId: user.id },
      })
      customerId = customer.id
      user.stripeCustomerId = customerId
      await user.save()
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env[`STRIPE_PRICE_${planId.toUpperCase()}`],
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.CLIENT_URL}/dashboard/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/pricing`,
      metadata: {
        userId: user.id,
        planId: planId,
      },
    })

    res.json({ sessionId: session.id })
  } catch (error) {
    console.error('Checkout session error:', error)
    res.status(400).json({ error: error.message })
  }
}
// Verify successful payment and update subscription
export const verifySubscription = async (req, res) => {
  try {
    const { session_id } = req.query

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(session_id)

    if (session.payment_status === 'paid') {
      // Get subscription details
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription
      )

      // Update or create subscription in your database
      await Subscription.findOneAndUpdate(
        { user: req.user.id },
        {
          status: 'active',
          stripeCustomerId: session.customer,
          stripeSubscriptionId: session.subscription,
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          subscriptionPlan: req.query.plan || 'starter',
        },
        { upsert: true, new: true }
      )

      res.json({
        success: true,
        message: 'Subscription activated successfully',
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment not completed',
      })
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Get subscription status
export const getSubscriptionStatus = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      user: req.user.id,
      status: 'active',
    })

    if (subscription?.stripeSubscriptionId) {
      const stripeSubscription = await stripe.subscriptions.retrieve(
        subscription.stripeSubscriptionId
      )

      subscription.status = stripeSubscription.status
      await subscription.save()
    }

    res.json({ subscription })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Webhook handler for Stripe events
export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature']
  let event

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        await handleSuccessfulSubscription(session)
        break
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object
        await handleSubscriptionCancelled(subscription)
        break
      }
    }

    res.json({ received: true })
  } catch (error) {
    console.error('Webhook processing error:', error)
    res.status(500).send('Webhook processing failed')
  }
}

// Handle successful subscription
async function handleSuccessfulSubscription(session) {
  const { userId, businessId, planId } = session.metadata

  const subscription = await Subscription.findOne({
    user: userId,
    business: businessId,
  })

  if (subscription) {
    subscription.status = 'active'
    subscription.stripeSubscriptionId = session.subscription
    subscription.subscriptionDate = new Date()
    subscription.subscriptionPlan = planId
    await subscription.save()

    // Update business subscriber count
    await Business.findByIdAndUpdate(businessId, {
      $inc: { subscriberCount: 1 },
    })
  }
}

// Handle cancelled subscription
async function handleSubscriptionCancelled(stripeSubscription) {
  const subscription = await Subscription.findOne({
    stripeSubscriptionId: stripeSubscription.id,
  })

  if (subscription) {
    subscription.status = 'cancelled'
    subscription.cancellationDate = new Date()
    await subscription.save()

    // Update business subscriber count
    await Business.findByIdAndUpdate(subscription.business, {
      $inc: { subscriberCount: -1 },
    })
  }
}
