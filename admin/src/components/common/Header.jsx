import { AnimatePresence, motion } from 'framer-motion'
import {
  Bell,
  ChevronDown,
  Clock,
  LogOut,
  MapPin,
  Settings,
  Shield,
  User,
} from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../redux/userSlice'

const Header = ({ title }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loggedUser = currentUser?.data?.user
  const userData = loggedUser || {
    name: 'Guest User',
    role: 'Regular',
    email: 'guest@example.com',
    location: 'Unknown Location',
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const formatLastLogin = (lastLoginDate) => {
    if (!lastLoginDate) return 'Never'
    return new Date(lastLoginDate).toLocaleString()
  }

  const handleLogout = () => {
    setIsDropdownOpen(false)
    dispatch(logout())
    navigate('/auth')
  }

  return (
    <header className='bg-gray-800/50 backdrop-blur-md border-b border-gray-800/50 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className='text-xl sm:text-2xl font-semibold text-white'
          >
            {title}
          </motion.h1>

          {/* User Menu */}
          <div className='flex items-center space-x-4'>
            {/* Notifications */}
            <button className='p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors'>
              <Bell size={20} />
            </button>

            {/* Profile Dropdown */}
            <div className='relative' ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className='flex items-center space-x-3 p-1.5 rounded-lg hover:bg-gray-800/50 transition-all duration-200'
              >
                <div className='relative'>
                  {userData.image ? (
                    <img
                      className='h-8 w-8 rounded-full object-cover ring-2 ring-gray-700'
                      src={userData.image}
                      alt={userData.name}
                    />
                  ) : (
                    <div className='h-8 w-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 ring-2 ring-gray-700 flex items-center justify-center'>
                      <User className='h-4 w-4 text-gray-300' />
                    </div>
                  )}
                  <div className='absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-gray-800' />
                </div>

                <div className='hidden sm:block text-left'>
                  <div className='text-sm font-medium text-white'>
                    {userData.name}
                  </div>
                  <div className='text-xs text-gray-400 capitalize flex items-center'>
                    <Shield className='w-3 h-3 mr-1' />
                    {userData.role}
                  </div>
                </div>

                <ChevronDown
                  className={`h-4 w-4 text-gray-400 transition-transform duration-200 
                    ${isDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className='absolute right-0 mt-2 w-72 rounded-xl shadow-lg bg-gray-800 border border-gray-700 overflow-hidden'
                  >
                    {/* User Info */}
                    <div className='p-4 bg-gray-800/50 border-b border-gray-700/50'>
                      <div className='flex items-center space-x-3'>
                        {userData.image ? (
                          <img
                            className='h-12 w-12 rounded-full'
                            src={userData.image}
                            alt={userData.name}
                          />
                        ) : (
                          <div className='h-12 w-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center'>
                            <User className='h-6 w-6 text-gray-300' />
                          </div>
                        )}
                        <div>
                          <div className='text-sm font-medium text-white'>
                            {userData.name}
                          </div>
                          <div className='text-sm text-gray-400'>
                            {userData.email}
                          </div>
                        </div>
                      </div>

                      <div className='mt-3 text-xs text-gray-400 space-y-1'>
                        <div className='flex items-center'>
                          <Clock className='w-3 h-3 mr-1' />
                          Last active: {formatLastLogin(userData.lastLogin)}
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className='py-1'>
                      <a
                        href='/settings'
                        className='flex items-center px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors'
                      >
                        <Settings className='mr-2 h-4 w-4' />
                        Account Settings
                      </a>

                      <button
                        onClick={handleLogout}
                        className='w-full flex items-center px-4 py-2.5 text-sm text-red-400 hover:bg-gray-700/50 transition-colors'
                      >
                        <LogOut className='mr-2 h-4 w-4' />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
