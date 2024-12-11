// utils/planLimits.js
export const PLAN_LIMITS = {
  starter: {
    monthlyQuota: 50,
    maxBusinesses: 1,
    features: ['basic_analytics', 'email_support'],
  },
  standard: {
    monthlyQuota: 200,
    maxBusinesses: 3,
    features: ['basic_analytics', 'advanced_analytics', 'priority_support'],
  },
  business: {
    monthlyQuota: 1000,
    maxBusinesses: 10,
    features: [
      'basic_analytics',
      'advanced_analytics',
      'premium_support',
      'api_access',
    ],
  },
}

export function getPlanLimits(planName) {
  return PLAN_LIMITS[planName] || PLAN_LIMITS.starter
}

export function hasFeature(subscription, featureName) {
  const planLimits = PLAN_LIMITS[subscription.subscriptionPlan]
  return planLimits?.features.includes(featureName) || false
}

export function isWithinQuota(subscription) {
  const planLimits = PLAN_LIMITS[subscription.subscriptionPlan]
  return subscription.usedQuota < planLimits.monthlyQuota
}
