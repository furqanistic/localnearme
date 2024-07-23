import React, { useRef } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa' // Using FontAwesome for arrows

const filterOptions = [
  { id: 1, name: 'Groceries', icon: '🛒' },
  { id: 2, name: 'Restaurants', icon: '🍽️' },
  { id: 3, name: 'Plumbers', icon: '🔧' },
  { id: 4, name: 'Convenience Stores', icon: '🛍️' },
  { id: 5, name: 'Massage Parlors', icon: '💆‍♂️' },
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
  { id: 18, name: 'Pet Stores', icon: '🐶' },
  { id: 19, name: 'Florists', icon: '💐' },
  { id: 20, name: 'Auto Repair', icon: '🔧' },
  { id: 21, name: 'Health Services', icon: '🏥' },
  { id: 22, name: 'Beauty & Wellness', icon: '💄' },
  { id: 23, name: 'Fitness Centers', icon: '🏋️‍♂️' },
  { id: 24, name: 'Educational Services', icon: '🎓' },
  { id: 25, name: 'Home Services', icon: '🏠' },
]

const Cats = () => {
  const containerRef = useRef(null)

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -200, behavior: 'smooth' })
  }

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 200, behavior: 'smooth' })
  }

  return (
    <div className='relative'>
      <div className='flex items-center'>
        <button
          className='absolute left-0 z-10 p-2 bg-gray-200 rounded-full hover:bg-gray-300'
          onClick={scrollLeft}
        >
          <FaArrowLeft />
        </button>
        <div
          ref={containerRef}
          className='flex overflow-x-auto space-x-4 py-4 px-2 scrollbar-hide'
          style={{ overflowY: 'hidden' }} // Hide vertical scrollbar
        >
          {filterOptions.map((category) => (
            <div
              key={category.id}
              className='flex-shrink-0 w-24 min-w-max h-24 flex flex-col items-center justify-center bg-white border rounded-lg p-4 text-center font-light transition-colors duration-300 ease-in-out hover:bg-gray-200 sm:w-20 sm:h-20 text-xs sm:text-sm'
            >
              <div className='text-3xl sm:text-xl'>{category.icon}</div>
              <span className='mt-2'>{category.name}</span>
            </div>
          ))}
        </div>
        <button
          className='absolute right-0 z-10 p-2 bg-gray-200 rounded-full hover:bg-gray-300'
          onClick={scrollRight}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  )
}

export default Cats
