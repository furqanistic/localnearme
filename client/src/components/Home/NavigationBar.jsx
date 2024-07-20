import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className='bg-slate-950 text-white sticky top-0 w-full z-10'>
      <div className='flex justify-between items-center p-4'>
        <div className='text-xl font-bold'>LocalsNearMe</div>
        <button className='md:hidden p-2' onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
        <nav className='hidden md:flex space-x-4'>
          <ul className='flex space-x-4'>
            <li>
              <a
                href='#'
                className='py-2 px-4 rounded transition duration-200 hover:bg-slate-800 hover:text-white'
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href='#'
                className='py-2 px-4 rounded transition duration-200 hover:bg-slate-800 hover:text-white'
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href='#'
                className='py-2 px-4 rounded transition duration-200 hover:bg-slate-800 hover:text-white'
              >
                Profile
              </a>
            </li>
            <li>
              <Avatar>
                <AvatarImage
                  src='https://github.com/shadcn.png'
                  alt='@shadcn'
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </li>
          </ul>
        </nav>
      </div>
      {isOpen && (
        <nav className='md:hidden bg-slate-800'>
          <ul>
            <li>
              <a
                href='#'
                className='block py-2 px-4 rounded transition duration-200 hover:bg-slate-800 hover:text-white'
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block py-2 px-4 rounded transition duration-200 hover:bg-slate-800 hover:text-white'
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block py-2 px-4 rounded transition duration-200 hover:bg-slate-800 hover:text-white'
              >
                Profile
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}

export default NavigationBar
