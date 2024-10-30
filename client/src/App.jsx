import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Error404 from './components/Layout/Error404'
import AboutUs from './Pages/About/AboutUs'
import Login from './Pages/Auth/Login'
import SignUp from './Pages/Auth/SignUp'
import BusinessListingPage from './Pages/Business/BusinessListingPage'
import Home from './Pages/Home/Home'
import ProfilePage from './Pages/Home/ProfilePage'
import UserCollections from './Pages/Home/UserCollections'
import LocalGuidePage from './Pages/More/LocalGuidePage'
import TrendingPage from './Pages/More/TrendingPage'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/collections' element={<UserCollections />} />
          <Route path='/view-business/:id' element={<BusinessListingPage />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/local-guide' element={<LocalGuidePage />} />
          <Route path='/trending' element={<TrendingPage />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
