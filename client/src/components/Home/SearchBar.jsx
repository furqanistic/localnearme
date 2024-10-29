import { AnimatePresence, motion } from 'framer-motion'
import {
  Bed,
  Building,
  Car,
  ChevronDown,
  Coffee,
  DollarSign,
  Dumbbell,
  Home,
  MapPin,
  Search,
  ShoppingBag,
  Star,
  Tags,
  Utensils,
} from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

const SearchBar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [priceDropdownVisible, setPriceDropdownVisible] = useState(false)
  const [ratingDropdownVisible, setRatingDropdownVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedPrice, setSelectedPrice] = useState('Any Price')
  const [selectedRating, setSelectedRating] = useState('Any Rating')

  const dropdownRef = useRef(null)
  const priceDropdownRef = useRef(null)
  const ratingDropdownRef = useRef(null)

  const categories = [
    { name: 'All Categories', icon: Tags },
    { name: 'Airbnb', icon: Home },
    { name: 'Restaurants', icon: Utensils },
    { name: 'Shopping', icon: ShoppingBag },
    { name: 'Hotels', icon: Bed },
    { name: 'Cafes', icon: Coffee },
    { name: 'Transportation', icon: Car },
    { name: 'Fitness', icon: Dumbbell },
  ]

  const popularCities = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Miami',
    'San Francisco',
  ]

  const priceRanges = [
    'Any Price',
    '$0 - $50',
    '$51 - $100',
    '$101 - $200',
    '$201+',
  ]

  const ratings = ['Any Rating', '4.5+', '4.0+', '3.5+', '3.0+']

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false)
      }
      if (
        priceDropdownRef.current &&
        !priceDropdownRef.current.contains(event.target)
      ) {
        setPriceDropdownVisible(false)
      }
      if (
        ratingDropdownRef.current &&
        !ratingDropdownRef.current.contains(event.target)
      ) {
        setRatingDropdownVisible(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search logic here
    console.log({
      category: selectedCategory,
      location: selectedLocation,
      price: selectedPrice,
      rating: selectedRating,
    })
  }

  return (
    <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <div className='bg-gray-800 rounded-xl p-6 shadow-lg'>
        <form onSubmit={handleSearch} className='space-y-4'>
          {/* Main Search Row */}
          <div className='flex flex-col md:flex-row gap-4'>
            {/* Category Dropdown */}
            <div className='relative md:w-1/4'>
              <button
                type='button'
                onClick={() => setDropdownVisible(!dropdownVisible)}
                className='w-full flex items-center justify-between px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 hover:bg-gray-600 transition-colors duration-200'
              >
                <div className='flex items-center gap-2'>
                  <Tags className='h-4 w-4' />
                  <span className='truncate'>{selectedCategory}</span>
                </div>
                <ChevronDown className='h-4 w-4 opacity-50' />
              </button>
              <AnimatePresence>
                {dropdownVisible && (
                  <motion.div
                    ref={dropdownRef}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className='absolute left-0 right-0 mt-2 rounded-lg bg-gray-700 shadow-lg z-20 border border-gray-600 overflow-hidden'
                  >
                    {categories.map((category) => (
                      <button
                        key={category.name}
                        type='button'
                        onClick={() => {
                          setSelectedCategory(category.name)
                          setDropdownVisible(false)
                        }}
                        className='w-full flex items-center gap-2 px-4 py-2.5 text-gray-200 hover:bg-gray-600 transition-colors duration-200'
                      >
                        <category.icon className='h-4 w-4' />
                        <span>{category.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Location Input with Suggestions */}
            <div className='relative flex-1'>
              <div className='relative'>
                <MapPin className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                <input
                  type='text'
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  placeholder='Enter location...'
                  className='w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200'
                />
              </div>
              {selectedLocation && (
                <div className='absolute left-0 right-0 mt-2 bg-gray-700 rounded-lg shadow-lg border border-gray-600 z-10'>
                  {popularCities
                    .filter((city) =>
                      city
                        .toLowerCase()
                        .includes(selectedLocation.toLowerCase())
                    )
                    .map((city) => (
                      <button
                        key={city}
                        type='button'
                        onClick={() => setSelectedLocation(city)}
                        className='w-full px-4 py-2.5 text-left text-gray-200 hover:bg-gray-600 transition-colors duration-200 flex items-center gap-2'
                      >
                        <Building className='h-4 w-4 opacity-50' />
                        {city}
                      </button>
                    ))}
                </div>
              )}
            </div>

            {/* Price Range Dropdown */}
            <div className='relative md:w-1/5'>
              <button
                type='button'
                onClick={() => setPriceDropdownVisible(!priceDropdownVisible)}
                className='w-full flex items-center justify-between px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 hover:bg-gray-600 transition-colors duration-200'
              >
                <div className='flex items-center gap-2'>
                  <DollarSign className='h-4 w-4' />
                  <span className='truncate'>{selectedPrice}</span>
                </div>
                <ChevronDown className='h-4 w-4 opacity-50' />
              </button>
              <AnimatePresence>
                {priceDropdownVisible && (
                  <motion.div
                    ref={priceDropdownRef}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className='absolute left-0 right-0 mt-2 rounded-lg bg-gray-700 shadow-lg z-20 border border-gray-600'
                  >
                    {priceRanges.map((price) => (
                      <button
                        key={price}
                        type='button'
                        onClick={() => {
                          setSelectedPrice(price)
                          setPriceDropdownVisible(false)
                        }}
                        className='w-full px-4 py-2.5 text-left text-gray-200 hover:bg-gray-600 transition-colors duration-200'
                      >
                        {price}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Rating Dropdown */}
            <div className='relative md:w-1/5'>
              <button
                type='button'
                onClick={() => setRatingDropdownVisible(!ratingDropdownVisible)}
                className='w-full flex items-center justify-between px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 hover:bg-gray-600 transition-colors duration-200'
              >
                <div className='flex items-center gap-2'>
                  <Star className='h-4 w-4' />
                  <span className='truncate'>{selectedRating}</span>
                </div>
                <ChevronDown className='h-4 w-4 opacity-50' />
              </button>
              <AnimatePresence>
                {ratingDropdownVisible && (
                  <motion.div
                    ref={ratingDropdownRef}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className='absolute left-0 right-0 mt-2 rounded-lg bg-gray-700 shadow-lg z-20 border border-gray-600'
                  >
                    {ratings.map((rating) => (
                      <button
                        key={rating}
                        type='button'
                        onClick={() => {
                          setSelectedRating(rating)
                          setRatingDropdownVisible(false)
                        }}
                        className='w-full px-4 py-2.5 text-left text-gray-200 hover:bg-gray-600 transition-colors duration-200'
                      >
                        {rating}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Search Button */}
          <button
            type='submit'
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2'
          >
            <Search className='h-4 w-4' />
            Search
          </button>
        </form>

        {/* Popular Searches */}
        <div className='mt-4 flex items-center gap-2 flex-wrap'>
          <span className='text-sm text-gray-400'>Popular:</span>
          {['Restaurants', 'Hotels', 'Shopping', 'Activities'].map((tag) => (
            <button
              key={tag}
              className='text-sm px-3 py-1 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors duration-200'
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchBar
