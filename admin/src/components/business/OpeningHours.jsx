import { Clock, X } from 'lucide-react'
import React, { useState } from 'react'

const OpeningHours = ({ formData, setFormData }) => {
  const [showAllDays, setShowAllDays] = useState(false)

  const handleOpeningHoursChange = (day, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      openingHours: {
        ...prevData.openingHours,
        [day]: {
          ...prevData.openingHours[day],
          [field]: value,
        },
      },
    }))
  }

  const toggleClosed = (day) => {
    setFormData((prevData) => ({
      ...prevData,
      openingHours: {
        ...prevData.openingHours,
        [day]: prevData.openingHours[day].isClosed
          ? { open: '', close: '', isClosed: false }
          : { open: '', close: '', isClosed: true },
      },
    }))
  }

  const copyHours = (fromDay) => {
    const hours = formData.openingHours[fromDay]
    Object.keys(formData.openingHours).forEach((day) => {
      if (day !== fromDay) {
        setFormData((prevData) => ({
          ...prevData,
          openingHours: {
            ...prevData.openingHours,
            [day]: { ...hours },
          },
        }))
      }
    })
  }

  const daysOrder = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ]

  return (
    <div className='bg-gray-800 p-6 rounded-lg shadow-md'>
      <h3 className='text-xl font-semibold text-gray-100 mb-4 flex items-center'>
        <Clock className='mr-2' size={24} />
        Opening Hours
      </h3>
      <div className='space-y-4'>
        {daysOrder.map((day, index) => (
          <div
            key={day}
            className={`bg-gray-700 p-4 rounded-md ${
              !showAllDays && index > 4 ? 'hidden' : ''
            }`}
          >
            <div className='flex items-center justify-between mb-2'>
              <label className='text-sm font-medium text-gray-300 capitalize'>
                {day}
              </label>
              <div className='flex items-center space-x-2'>
                <button
                  type='button'
                  onClick={() => toggleClosed(day)}
                  className={`px-2 py-1 text-xs font-semibold rounded ${
                    formData.openingHours[day].isClosed
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-600 text-gray-300'
                  }`}
                >
                  {formData.openingHours[day].isClosed ? 'Closed' : 'Open'}
                </button>
                {index === 0 && (
                  <button
                    type='button'
                    onClick={() => copyHours(day)}
                    className='px-2 py-1 text-xs font-semibold rounded bg-blue-500 text-white'
                  >
                    Copy to All
                  </button>
                )}
              </div>
            </div>
            {!formData.openingHours[day].isClosed && (
              <div className='flex items-center space-x-2'>
                <div className='flex-1'>
                  <label className='block text-xs text-gray-400 mb-1'>
                    Open
                  </label>
                  <input
                    type='time'
                    value={formData.openingHours[day].open}
                    onChange={(e) =>
                      handleOpeningHoursChange(day, 'open', e.target.value)
                    }
                    className='w-full p-2 bg-gray-600 text-white rounded-md border border-gray-500 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
                  />
                </div>
                <div className='flex-1'>
                  <label className='block text-xs text-gray-400 mb-1'>
                    Close
                  </label>
                  <input
                    type='time'
                    value={formData.openingHours[day].close}
                    onChange={(e) =>
                      handleOpeningHoursChange(day, 'close', e.target.value)
                    }
                    className='w-full p-2 bg-gray-600 text-white rounded-md border border-gray-500 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {!showAllDays && (
        <button
          type='button'
          onClick={() => setShowAllDays(true)}
          className='mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium'
        >
          Show all days
        </button>
      )}
    </div>
  )
}

export default OpeningHours
