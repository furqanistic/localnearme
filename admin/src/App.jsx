import { Route, Routes } from 'react-router-dom'

import Sidebar from './components/common/Sidebar'

import EditBusiness from './components/business/EditBusiness'
import BookingsPage from './pages/BookingsPage'
import BusinessPage from './pages/BusinessPage'
import FlyerPage from './pages/FlyerPage'
import MembershipPage from './pages/MembershipPage'
import OverviewPage from './pages/OverviewPage'
import SettingsPage from './pages/SettingsPage'
import SubscribersPage from './pages/SubscribersPage'

function App() {
  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
      {/* BG */}
      <div className='fixed inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
        <div className='absolute inset-0 backdrop-blur-sm' />
      </div>

      <Sidebar />
      <Routes>
        <Route path='/' element={<OverviewPage />} />
        <Route path='/business' element={<BusinessPage />} />
        <Route path='/edit-business/:id' element={<EditBusiness />} />
        <Route path='/users' element={<SubscribersPage />} />
        <Route path='/sales' element={<FlyerPage />} />
        <Route path='/Bookings' element={<BookingsPage />} />
        <Route path='/Membership' element={<MembershipPage />} />
        <Route path='/settings' element={<SettingsPage />} />
      </Routes>
    </div>
  )
}

export default App
