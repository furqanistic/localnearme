import { AnimatePresence, motion } from 'framer-motion'
import {
  BarChart2,
  Building2,
  DoorOpen,
  Flame,
  HandHelping,
  LogIn,
  LogOut,
  MailCheck,
  MapPinned,
  Menu,
  PanelsTopLeft,
  ScanEye,
  Settings,
  SquareMenu,
  UserRoundCheck,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const SIDEBAR_ITEMS = [
  {
    name: 'Dashboard',
    icon: BarChart2,
    color: '#6366f1',
    href: '/',
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
  { name: 'Digital Flyer', icon: SquareMenu, color: '#10B981', href: '/sales' },
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
  },
  { name: 'Settings', icon: Settings, color: '#6EE7B7', href: '/settings' },
]

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 915)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleSidebar = () => {
    if (!isMobile) {
      setIsSidebarOpen(!isSidebarOpen)
    }
  }

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0
    }
  }, [isSidebarOpen])

  const isCollapsed = !isSidebarOpen || isMobile

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
      animate={{ width: isCollapsed ? 80 : 256 }}
    >
      <div className='h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700'>
        <div className='flex flex-col items-center mb-8'>
          <motion.img
            src='weblogo.png'
            alt='Logo'
            className='w-34 h-34 object-contain mb-4 bg-blue-400 p-1 rounded'
            animate={{
              width: isCollapsed ? 48 : 64,
              height: isCollapsed ? 48 : 64,
            }}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleSidebar}
            className={`p-2 rounded-full hover:bg-gray-700 transition-colors ${
              isMobile ? 'pointer-events-none' : ''
            }`}
          >
            <Menu size={24} />
          </motion.button>
        </div>
        <nav
          ref={scrollContainerRef}
          className={`flex-grow ${
            isCollapsed ? 'overflow-y-auto' : 'overflow-y-auto'
          }`}
        >
          <div className={`flex flex-col`}>
            {SIDEBAR_ITEMS.map((item) => (
              <Link key={item.href} to={item.href} className='w-full'>
                <motion.div
                  className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2 ${
                    isCollapsed ? 'justify-center' : ''
                  }`}
                >
                  <item.icon
                    size={20}
                    style={{ color: item.color, minWidth: '20px' }}
                  />
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        className='ml-4 whitespace-nowrap'
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, delay: 0.3 }}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </motion.div>
  )
}

export default Sidebar
