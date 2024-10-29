import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

const filterOptions = [
  {
    id: 1,
    name: 'Groceries',
    icon: '🛒',
    color: 'from-green-500/10 to-green-500/20',
  },
  {
    id: 2,
    name: 'Restaurants',
    icon: '🍽️',
    color: 'from-red-500/10 to-red-500/20',
  },
  {
    id: 3,
    name: 'Plumbers',
    icon: '🔧',
    color: 'from-blue-500/10 to-blue-500/20',
  },
  {
    id: 4,
    name: 'Pet Stores',
    icon: '🐶',
    color: 'from-yellow-500/10 to-yellow-500/20',
  },
  {
    id: 5,
    name: 'Florists',
    icon: '💐',
    color: 'from-pink-500/10 to-pink-500/20',
  },
  {
    id: 6,
    name: 'Gyms',
    icon: '💪',
    color: 'from-purple-500/10 to-purple-500/20',
  },
  {
    id: 7,
    name: 'Parks',
    icon: '🌳',
    color: 'from-green-500/10 to-green-500/20',
  },
  {
    id: 8,
    name: 'Beaches',
    icon: '🏖️',
    color: 'from-blue-500/10 to-blue-500/20',
  },
  {
    id: 9,
    name: 'Cafes',
    icon: '☕',
    color: 'from-amber-500/10 to-amber-500/20',
  },
  {
    id: 10,
    name: 'Bakeries',
    icon: '🍰',
    color: 'from-rose-500/10 to-rose-500/20',
  },
  {
    id: 11,
    name: 'Salons',
    icon: '💇‍♀️',
    color: 'from-pink-500/10 to-pink-500/20',
  },
  {
    id: 12,
    name: 'Pharmacies',
    icon: '💊',
    color: 'from-red-500/10 to-red-500/20',
  },
  {
    id: 13,
    name: 'Libraries',
    icon: '📚',
    color: 'from-indigo-500/10 to-indigo-500/20',
  },
  {
    id: 14,
    name: 'Hospitals',
    icon: '🏥',
    color: 'from-blue-500/10 to-blue-500/20',
  },
  {
    id: 15,
    name: 'Shopping',
    icon: '👗',
    color: 'from-purple-500/10 to-purple-500/20',
  },
  {
    id: 16,
    name: 'Electronics',
    icon: '💻',
    color: 'from-gray-500/10 to-gray-500/20',
  },
  {
    id: 17,
    name: 'Books',
    icon: '📖',
    color: 'from-amber-500/10 to-amber-500/20',
  },
  {
    id: 18,
    name: 'Stores',
    icon: '🛍️',
    color: 'from-emerald-500/10 to-emerald-500/20',
  },
  {
    id: 19,
    name: 'Massage',
    icon: '💆‍♂️',
    color: 'from-teal-500/10 to-teal-500/20',
  },
  {
    id: 20,
    name: 'Auto Repair',
    icon: '🔧',
    color: 'from-blue-500/10 to-blue-500/20',
  },
]

const Categories = () => {
  const containerRef = useRef(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [activeCategory, setActiveCategory] = useState(null)

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
    <div className=' py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-xl font-semibold text-white'>
            Popular Categories
          </h2>
          <div className='flex gap-2'>
            <motion.button
              className={`p-1.5 bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200`}
              onClick={() => scroll('left')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!showLeftArrow}
              aria-label='Scroll left'
            >
              <ChevronLeft className='w-4 h-4 text-white' />
            </motion.button>
            <motion.button
              className={`p-1.5 bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200`}
              onClick={() => scroll('right')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!showRightArrow}
              aria-label='Scroll right'
            >
              <ChevronRight className='w-4 h-4 text-white' />
            </motion.button>
          </div>
        </div>

        <div
          ref={containerRef}
          className='flex overflow-x-auto scrollbar-hide pb-4 gap-3 snap-x snap-mandatory'
          onScroll={checkScrollPosition}
        >
          {filterOptions.map((category) => (
            <motion.button
              key={category.id}
              onClick={() =>
                setActiveCategory(
                  activeCategory === category.id ? null : category.id
                )
              }
              className={`flex-shrink-0 snap-start ${
                activeCategory === category.id
                  ? 'ring-2 ring-blue-500'
                  : 'hover:ring-2 hover:ring-gray-500'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-br ${category.color} backdrop-blur-sm`}
              >
                <span className='text-xl'>{category.icon}</span>
                <span className='text-sm font-medium text-white whitespace-nowrap'>
                  {category.name}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Categories
