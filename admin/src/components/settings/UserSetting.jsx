import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, Mail, Save } from 'lucide-react'
import { useState } from 'react'

// Mock function to update user settings - replace with actual API call
const updateUserSettings = async (settings) => {
  // Simulating API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log('Settings updated:', settings)
  return { success: true, message: 'Settings updated successfully!' }
}

const UserSettings = () => {
  const [settings, setSettings] = useState({
    email: 'user@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    newsletterEnabled: true,
    emailFrequency: 'weekly',
    restaurantEmails: true,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    // Basic form validation
    if (settings.newPassword !== settings.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' })
      setLoading(false)
      return
    }

    try {
      const result = await updateUserSettings(settings)
      setMessage({ type: 'success', text: result.message })
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to update settings. Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className='text-xl font-semibold text-gray-100 mb-6'>
        Account Settings
      </h2>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Email Settings */}
        <div>
          <h3 className='text-lg font-medium text-gray-200 mb-4'>
            Email Settings
          </h3>
          <div className='space-y-4'>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-300'
              >
                Email Address
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  type='email'
                  name='email'
                  id='email'
                  className='bg-gray-700 text-white block w-full pl-10 pr-3 py-2 rounded-md border-gray-600 focus:ring-indigo-500 focus:border-indigo-500'
                  value={settings.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Password Change */}
        <div>
          <h3 className='text-lg font-medium text-gray-200 mb-4'>
            Change Password
          </h3>
          <div className='space-y-4'>
            {['currentPassword', 'newPassword', 'confirmPassword'].map(
              (field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className='block text-sm font-medium text-gray-300'
                  >
                    {field === 'currentPassword'
                      ? 'Current Password'
                      : field === 'newPassword'
                      ? 'New Password'
                      : 'Confirm New Password'}
                  </label>
                  <div className='mt-1 relative rounded-md shadow-sm'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <Lock className='h-5 w-5 text-gray-400' />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name={field}
                      id={field}
                      className='bg-gray-700 text-white block w-full pl-10 pr-10 py-2 rounded-md border-gray-600 focus:ring-indigo-500 focus:border-indigo-500'
                      value={settings[field]}
                      onChange={handleInputChange}
                    />
                    <div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                      <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='text-gray-400 hover:text-gray-300 focus:outline-none focus:text-gray-300'
                      >
                        {showPassword ? (
                          <EyeOff className='h-5 w-5' />
                        ) : (
                          <Eye className='h-5 w-5' />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Newsletter Preferences */}
        <div>
          <h3 className='text-lg font-medium text-gray-200 mb-4'>
            Newsletter Preferences
          </h3>
          <div className='space-y-4'>
            <div className='flex items-center'>
              <input
                id='newsletterEnabled'
                name='newsletterEnabled'
                type='checkbox'
                className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                checked={settings.newsletterEnabled}
                onChange={handleInputChange}
              />
              <label
                htmlFor='newsletterEnabled'
                className='ml-2 block text-sm text-gray-300'
              >
                Receive our newsletter
              </label>
            </div>
            {settings.newsletterEnabled && (
              <div>
                <label
                  htmlFor='emailFrequency'
                  className='block text-sm font-medium text-gray-300'
                >
                  Email Frequency
                </label>
                <select
                  id='emailFrequency'
                  name='emailFrequency'
                  className='mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-700 text-white border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md'
                  value={settings.emailFrequency}
                  onChange={handleInputChange}
                >
                  <option value='daily'>Daily</option>
                  <option value='weekly'>Weekly</option>
                  <option value='monthly'>Monthly</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Restaurant Email Preferences */}
        <div>
          <h3 className='text-lg font-medium text-gray-200 mb-4'>
            Restaurant Email Preferences
          </h3>
          <div className='flex items-center'>
            <input
              id='restaurantEmails'
              name='restaurantEmails'
              type='checkbox'
              className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
              checked={settings.restaurantEmails}
              onChange={handleInputChange}
            />
            <label
              htmlFor='restaurantEmails'
              className='ml-2 block text-sm text-gray-300'
            >
              Receive emails from favorite restaurants
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type='submit'
            disabled={loading}
            className={`flex items-center justify-center w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <svg
                className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
            ) : (
              <Save className='w-5 h-5 mr-2' />
            )}
            Save Changes
          </button>
        </div>
      </form>

      {/* Message Display */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 p-3 rounded ${
            message.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          <p className='text-white text-center'>{message.text}</p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default UserSettings
