// 2. Model file (Newsletters.js)
import mongoose from 'mongoose'
const NewslettersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: String,
    country: String,
    city: String,
    subscriptions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'subscriptionType',
      },
    ],
    subscriptionType: {
      type: String,
      enum: ['Business', 'LocalGuide'],
    },
    isSubscribedToMain: {
      type: Boolean,
      default: true,
    },
    preferences: {
      type: Map,
      of: Boolean,
    },
  },
  { timestamps: true }
)
export default mongoose.model('Newsletters', NewslettersSchema)
