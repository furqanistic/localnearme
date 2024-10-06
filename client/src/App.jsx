import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Error404 from './components/Layout/Error404'
import AboutUs from './Pages/About/AboutUs'
import Login from './Pages/Auth/Login'
import SignUp from './Pages/Auth/SignUp'
import BusinessListingPage from './Pages/Business/BusinessListingPage'
import Home from './Pages/Home/Home'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/view-business' element={<BusinessListingPage />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
