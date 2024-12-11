import { AnimatePresence, motion } from 'framer-motion'
import {
  BarChart2,
  Building2,
  ChevronLeft,
  DoorOpen,
  Flame,
  HandHelping,
  MailCheck,
  MapPinned,
  PanelsTopLeft,
  ScanEye,
  Settings,
  SquareMenu,
  UserRoundCheck,
} from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const SIDEBAR_ITEMS = [
  {
    name: 'Dashboard',
    icon: BarChart2,
    color: '#6366f1',
    href: '/',
    // badge: 'New',
  },
  {
    name: 'My Feed',
    icon: PanelsTopLeft,
    color: '#f07407',
    href: '/myfeed',
  },
  {
    name: 'Business',
    icon: Building2,
    color: '#8B5CF6',
    href: '/business',
  },
  {
    name: 'Subscribers',
    icon: UserRoundCheck,
    color: '#EC4899',
    href: '/subscribers',
  },
  {
    name: 'Subscribed Flyers',
    icon: MailCheck,
    color: '#48e1ec',
    href: '/subscribed-flyers',
  },
  {
    name: 'Digital Flyer',
    icon: SquareMenu,
    color: '#10B981',
    href: '/sales',
  },
  {
    name: 'Review Filter',
    icon: ScanEye,
    color: '#F59E0B',
    href: '/Bookings',
  },
  {
    name: 'Short Term Rentals',
    icon: HandHelping,
    color: '#76f333',
    href: '/short-term-rentals',
  },
  {
    name: 'My Rentals',
    icon: DoorOpen,
    color: '#ff9500',
    href: '/my-rentals',
  },
  {
    name: 'Local Guide',
    icon: MapPinned,
    color: '#881bc8',
    href: '/local-guide',
  },
  {
    name: 'Membership',
    icon: Flame,
    color: '#3B82F6',
    href: '/Membership',
    badge: 'Pro',
  },
  {
    name: 'Settings',
    icon: Settings,
    color: '#6EE7B7',
    href: '/settings',
  },
]

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()
  const scrollContainerRef = useRef(null)
  const [hoveredItem, setHoveredItem] = useState(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 915)
      if (window.innerWidth < 915) {
        setIsSidebarOpen(false)
      }
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const isCollapsed = !isSidebarOpen || isMobile

  return (
    <motion.div
      initial={false}
      animate={{
        width: isCollapsed ? 80 : 240,
      }}
      className='relative z-10 flex-shrink-0 h-screen'
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className='h-full bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col border-r border-gray-700/50 shadow-2xl'>
        {/* Logo Section */}
        <motion.div
          className='flex flex-col items-center py-6 border-b border-gray-700/50 relative'
          initial={false}
          animate={{
            paddingLeft: isCollapsed ? '0.75rem' : '1.5rem',
            paddingRight: isCollapsed ? '0.75rem' : '1.5rem',
          }}
        >
          <motion.div
            className='relative bg-gradient-to-br from-purple-400 to-purple-600 p-2 rounded-xl shadow-lg'
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src='weblogo.png'
              alt='Logo'
              className='object-contain rounded-lg transition-all duration-200 w-12 h-12'
            />
          </motion.div>

          {!isMobile && (
            <motion.button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className='absolute -right-3 top-8 p-1.5 rounded-full bg-gray-800 border border-gray-600 shadow-lg hover:bg-gray-700 transition-colors'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft
                size={16}
                className={`transform transition-transform duration-200 text-gray-300 ${
                  !isCollapsed ? 'rotate-180' : ''
                }`}
              />
            </motion.button>
          )}
        </motion.div>

        {/* Navigation Section */}
        <nav
          ref={scrollContainerRef}
          className='flex-grow overflow-y-auto overflow-x-hidden py-4 px-3 space-y-1'
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#4B5563 transparent',
          }}
        >
          <AnimatePresence>
            {SIDEBAR_ITEMS.map((item) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={item.href}
                  onMouseEnter={() => setHoveredItem(item.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <motion.div
                    className={`flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                      location.pathname === item.href
                        ? 'bg-gray-700/50 shadow-lg'
                        : 'hover:bg-gray-700/30'
                    }`}
                    whileHover={{ x: isCollapsed ? 0 : 4 }}
                  >
                    <motion.div
                      className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4/6 rounded-full ${
                        location.pathname === item.href
                          ? 'bg-gradient-to-b from-blue-400 to-blue-600'
                          : 'bg-transparent'
                      }`}
                      initial={false}
                      animate={{
                        height: location.pathname === item.href ? '60%' : '0%',
                      }}
                      transition={{ duration: 0.2 }}
                    />

                    <div className='flex items-center gap-3 min-w-0'>
                      <motion.div
                        className={`relative rounded-lg p-2 ${
                          location.pathname === item.href
                            ? 'bg-gray-600/50'
                            : ''
                        }`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <item.icon
                          size={18}
                          className='flex-shrink-0'
                          style={{
                            color:
                              location.pathname === item.href
                                ? '#fff'
                                : item.color,
                            opacity: location.pathname === item.href ? 1 : 0.8,
                          }}
                        />
                      </motion.div>

                      {!isCollapsed && (
                        <div className='flex items-center justify-between flex-1'>
                          <span
                            className={`truncate text-sm font-medium transition-colors duration-200 ${
                              location.pathname === item.href
                                ? 'text-gray-100'
                                : 'text-gray-400'
                            }`}
                          >
                            {item.name}
                          </span>
                          {item.badge && (
                            <span className='ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white'>
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </nav>
      </div>
    </motion.div>
  )
}

export default Sidebar
