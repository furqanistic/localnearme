import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import EditBusiness from './components/business/EditBusiness'
import Sidebar from './components/common/Sidebar'
import BookingsPage from './pages/BookingsPage'
import BusinessPage from './pages/BusinessPage'
import FlyerPage from './pages/FlyerPage'
import LocalGuidePage from './pages/LocalGuidePage'
import MembershipPage from './pages/MembershipPage'
import MyFeed from './pages/MyFeedPage'
import MyRentalsPage from './pages/MyRentalsPage'
import OverviewPage from './pages/OverviewPage'
import SettingsPage from './pages/SettingsPage'
import ShortTermRentals from './pages/ShortTermRentalsPage'
import SignupLoginPage from './pages/SignupLoginPage'
import SubscribedFlyers from './pages/SubscribedFlyersPage'
import SubscribersPage from './pages/SubscribersPage'

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.user)
  const isLoggedIn = currentUser && currentUser.data && currentUser.data.user

  useEffect(() => {
    if (isLoggedIn && location.pathname === '/auth') {
      navigate('/')
    } else if (!isLoggedIn && location.pathname !== '/auth') {
      navigate('/auth')
    }
  }, [isLoggedIn, location.pathname, navigate])

  const isAuthPage = location.pathname === '/auth'

  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
      {/* BG */}
      <div className='fixed inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
        <div className='absolute inset-0 backdrop-blur-sm' />
      </div>
      {!isAuthPage && <Sidebar />}
      <Routes>
        <Route path='/auth' element={<SignupLoginPage />} />
        {isLoggedIn && (
          <>
            <Route path='/' element={<OverviewPage />} />
            <Route path='/business' element={<BusinessPage />} />
            <Route path='/edit-business/:id' element={<EditBusiness />} />
            <Route path='/users' element={<SubscribersPage />} />
            <Route path='/myfeed' element={<MyFeed />} />
            <Route path='/sales' element={<FlyerPage />} />
            <Route path='/subscribed-flyers' element={<SubscribedFlyers />} />
            <Route path='/short-term-rentals' element={<ShortTermRentals />} />
            <Route path='/local-guide' element={<LocalGuidePage />} />
            <Route path='/Bookings' element={<BookingsPage />} />
            <Route path='/my-rentals' element={<MyRentalsPage />} />
            <Route path='/Membership' element={<MembershipPage />} />
            <Route path='/settings' element={<SettingsPage />} />
          </>
        )}
      </Routes>
    </div>
  )
}

export default App
