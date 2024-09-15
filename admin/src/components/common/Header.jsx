import { ChevronDown, Clock, LogOut, Settings, User } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../redux/userSlice'

const dummyUser = {
  name: 'Guest User',
  role: 'Regular',
  email: 'guest@example.com',
  location: 'Unknown Location',
  // lastLogin: new Date().toISOString()
}

const Header = ({ title }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { currentUser } = useSelector((state) => state.user)
  const loggedUser = currentUser.data.user
  const userData = loggedUser || dummyUser
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  // Function to format the last login date
  const formatLastLogin = (lastLoginDate) => {
    const date = new Date(lastLoginDate)
    return date.toLocaleString()
  }

  const handleLogout = () => {
    console.log('he')
    dispatch(logout())
    navigate('/auth')
  }

  return (
    <header className='relative bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700 z-10'>
      <div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center'>
          <h1 className='text-xl sm:text-2xl font-semibold text-gray-100'>
            {title}
          </h1>
          <div className='relative' ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className='flex items-center space-x-3 focus:outline-none'
            >
              {userData.image ? (
                <img
                  className='h-8 w-8 rounded-full object-cover'
                  src={userData.image}
                  alt={userData.name}
                />
              ) : (
                <div className='h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center'>
                  <User className='h-5 w-5 text-gray-300' />
                </div>
              )}
              <div className='hidden sm:block text-left'>
                <div className='text-sm font-medium text-gray-300'>
                  {userData.name}
                </div>
                <div className='text-xs text-gray-500 capitalize'>
                  {userData.role}
                </div>
              </div>
              <ChevronDown className='h-4 w-4 text-gray-400' />
            </button>
            {isDropdownOpen && (
              <div className='absolute right-0 mt-2 w-64 rounded-md shadow-lg py-1 bg-gray-700 ring-1 ring-black ring-opacity-5 z-50'>
                <div className='px-4 py-2 text-sm text-gray-300'>
                  <div>{userData.email}</div>
                  <div className='text-xs text-gray-500'>
                    {userData.location}
                  </div>
                  <div className='text-xs text-gray-500 mt-1 flex items-center'>
                    <Clock className='mr-1 h-3 w-3' />
                    Last login: {formatLastLogin(userData.lastLogin)}
                  </div>
                </div>
                <a
                  href='/settings'
                  className='block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 flex items-center'
                >
                  <Settings className='mr-2 h-4 w-4' /> Settings
                </a>
                <button
                  onClick={handleLogout}
                  className='block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 flex items-center'
                >
                  <LogOut className='mr-2 h-4 w-4' /> Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
