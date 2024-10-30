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
      enum: ['active', 'cancelled'],
      default: 'active',
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
  },
  { timestamps: true }
)

// Prevent duplicate subscriptions
SubscriptionSchema.index({ user: 1, business: 1 }, { unique: true })

export default mongoose.model('Subscription', SubscriptionSchema)
