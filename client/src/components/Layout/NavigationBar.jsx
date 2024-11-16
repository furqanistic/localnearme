import { logout } from '@/redux/userSlice'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Bookmark,
  CircleUserRound,
  Coffee,
  FileText,
  Globe,
  Home,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  Search,
  Shield,
  ShoppingBag,
  User,
  X,
} from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const NavItem = ({ icon: Icon, label, to, onClick, hasDropdown, isActive }) => (
  <div className='relative group'>
    {onClick ? (
      <button
        onClick={onClick}
        className={`flex items-center px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
          isActive
            ? 'text-white bg-gray-700'
            : 'text-gray-300 hover:text-white hover:bg-gray-800'
        }`}
      >
        <Icon className='w-5 h-5 mr-2' />
        <span>{label}</span>
        {hasDropdown && (
          <svg
            className='w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 9l-7 7-7-7'
            />
          </svg>
        )}
      </button>
    ) : (
      <Link
        to={to}
        className={`flex items-center px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
          isActive
            ? 'text-white bg-gray-700'
            : 'text-gray-300 hover:text-white hover:bg-gray-800'
        }`}
      >
        <Icon className='w-5 h-5 mr-2' />
        <span>{label}</span>
      </Link>
    )}
  </div>
)

const DropdownItem = ({ icon: Icon, label, description, href }) => (
  <Link
    to={href}
    className='flex items-start p-4 rounded-xl hover:bg-gray-50 transition-all duration-200'
  >
    <Icon className='flex-shrink-0 h-6 w-6 text-indigo-500' />
    <div className='ml-4'>
      <p className='text-sm font-medium text-gray-900'>{label}</p>
      <p className='mt-1 text-sm text-gray-500'>{description}</p>
    </div>
  </Link>
)

