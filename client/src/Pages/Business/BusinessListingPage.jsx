import ViewBusinessListing from '@/components/Business/ViewBusinessListing'
import Navigationbar from '@/components/Layout/NavigationBar'
import React from 'react'

const BusinessListingPage = () => {
  const businessData = {
    _id: '60d5ecb8b4f7b83a4c8e9a01',
    owner: '60d5ecb8b4f7b83a4c8e9a00',
    role: 'Business',
    name: 'The Cozy Corner Café',
    description:
      'A charming local café offering artisanal coffee, freshly baked goods, and a warm atmosphere. Perfect for your morning coffee, lunch breaks, or casual meetings.',
    type: 'Restaurant',
    address: {
      street: '123 Main Street',
      city: 'Anytown',
      state: 'CA',
      country: 'USA',
      zipCode: '12345',
    },
    location: '37.7749,-122.4194',
    contactEmail: 'info@cozycornercafe.com',
    phoneNumber: '(555) 123-4567',
    websiteUrl: 'https://www.cozycornercafe.com',
    googleMapsUrl: 'https://goo.gl/maps/example',
    googleReviewsUrl: 'https://goo.gl/reviews/example',
    images: [
      'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2762&q=80',
      'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=80',
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80',
    ],
    menu: 'https://www.cozycornercafe.com/menu.pdf',
    isPremium: true,
    minimumReviewFilter: 4,
    subscriberCount: 1250,
    favoriteCount: 876,
    tags: ['Coffee', 'Bakery', 'Breakfast', 'Lunch', 'Vegetarian-friendly'],
    openingHours: [
      { day: 'Monday', open: '07:00', close: '20:00' },
      { day: 'Tuesday', open: '07:00', close: '20:00' },
      { day: 'Wednesday', open: '07:00', close: '20:00' },
      { day: 'Thursday', open: '07:00', close: '20:00' },
      { day: 'Friday', open: '07:00', close: '22:00' },
      { day: 'Saturday', open: '08:00', close: '22:00' },
      { day: 'Sunday', open: '08:00', close: '18:00' },
    ],
    digitalFlyer: {
      isActive: true,
      subscriberCount: 950,
      monthlyQuota: 100,
      usedQuota: 75,
      lastSentDate: new Date('2024-10-05'),
    },
    reviewSystem: {
      isActive: true,
      monthlyQuota: 100,
      usedQuota: 42,
      minimumRating: 4,
    },
  }
  return (
    <div>
      <Navigationbar />
      <ViewBusinessListing business={businessData} />
    </div>
  )
}

export default BusinessListingPage
