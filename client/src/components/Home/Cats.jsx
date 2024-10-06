import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

const filterOptions = [
  { id: 1, name: 'Groceries', icon: '🛒' },
  { id: 2, name: 'Restaurants', icon: '🍽️' },
  { id: 3, name: 'Plumbers', icon: '🔧' },
  { id: 4, name: 'Pet Stores', icon: '🐶' },
  { id: 5, name: 'Florists', icon: '💐' },
  { id: 6, name: 'Gyms', icon: '💪' },
  { id: 7, name: 'Parks', icon: '🌳' },
  { id: 8, name: 'Beaches', icon: '🏖️' },
  { id: 9, name: 'Cafes', icon: '☕' },
  { id: 10, name: 'Bakeries', icon: '🍰' },
  { id: 11, name: 'Salons', icon: '💇‍♀️' },
  { id: 12, name: 'Pharmacies', icon: '💊' },
  { id: 13, name: 'Libraries', icon: '📚' },
  { id: 14, name: 'Hospitals', icon: '🏥' },
  { id: 15, name: 'Clothing Stores', icon: '👗' },
  { id: 16, name: 'Electronics Stores', icon: '💻' },
  { id: 17, name: 'Bookstores', icon: '📖' },
  { id: 18, name: 'Convenience Stores', icon: '🛍️' },
  { id: 19, name: 'Massage Parlors', icon: '💆‍♂️' },
  { id: 20, name: 'Auto Repair', icon: '🔧' },
  { id: 21, name: 'Health Services', icon: '🏥' },
  { id: 22, name: 'Beauty & Wellness', icon: '💄' },
  { id: 23, name: 'Fitness Centers', icon: '🏋️‍♂️' },
  { id: 24, name: 'Educational Services', icon: '🎓' },
  { id: 25, name: 'Home Services', icon: '🏠' },
]

const Cats = () => {
  const containerRef = useRef(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const checkScrollPosition = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  useEffect(() => {
    checkScrollPosition()
    window.addEventListener('resize', checkScrollPosition)
    return () => window.removeEventListener('resize', checkScrollPosition)
  }, [])

  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      setTimeout(checkScrollPosition, 300)
    }
  }

  return (
    <div className='bg-[#141414] py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-3xl font-bold text-white mb-6'>
          Explore Categories
        </h2>
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 flex items-center'>
            <motion.button
              className={`z-10 p-2 bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ${
                showLeftArrow
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-full'
              }`}
              onClick={() => scroll('left')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label='Scroll left'
            >
              <ChevronLeft className='w-6 h-6 text-white' />
            </motion.button>
          </div>
          <div
            ref={containerRef}
            className='flex overflow-x-scroll scrollbar-hide space-x-4 py-4 px-12'
            onScroll={checkScrollPosition}
          >
            {filterOptions.map((category) => (
              <motion.div
                key={category.id}
                className='flex-shrink-0 w-32 h-32 flex flex-col items-center justify-center bg-gray-800 rounded-xl p-2 text-center shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-700 cursor-pointer border border-gray-700'
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className='text-4xl mb-2'>{category.icon}</div>
                <span className='text-sm font-medium text-gray-200'>
                  {category.name}
                </span>
              </motion.div>
            ))}
          </div>
          <div className='absolute inset-y-0 right-0 flex items-center'>
            <motion.button
              className={`z-10 p-2 bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ${
                showRightArrow
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-full'
              }`}
              onClick={() => scroll('right')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label='Scroll right'
            >
              <ChevronRight className='w-6 h-6 text-white' />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cats
