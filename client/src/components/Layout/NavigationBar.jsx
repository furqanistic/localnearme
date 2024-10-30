import { logout } from '@/redux/userSlice'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Bookmark,
  BookOpen,
  Calendar,
  ChevronDown,
  CircleUserRound,
  Coffee,
  DollarSign,
  Globe,
  Home,
  LayoutDashboard,
  LogOut,
  Mail,
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
import { Link, useNavigate } from 'react-router-dom'

const NavItem = ({ icon: Icon, label, href, onClick, hasDropdown }) => (
  <div className='relative group'>
    <a
      href={href}
      onClick={onClick}
      className='flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 ease-in-out'
    >
      <Icon className='w-5 h-5 mr-2' />
      <span>{label}</span>
      {hasDropdown && (
        <ChevronDown className='w-4 h-4 ml-1 group-hover:transform group-hover:rotate-180 transition-transform duration-200' />
      )}
    </a>
  </div>
)

const DropdownItem = ({ icon: Icon, label, description, href }) => (
  <Link
    to={href}
    className='flex items-start p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 ease-in-out'
  >
    <Icon className='flex-shrink-0 h-6 w-6 text-gray-400' />
    <div className='ml-4'>
      <p className='text-sm font-medium text-gray-900'>{label}</p>
      <p className='mt-1 text-xs text-gray-500'>{description}</p>
    </div>
  </Link>
)

const Navigationbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [language, setLanguage] = useState('English')
  const dropdownRef = useRef(null)
  const { currentUser } = useSelector((state) => state.user)
  const activeUser = currentUser?.data?.user || null
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const toggleMenu = () => setIsOpen(!isOpen)
  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const dropdownContent = {
    explore: [
      {
        icon: ShoppingBag,
        label: 'Stores',
        description: 'Find all stores, sort by trending here!',
        href: '/trending',
      },
      {
        icon: MapPin,
        label: 'Local Guides',
        description:
          'Guides for local areas, showcasing various stores and services.',
        href: '/local-guide',
      },
      {
        icon: DollarSign,
        label: 'Plan & Pricing',
        description:
          'Details about different subscription plans and their features.',
        href: '/pricing',
      },
      {
        icon: Mail,
        label: 'Digital Flyer',
        description:
          'Information about subscribing to digital flyers and managing preferences.',
        href: '/digital-flyer',
      },
    ],
    more: [
      {
        icon: User,
        label: 'Create Profile',
        description: 'Create your online profile or storefront.',
        href: '/create-profile',
      },
      {
        icon: BookOpen,
        label: 'Guides',
        description: 'Learn how to maximize our platform.',
        href: '/guides',
      },
      {
        icon: Calendar,
        label: 'Events',
        description:
          'See what meet-ups and events we might be planning near you.',
        href: '/events',
      },
      {
        icon: Shield,
        label: 'Security',
        description: 'Understand how we take your privacy seriously.',
        href: '/security',
      },
    ],
  }

  const languages = ['English', 'Deutsch', 'Français']

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const UserMenu = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    // Early return with loading state if user data isn't available yet
    if (!activeUser) {
      return (
        <div className='relative group'>
          <div className='flex items-center space-x-3 text-sm font-medium text-gray-300'>
            <div className='relative'>
              <CircleUserRound className='h-8 w-8 rounded-full bg-gray-700 p-1 animate-pulse' />
            </div>
            <div className='hidden sm:block space-y-1'>
              <div className='h-4 w-24 bg-gray-700 rounded animate-pulse'></div>
              <div className='h-3 w-16 bg-gray-700 rounded animate-pulse'></div>
            </div>
          </div>
        </div>
      )
    }

    const username =
      currentUser?.name?.toLowerCase().replace(/\s+/g, '') || 'user'

    return (
      <div className='relative group z-10'>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className='flex items-center space-x-3 text-sm font-medium text-gray-300 hover:text-white focus:outline-none'
        >
          <div className='relative'>
            <CircleUserRound className='h-8 w-8 rounded-full bg-gray-700 p-1' />
            <div className='absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-gray-900' />
          </div>
          <div className='hidden sm:block text-left'>
            <p className='text-sm font-semibold'>{activeUser.name}</p>
            <p className='text-xs text-gray-400'>@{username}</p>
          </div>
          <ChevronDown className='w-4 h-4 transition-transform duration-200 ease-in-out group-hover:rotate-180' />
        </button>

        <div
          className={`absolute right-0 mt-2 w-72 origin-top-right bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transform transition-all duration-200 ease-in-out ${
            isDropdownOpen
              ? 'scale-100 opacity-100'
              : 'scale-95 opacity-0 pointer-events-none'
          }`}
        >
          <div className='p-4 border-b border-gray-100'>
            <div className='flex items-center space-x-3'>
              <div className='relative'>
                <CircleUserRound className='h-12 w-12 rounded-full bg-gray-100 p-2' />
                <div className='absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-white' />
              </div>
              <div>
                <p className='text-sm font-semibold text-gray-900'>
                  {activeUser.name}
                </p>
                <p className='text-xs text-gray-500'>
                  {activeUser.email || 'Loading...'}
                </p>
              </div>
            </div>
          </div>

          <div className='py-2'>
            <Link
              to='/profile'
              className='group flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50'
            >
              <User className='mr-3 h-5 w-5 text-gray-400 group-hover:text-indigo-600' />
              <div>
                <p className='font-medium'>Profile & Settings</p>
                <p className='text-xs text-gray-500'>Manage your account</p>
              </div>
            </Link>

            <Link
              to='/collections'
              className='group flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50'
            >
              <Bookmark className='mr-3 h-5 w-5 text-gray-400 group-hover:text-indigo-600' />
              <div>
                <p className='font-medium'>Collections</p>
                <p className='text-xs text-gray-500'>
                  Subscription & Favourites
                </p>
              </div>
            </Link>

            <Link
              to='/dashboard'
              className='group flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50'
            >
              <LayoutDashboard className='mr-3 h-5 w-5 text-gray-400 group-hover:text-indigo-600' />
              <div>
                <p className='font-medium'>Dashboard</p>
                <p className='text-xs text-gray-500'>
                  View your activity and stats
                </p>
              </div>
            </Link>
          </div>

          <div className='border-t border-gray-100 py-2'>
            <button
              onClick={handleLogout}
              className='group flex w-full items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50'
            >
              <LogOut className='mr-3 h-5 w-5 text-red-400 group-hover:text-red-600' />
              <div>
                <p className='font-medium'>Sign out</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <nav className='bg-gray-900 shadow-lg'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo and branding */}
          <div className='flex items-center'>
            <Link to='/' className='flex-shrink-0 flex items-center gap-2'>
              <img
                className='h-8 w-auto sm:h-12 bg-white p-1 rounded'
                src='https://dashboard.bisslocal.com/weblogo.png'
                alt='Logo'
              />
              <h1 className='text-white text-lg sm:text-xl font-bold'>
                BissLocal
              </h1>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className='hidden md:flex items-center space-x-4'>
            <NavItem icon={Home} label='Home' href='/' />
            <NavItem
              icon={Search}
              label='Explore'
              hasDropdown
              onClick={() => toggleDropdown('explore')}
            />
            <NavItem icon={Coffee} label='About Us' href='/about' />
            <NavItem
              icon={LayoutDashboard}
              label='Dashboard'
              href='https://dashboard.bisslocal.com/'
            />
            <NavItem
              icon={Menu}
              label='More'
              hasDropdown
              onClick={() => toggleDropdown('more')}
            />
          </div>

          {/* User menu (desktop) */}
          <div className='hidden md:flex items-center space-x-4'>
            <div className='relative group'>
              <button className='flex items-center text-sm font-medium text-gray-300 hover:text-white focus:outline-none'>
                <Globe className='w-5 h-5 mr-2' />
                <span className='hidden sm:inline'>{language}</span>
                <ChevronDown className='w-4 h-4 ml-1 group-hover:transform group-hover:rotate-180 transition-transform duration-200' />
              </button>
              <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block'>
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
            {activeUser ? (
              <UserMenu />
            ) : (
              <>
                <Link
                  to='/login'
                  className='text-sm font-medium text-gray-300 hover:text-white'
                >
                  Sign in
                </Link>
                <Link
                  to='/signup'
                  className='px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300'
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden flex items-center'>
            <button
              onClick={toggleMenu}
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
            >
              <span className='sr-only'>Open main menu</span>
              {isOpen ? (
                <X className='block h-6 w-6' />
              ) : (
                <Menu className='block h-6 w-6' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown menus */}
      <AnimatePresence>
        {activeDropdown && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className='absolute left-0 w-full bg-white shadow-lg z-20'
          >
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                {dropdownContent[activeDropdown].map((item, index) => (
                  <DropdownItem key={index} {...item} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className='md:hidden'
          >
            <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800'>
              <NavItem icon={Home} label='Home' href='/' />
              <NavItem
                icon={Search}
                label='Explore'
                onClick={() => toggleDropdown('explore')}
              />
              <NavItem icon={Coffee} label='About Us' href='/about' />
              <NavItem
                icon={LayoutDashboard}
                label='Dashboard'
                href='https://dashboard.bisslocal.com/'
              />
              <NavItem
                icon={Menu}
                label='More'
                onClick={() => toggleDropdown('more')}
              />
            </div>
            <div className='pt-4 pb-3 border-t border-gray-700 bg-gray-800'>
              {currentUser ? (
                <div className='flex items-center px-5'>
                  <div className='flex-shrink-0'>
                    <CircleUserRound className='h-10 w-10 rounded-full text-gray-300' />
                  </div>
                  <div className='ml-3'>
                    <div className='text-base font-medium text-white'>
                      {currentUser.name}
                    </div>
                    <div className='text-sm font-medium text-gray-400'>
                      {currentUser.email}
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className='ml-auto flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                  >
                    <span className='sr-only'>Log out</span>
                    <LogOut className='h-6 w-6' aria-hidden='true' />
                  </button>
                </div>
              ) : (
                <div className='mt-3 px-2 space-y-1'>
                  <Link
                    to='/signup'
                    className='block px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300'
                  >
                    Sign up
                  </Link>
                  <Link
                    to='/login'
                    className='block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-300'
                  >
                    Sign in
                  </Link>
                </div>
              )}
              <div className='mt-3 px-2 space-y-1'>
                <button
                  onClick={() => toggleDropdown('language')}
                  className='flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-300'
                >
                  <Globe className='w-5 h-5 mr-2' />
                  {language}
                  <ChevronDown className='w-4 h-4 ml-auto' />
                </button>
                {activeDropdown === 'language' && (
                  <div className='mt-2 w-full bg-gray-700 rounded-md shadow-lg py-1'>
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang)
                          toggleDropdown('language')
                        }}
                        className='block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white'
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navigationbar
