import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/Auth/Login'
import Home from './Pages/Home/Home'
import Error404 from './components/Layout/Error404'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
