import Navigationbar from '@/components/Layout/NavigationBar'
import { motion } from 'framer-motion'
import {
  Building,
  DollarSign,
  Filter,
  Landmark,
  Leaf,
  MapPin,
  Search,
  Utensils,
} from 'lucide-react'
import React, { useState } from 'react'

const LocalGuidePage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedPriceRange, setSelectedPriceRange] = useState('')

  const guideData = {
    title: 'Local Guide',
    description:
      'Explore the natural beauty, vibrant cities, and rich culture of Canada.',
    points: [
      {
        id: 1,
        name: 'CN Tower',
        category: 'landmark',
        priceRange: 'medium',
        description:
          'Iconic 553.3m-high concrete communications & observation tower with spectacular views.',
      },
      {
        id: 2,
        name: 'Royal Ontario Museum',
        category: 'museum',
        priceRange: 'medium',
        description:
          'Sprawling natural history & world cultures galleries, plus dinosaurs in the Libeskind crystal wing.',
      },
      {
        id: 3,
        name: 'Banff National Park',
        category: 'nature',
        priceRange: 'low',
        description:
          'Rocky Mountain peaks, turquoise glacial lakes, a picture-perfect mountain town and village.',
      },
      {
        id: 4,
        name: "Schwartz's Deli",
        category: 'restaurant',
        priceRange: 'low',
        description:
          'Landmark deli serving smoked meat sandwiches & other Jewish specialties since 1928.',
      },
      {
        id: 5,
        name: 'Château Frontenac',
        category: 'landmark',
        priceRange: 'high',
        description:
          'Striking château-style hotel overlooking the St. Lawrence River, with elegant rooms & suites.',
      },
      {
        id: 6,
        name: 'Stanley Park',
        category: 'nature',
        priceRange: 'free',
        description:
          'Huge urban park with scenic seawall path, beaches, pool, miniature railway & more.',
      },
    ],
  }

  const filteredPoints = guideData.points.filter(
    (point) =>
      point.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || point.category === selectedCategory) &&
      (selectedPriceRange === '' || point.priceRange === selectedPriceRange)
  )

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'restaurant':
        return <Utensils className='h-5 w-5' />
      case 'museum':
        return <Building className='h-5 w-5' />
      case 'landmark':
        return <Landmark className='h-5 w-5' />
      case 'nature':
        return <Leaf className='h-5 w-5' />
      default:
        return <MapPin className='h-5 w-5' />
    }
  }

  const getPriceRangeIcon = (priceRange) => {
    switch (priceRange) {
      case 'free':
        return <DollarSign className='h-5 w-5 text-gray-400' />
      case 'low':
        return (
          <div className='flex'>
            <DollarSign className='h-5 w-5 text-green-500' />
            <DollarSign className='h-5 w-5 text-gray-400' />
            <DollarSign className='h-5 w-5 text-gray-400' />
          </div>
        )
      case 'medium':
        return (
          <div className='flex'>
            <DollarSign className='h-5 w-5 text-green-500' />
            <DollarSign className='h-5 w-5 text-green-500' />
            <DollarSign className='h-5 w-5 text-gray-400' />
          </div>
        )
      case 'high':
        return (
          <div className='flex'>
            <DollarSign className='h-5 w-5 text-green-500' />
            <DollarSign className='h-5 w-5 text-green-500' />
            <DollarSign className='h-5 w-5 text-green-500' />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <>
      <Navigationbar />
      <div className='bg-[#141414] text-gray-200 min-h-screen'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
          <motion.h1
            className='text-4xl md:text-5xl font-bold text-center mb-12'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {guideData.title}
          </motion.h1>

          <motion.p
            className='text-xl text-center mb-12'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {guideData.description}
          </motion.p>

          <motion.div
            className='bg-gray-800 rounded-lg shadow-lg p-6 mb-12'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className='flex flex-col sm:flex-row gap-4 mb-6'>
              <div className='relative flex-grow'>
                <input
                  type='text'
                  placeholder='Search points of interest...'
                  className='w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className='absolute left-3 top-2.5 h-5 w-5 text-gray-400' />
              </div>
            </div>

            <div className='flex flex-wrap gap-4'>
              <select
                className='appearance-none pl-3 pr-8 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white'
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value=''>All Categories</option>
                <option value='restaurant'>Restaurants</option>
                <option value='museum'>Museums</option>
                <option value='landmark'>Landmarks</option>
                <option value='nature'>Nature</option>
              </select>

              <select
                className='appearance-none pl-3 pr-8 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white'
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
              >
                <option value=''>All Price Ranges</option>
                <option value='free'>Free</option>
                <option value='low'>Low</option>
                <option value='medium'>Medium</option>
                <option value='high'>High</option>
              </select>
            </div>
          </motion.div>

          <motion.div
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {filteredPoints.map((point, index) => (
              <motion.div
                key={point.id}
                className='bg-gray-800 rounded-lg shadow-lg overflow-hidden'
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className='bg-blue-500 p-4 flex items-center justify-between'>
                  <h2 className='text-2xl font-semibold text-white'>
                    {point.name}
                  </h2>
                  <div className='flex items-center space-x-4 text-white'>
                    {getCategoryIcon(point.category)}
                    {getPriceRangeIcon(point.priceRange)}
                  </div>
                </div>
                <div className='p-4'>
                  <p className='text-gray-300'>{point.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredPoints.length === 0 && (
            <motion.div
              className='bg-gray-800 rounded-lg shadow-lg p-8 text-center mt-8'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <p className='text-xl text-gray-300'>
                No points of interest found. Try adjusting your search or
                filters.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}

export default LocalGuidePage
