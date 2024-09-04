import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Error404 from './components/Layout/Error404'
import Login from './Pages/Auth/Login'
import SignUp from './Pages/Auth/SignUp'
import Home from './Pages/Home/Home'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
