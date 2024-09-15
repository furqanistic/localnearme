import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Search } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const SearchBar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All categories')
  const dropdownRef = useRef(null)

  const categories = ['All categories', 'Airbnb', 'Store', 'Local Guide']

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible)
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setDropdownVisible(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
      <form className='relative'>
        <div className='flex'>
          <div className='relative'>
            <button
              type='button'
              onClick={toggleDropdown}
              className='flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-l-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out'
            >
              {selectedCategory}
              <ChevronDown className='ml-2 h-4 w-4' />
            </button>
            <AnimatePresence>
              {dropdownVisible && (
                <motion.div
                  ref={dropdownRef}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className='absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10'
                >
                  <div
                    className='py-1'
                    role='menu'
                    aria-orientation='vertical'
                    aria-labelledby='options-menu'
                  >
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategorySelect(category)}
                        className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        role='menuitem'
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <input
            type='search'
            className='block w-full pl-4 pr-12 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-150 ease-in-out'
            placeholder='Search City Name...'
            required
          />
          <button
            type='submit'
            className='absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out'
          >
            <Search className='h-5 w-5' />
            <span className='sr-only'>Search</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchBar
