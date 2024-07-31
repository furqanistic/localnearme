import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/Auth/Login'
import Home from './Pages/Home/Home'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