const UserMenu = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false)

  if (!user) {
    return (
      <div className='flex items-center space-x-3'>
        <Link
          to='/login'
          className='text-sm font-medium text-gray-300 hover:text-white px-4 py-2 rounded-full transition-all duration-200 hover:bg-gray-800'
        >
          Sign in
        </Link>
        <Link
          to='/signup'
          className='px-4 py-2 rounded-full text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-200 shadow-lg shadow-indigo-500/30'
        >
          Sign up
        </Link>
      </div>
    )
  }

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center space-x-3 text-sm font-medium text-gray-300 hover:text-white focus:outline-none rounded-full p-2 hover:bg-gray-800 transition-all duration-200'
      >
        <div className='relative'>
          <CircleUserRound className='h-8 w-8 rounded-full bg-indigo-500/20 p-1 text-indigo-500' />
          <div className='absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-gray-900' />
        </div>
        <div className='hidden sm:block text-left'>
          <p className='text-sm font-semibold'>{user.name}</p>
          <p className='text-xs text-gray-400'>
            @{user.name?.toLowerCase().replace(/\s+/g, '')}
          </p>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className='absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl ring-1 ring-black ring-opacity-5 backdrop-blur-lg'
          >
            <div className='p-6 border-b border-gray-100'>
              <div className='flex items-center space-x-4'>
                <div className='relative'>
                  <CircleUserRound className='h-16 w-16 rounded-full bg-indigo-500/20 p-3 text-indigo-500' />
                  <div className='absolute bottom-0 right-0 h-4 w-4 rounded-full bg-green-400 border-3 border-white' />
                </div>
                <div>
                  <p className='text-lg font-semibold text-gray-900'>
                    {user.name}
                  </p>
                  <p className='text-sm text-gray-500'>{user.email}</p>
                </div>
              </div>
            </div>

            <div className='p-2'>
              <Link
                to='/profile'
                className='group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200'
              >
                <User className='mr-3 h-5 w-5 text-gray-400 group-hover:text-indigo-500' />
                <div>
                  <p className='font-medium'>Profile & Settings</p>
                  <p className='text-xs text-gray-500'>
                    Manage your account preferences
                  </p>
                </div>
              </Link>

              <Link
                to='/collections'
                className='group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200'
              >
                <Bookmark className='mr-3 h-5 w-5 text-gray-400 group-hover:text-indigo-500' />
                <div>
                  <p className='font-medium'>Collections</p>
                  <p className='text-xs text-gray-500'>
                    View saved items and lists
                  </p>
                </div>
              </Link>
            </div>

            <div className='p-2 border-t border-gray-100'>
              <button
                onClick={onLogout}
                className='group flex w-full items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200'
              >
                <LogOut className='mr-3 h-5 w-5 text-red-400 group-hover:text-red-600' />
                <div>
                  <p className='font-medium'>Sign out</p>
                  <p className='text-xs text-red-500'>
                    Log out of your account
                  </p>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const Navigationbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [language, setLanguage] = useState('English')
  const dropdownRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { currentUser } = useSelector((state) => state.user)

  const languages = ['English', 'Deutsch', 'Français']

  const exploreItems = [
    {
      icon: ShoppingBag,
      label: 'Stores',
      description: 'Discover trending stores and services',
      href: '/trending',
    },
    {
      icon: MapPin,
      label: 'Local Guides',
      description: 'Explore curated local area guides',
      href: '/local-guide',
    },
    {
      icon: Shield,
      label: 'Privacy Policy',
      description: 'Learn about our privacy practices',
      href: '/privacy',
    },
    {
      icon: FileText,
      label: 'Terms of Service',
      description: 'Review our terms and conditions',
      href: '/terms',
    },
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
    }

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <nav className='bg-gray-900/50 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <Link to='/' className='flex items-center gap-3 group'>
            <div className='relative'>
              <div className='absolute inset-0 bg-indigo-500 rounded-lg blur group-hover:blur-md transition-all duration-300'></div>
              <img
                className='h-10 w-auto sm:h-12 bg-white p-1.5 rounded-lg relative'
                src='https://dashboard.bisslocal.com/weblogo.png'
                alt='BissLocal'
              />
            </div>
            <h1 className='text-white text-xl sm:text-2xl font-bold'>
              BissLocal
            </h1>
          </Link>

          <div className='hidden md:flex items-center space-x-2'>
            <NavItem
              icon={Home}
              label='Home'
              to='/'
              isActive={location.pathname === '/'}
            />
            <NavItem
              icon={Coffee}
              label='About'
              to='/about'
              isActive={location.pathname === '/about'}
            />
            <NavItem
              icon={Search}
              label='Explore'
              hasDropdown
              onClick={() =>
                setActiveDropdown(
                  activeDropdown === 'explore' ? null : 'explore'
                )
              }
              isActive={activeDropdown === 'explore'}
            />
            <NavItem
              icon={LayoutDashboard}
              label='Dashboard'
              to='/dashboard'
              isActive={location.pathname === '/dashboard'}
            />
          </div>

          <div className='hidden md:flex items-center space-x-4'>
            <div className='relative group'>
              <button className='flex items-center text-sm font-medium text-gray-300 hover:text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-all duration-200'>
                <Globe className='w-5 h-5 mr-2' />
                <span>{language}</span>
              </button>
              <div className='absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-1 z-10 hidden group-hover:block border border-gray-100'>
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200'
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
            <UserMenu user={currentUser?.data?.user} onLogout={handleLogout} />
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className='md:hidden p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200'
          >
            {isOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {activeDropdown === 'explore' && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className='absolute left-0 w-full bg-white shadow-xl z-20 rounded-b-2xl border-t border-gray-100'
          >
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {exploreItems.map((item, index) => (
                  <DropdownItem key={index} {...item} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className='absolute top-16 left-0 right-0 bg-gray-800/50 backdrop-blur-lg border-t border-gray-700 md:hidden'
          >
            <div className='px-4 py-2 space-y-1'>
              <NavItem
                icon={Home}
                label='Home'
                href='/'
                isActive={location.pathname === '/'}
              />
              <NavItem
                icon={Search}
                label='Explore'
                hasDropdown
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === 'explore' ? null : 'explore'
                  )
                }
                isActive={activeDropdown === 'explore'}
              />
              <NavItem
                icon={LayoutDashboard}
                label='Dashboard'
                href='https://dashboard.bisslocal.com/'
                isActive={location.pathname === '/dashboard'}
              />
            </div>

            <div className='px-4 py-2 border-t border-gray-700'>
              {currentUser?.data?.user ? (
                <div className='space-y-1'>
                  <div className='flex items-center space-x-3 p-2'>
                    <CircleUserRound className='h-8 w-8 rounded-full bg-indigo-500/20 p-1 text-indigo-500' />
                    <div>
                      <p className='text-sm font-medium text-white'>
                        {currentUser.data.user.name}
                      </p>
                      <p className='text-xs text-gray-400'>
                        {currentUser.data.user.email}
                      </p>
                    </div>
                  </div>

                  <Link
                    to='/profile'
                    className='block px-2 py-1 text-sm text-gray-300 hover:text-white rounded-lg'
                  >
                    Profile & Settings
                  </Link>
                  <Link
                    to='/collections'
                    className='block px-2 py-1 text-sm text-gray-300 hover:text-white rounded-lg'
                  >
                    Collections
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='block w-full text-left px-2 py-1 text-sm text-red-400 hover:text-red-300 rounded-lg'
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div className='space-y-2 p-2'>
                  <Link
                    to='/login'
                    className='block w-full px-4 py-2 text-center text-sm font-medium text-white hover:bg-gray-700 rounded-lg'
                  >
                    Sign in
                  </Link>
                  <Link
                    to='/signup'
                    className='block w-full px-4 py-2 text-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg'
                  >
                    Sign up
                  </Link>
                </div>
              )}

              <div className='pt-2 border-t border-gray-700 mt-2'>
                <button
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === 'language' ? null : 'language'
                    )
                  }
                  className='flex items-center justify-between w-full px-2 py-1 text-sm text-gray-300 hover:text-white'
                >
                  <span className='flex items-center'>
                    <Globe className='w-5 h-5 mr-2' />
                    Language
                  </span>
                  <span>{language}</span>
                </button>

                <AnimatePresence>
                  {activeDropdown === 'language' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className='mt-1 py-1 bg-gray-700/50 rounded-lg'
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            setLanguage(lang)
                            setActiveDropdown(null)
                          }}
                          className='block w-full text-left px-4 py-1 text-sm text-gray-300 hover:text-white hover:bg-gray-600/50'
                        >
                          {lang}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className='flex space-x-4 px-2 py-2 border-t border-gray-700 mt-2'>
                <Link
                  to='/privacy'
                  className='text-sm text-gray-400 hover:text-white'
                >
                  Privacy Policy
                </Link>
                <Link
                  to='/terms'
                  className='text-sm text-gray-400 hover:text-white'
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navigationbar
