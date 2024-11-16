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
  },
  {
    name: 'Settings',
    icon: Settings,
    color: '#6EE7B7',
    href: '/settings',
  },
]

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeItem, setActiveItem] = useState('/')
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

  const isCollapsed = !isSidebarOpen || isMobile

  return (
    <div
      className={`relative z-10 flex-shrink-0 h-screen transition-[width] duration-200 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-60'
      }`}
    >
      <div className='h-full bg-gray-800 backdrop-blur-lg flex flex-col border-r border-gray-800/50 shadow-xl'>
        {/* Logo Section */}
        <div className='flex flex-col items-center py-5 border-b border-gray-800/50 relative'>
          <div className='relative bg-purple-200 p-1 rounded'>
            <img
              src='weblogo.png'
              alt='Logo'
              className={`object-contain rounded-xl transition-all duration-200 ${
                isCollapsed ? 'w-11 h-11' : 'w-12 h-12'
              }`}
            />
          </div>

          <button
            onClick={toggleSidebar}
            className={`absolute -right-2.5 top-6 p-1.5 rounded-full bg-gray-800/90 border border-gray-700/50 shadow-lg hover:bg-gray-900 transition-colors ${
              isMobile ? 'pointer-events-none opacity-0' : ''
            }`}
          >
            <ChevronLeft
              size={14}
              className={`transform transition-transform duration-200 ${
                !isCollapsed ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {/* Navigation Section */}
        <nav
          ref={scrollContainerRef}
          className='flex-grow overflow-y-auto overflow-x-hidden py-3 px-2'
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#4B5563 transparent',
          }}
        >
          <div className='space-y-0.5'>
            {SIDEBAR_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setActiveItem(item.href)}
                className='block'
              >
                <div
                  className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 group relative ${
                    activeItem === item.href
                      ? 'bg-gray-900/80'
                      : 'hover:bg-gray-900/40'
                  } ${!isCollapsed ? 'hover:translate-x-1' : ''}`}
                >
                  {/* Active Indicator */}
                  <div
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4/6 rounded-full transition-all duration-200 ${
                      activeItem === item.href
                        ? 'bg-blue-500'
                        : 'bg-transparent group-hover:bg-gray-900'
                    }`}
                  />

                  {/* Content */}
                  <div className='flex items-center gap-3 min-w-0'>
                    <div
                      className={`relative rounded-md p-1.5 transition-colors duration-200 ${
                        activeItem === item.href ? 'bg-gray-900/50' : ''
                      }`}
                    >
                      <item.icon
                        size={16}
                        className='flex-shrink-0 transition-colors duration-200'
                        style={{
                          color: activeItem === item.href ? '#fff' : item.color,
                          opacity: activeItem === item.href ? 1 : 0.8,
                        }}
                      />
                    </div>

                    {!isCollapsed && (
                      <span
                        className={`truncate text-sm font-medium transition-colors duration-200 ${
                          activeItem === item.href
                            ? 'text-gray-100'
                            : 'text-gray-400'
                        }`}
                      >
                        {item.name}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
