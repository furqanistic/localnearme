import { AnimatePresence, motion } from 'framer-motion'
import {
  BarChart2,
  Building2,
  CookingPot,
  Flame,
  HandHelping,
  MailCheck,
  MapPinned,
  Menu,
  PanelsTopLeft,
  ScanEye,
  Settings,
  SquareMenu,
  UserRoundCheck,
} from 'lucide-react'
import { useEffect, useState } from 'react'
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
    href: '/users',
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
    icon: CookingPot,

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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 915) // Adjust this breakpoint as needed
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

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen && !isMobile ? 'w-64' : 'w-20'
      }`}
      animate={{ width: isSidebarOpen && !isMobile ? 256 : 80 }}
    >
      <div className='h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700'>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleSidebar}
          className={`p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit ${
            isMobile ? 'pointer-events-none' : ''
          }`}
        >
          <Menu size={24} />
        </motion.button>
        <nav className='mt-8 flex-grow'>
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2'>
                <item.icon
                  size={20}
                  style={{ color: item.color, minWidth: '20px' }}
                />
                <AnimatePresence>
                  {isSidebarOpen && !isMobile && (
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
        </nav>
      </div>
    </motion.div>
  )
}

export default Sidebar
