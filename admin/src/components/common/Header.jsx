import { AnimatePresence, motion } from 'framer-motion'
import {
  Bell,
  ChevronDown,
  Clock,
  LogOut,
  Settings,
  Shield,
  User,
} from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../redux/userSlice'

const Header = ({ title }) => {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.user)

  const userData = currentUser?.data?.user || {
    name: 'Guest User',
    role: 'Regular',
    email: 'guest@example.com',
    lastLogin: new Date().toISOString(),
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const formatLastLogin = (lastLoginDate) => {
    if (!lastLoginDate) return 'Never'
    const date = new Date(lastLoginDate)
    const now = new Date()
    const diffMinutes = Math.floor((now - date) / (1000 * 60))

    if (diffMinutes < 60) return `${diffMinutes}m ago`
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const handleLogout = () => {
    setShowMenu(false)
    dispatch(logout())
    navigate('/auth')
  }

  return (
    <header className='bg-gray-800/50 backdrop-blur-md border-b border-gray-700/50 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 h-16 flex items-center justify-between'>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className='text-xl font-semibold text-white'
        >
          {title}
        </motion.h1>

        <div className='flex items-center gap-3'>
          <button className='relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors'>
            <Bell size={20} />
            <span className='absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full' />
          </button>

          <div className='relative' ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className='flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50 transition-all duration-200'
            >
              <div className='relative'>
                <div className='h-8 w-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 ring-2 ring-gray-600 flex items-center justify-center'>
                  {userData.image ? (
                    <img
                      src={userData.image}
                      alt={userData.name}
                      className='h-full w-full rounded-full object-cover'
                    />
                  ) : (
                    <User className='h-4 w-4 text-gray-300' />
                  )}
                </div>
                <div className='absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-gray-800' />
              </div>

              <div className='hidden sm:block text-left'>
                <p className='text-sm font-medium text-white'>
                  {userData.name}
                </p>
                <div className='flex items-center text-xs text-gray-400'>
                  <Shield className='w-3 h-3 mr-1' />
                  <span className='capitalize'>{userData.role}</span>
                </div>
              </div>

              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform duration-200
                  ${showMenu ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className='absolute right-0 mt-2 w-72 rounded-xl bg-gray-800 border border-gray-700 shadow-lg overflow-hidden'
                >
                  <div className='p-4 bg-gray-800/50 border-b border-gray-700/50'>
                    <div className='flex items-center gap-3'>
                      <div className='h-12 w-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center'>
                        {userData.image ? (
                          <img
                            src={userData.image}
                            alt={userData.name}
                            className='h-full w-full rounded-full object-cover'
                          />
                        ) : (
                          <User className='h-6 w-6 text-gray-300' />
                        )}
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='text-sm font-medium text-white truncate'>
                          {userData.name}
                        </p>
                        <p className='text-sm text-gray-400 truncate'>
                          {userData.email}
                        </p>
                        <div className='flex items-center mt-1 text-xs text-gray-400'>
                          <Shield className='w-3 h-3 mr-1' />
                          <span className='capitalize'>{userData.role}</span>
                        </div>
                      </div>
                    </div>

                    <div className='mt-3 pt-3 border-t border-gray-700/50'>
                      <div className='flex items-center text-xs text-gray-400'>
                        <Clock className='w-3 h-3 mr-1' />
                        <span>
                          Last active: {formatLastLogin(userData.lastLogin)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className='p-1'>
                    <button
                      onClick={() => navigate('/settings')}
                      className='w-full flex items-center gap-2 px-3 py-2.5 text-sm text-gray-300 hover:bg-gray-700/50 rounded-lg transition-colors'
                    >
                      <Settings className='w-4 h-4' />
                      Account Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className='w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-400 hover:bg-gray-700/50 rounded-lg transition-colors'
                    >
                      <LogOut className='w-4 h-4' />
                      Sign out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
