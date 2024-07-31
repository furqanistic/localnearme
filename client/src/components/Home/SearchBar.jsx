import { useState } from 'react'

const SearchBar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All categories')

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible)
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setDropdownVisible(false)
  }

  return (
    <>
      <form className='max-w-lg mx-auto m-5 px-8 '>
        <div className='flex relative'>
          <button
            id='dropdown-button'
            onClick={toggleDropdown}
            className='flex-shrink-0 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600'
            type='button'
          >
            {selectedCategory}
            <svg
              className='w-2.5 h-2.5 ms-2.5'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 10 6'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m1 1 4 4 4-4'
              />
            </svg>
          </button>
          {dropdownVisible && (
            <div
              id='dropdown'
              className='absolute left-0 top-full mt-1 z-10 bg-white divide-y divide-gray-100 shadow w-36 dark:bg-gray-700'
            >
              <ul
                className='py-2 text-sm text-gray-700 dark:text-gray-200'
                aria-labelledby='dropdown-button'
              >
                {['Airbnb', 'Store', 'Local Guide'].map((category) => (
                  <li key={category}>
                    <button
                      type='button'
                      className='inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className='relative w-full'>
            <input
              type='search'
              id='search-dropdown'
              className='block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-deep-purple-500 focus:border-deep-purple-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-deep-purple-500'
              placeholder='Search City Name...'
              required
            />
            <button
              type='submit'
              className='absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-deep-purple-700 rounded-e-lg border border-deep-purple-700 hover:bg-deep-purple-800 focus:ring-4 focus:outline-none focus:ring-deep-purple-300 dark:bg-deep-purple-600 dark:hover:bg-deep-purple-700 dark:focus:ring-deep-purple-800'
            >
              <svg
                className='w-4 h-4'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                />
              </svg>
              <span className='sr-only'>Search</span>
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default SearchBar
