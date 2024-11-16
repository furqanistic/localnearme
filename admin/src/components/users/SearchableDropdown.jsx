import { ChevronDown, Search } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

const SearchableDropdown = ({
  options = [],
  value,
  onChange,
  isLoading,
  error,
  placeholder = 'Search businesses...',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef(null)

  // Filter options based on search query
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle option selection
  const handleSelect = (option) => {
    onChange(option)
    setIsOpen(false)
    setSearchQuery('')
  }

  // Render loading state
  if (isLoading) {
    return (
      <div className='w-full sm:w-64 bg-gray-700 text-gray-400 rounded-lg pl-4 pr-10 py-2'>
        Loading...
      </div>
    )
  }

  // Render error state
  if (error) {
    return (
      <div className='w-full sm:w-64 bg-gray-700 text-red-400 rounded-lg pl-4 pr-10 py-2'>
        Error loading businesses
      </div>
    )
  }

  // Render empty state
  if (!options.length) {
    return (
      <div className='w-full sm:w-64 bg-gray-700 text-gray-400 rounded-lg pl-4 pr-10 py-2'>
        No businesses found
      </div>
    )
  }

  return (
    <div className='relative w-full sm:w-64' ref={dropdownRef}>
      {/* Selected value display / dropdown trigger */}
      <div
        className='w-full bg-gray-700 text-white rounded-lg pl-4 pr-10 py-2 cursor-pointer flex items-center justify-between'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className='truncate'>{value?.label || placeholder}</span>
        <ChevronDown
          className={`absolute right-3 top-2.5 text-gray-400 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          size={18}
        />
      </div>

      {/* Dropdown panel */}
      {isOpen && (
        <div className='absolute z-50 w-full mt-1 bg-gray-700 rounded-lg shadow-lg border border-gray-600 max-h-64 overflow-hidden'>
          {/* Search input */}
          <div className='p-2 border-b border-gray-600 sticky top-0 bg-gray-700'>
            <div className='relative'>
              <input
                type='text'
                className='w-full bg-gray-800 text-white placeholder-gray-400 rounded-md pl-8 pr-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Search...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
              <Search
                className='absolute left-2 top-2 text-gray-400'
                size={16}
              />
            </div>
          </div>

          {/* Options list */}
          <div className='overflow-y-auto max-h-48'>
            {filteredOptions.length === 0 ? (
              <div className='px-4 py-2 text-gray-400'>No matches found</div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-600 ${
                    value?.value === option.value ? 'bg-gray-600' : ''
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  <div className='text-white'>{option.label}</div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchableDropdown
