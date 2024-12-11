import mongoose from 'mongoose'

const SubscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Business',
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'cancelled', 'pending', 'failed'],
      default: 'pending',
    },
    notifications: {
      email: {
        type: Boolean,
        default: true,
      },
      push: {
        type: Boolean,
        default: false,
      },
    },
    subscriptionDate: {
      type: Date,
      default: Date.now,
    },
    cancellationDate: {
      type: Date,
    },
    // Stripe-related fields
    stripeCustomerId: {
      type: String,
    },
    stripeSubscriptionId: {
      type: String,
    },
    stripePriceId: {
      type: String,
    },
    currentPeriodStart: {
      type: Date,
    },
    currentPeriodEnd: {
      type: Date,
    },
    subscriptionPlan: {
      type: String,
      enum: ['starter', 'standard', 'business'],
      default: 'starter',
    },
    // Add any plan-specific limits
    monthlyQuota: {
      type: Number,
      default: 0,
    },
    usedQuota: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

// Prevent duplicate subscriptions
SubscriptionSchema.index({ user: 1, business: 1 }, { unique: true })

export default mongoose.model('Subscription', SubscriptionSchema)
