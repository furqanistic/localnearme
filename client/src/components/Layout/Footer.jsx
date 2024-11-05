import {
  ArrowRight,
  Facebook,
  Globe,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const navigation = {
    main: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Contact', href: '/contact' },
    ],
    explore: [
      { name: 'AirBnB', href: '#' },
      { name: 'Stores', href: '#' },
      { name: 'Local Guides', href: '#' },
      { name: 'Trending', href: '#' },
    ],
    support: [
      { name: 'FAQs', href: '#' },
      { name: 'Help Center', href: '#' },
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' },
    ],
    social: [
      { name: 'Facebook', icon: Facebook, href: '#' },
      { name: 'Instagram', icon: Instagram, href: '#' },
      { name: 'Twitter', icon: Twitter, href: '#' },
      { name: 'Youtube', icon: Youtube, href: '#' },
    ],
  }

  return (
    <footer className='bg-gray-900'>
      {/* Main Footer Content */}
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-gray-800'>
          {/* Company Info */}
          <div className='lg:col-span-4'>
            <img
              src='https://dashboard.bisslocal.com/weblogo.png'
              alt='Logo'
              className='h-8 w-auto mb-6'
            />
            <p className='text-gray-400 text-sm mb-6'>
              Discover and connect with the best local businesses in your area.
              From restaurants to services, find everything you need nearby.
            </p>
            <div className='flex items-center space-x-4'>
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className='text-gray-400 hover:text-white transition-colors duration-200'
                >
                  <span className='sr-only'>{item.name}</span>
                  <item.icon className='h-5 w-5' />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className='lg:col-span-2 md:col-span-1'>
            <h3 className='text-sm font-semibold text-white uppercase tracking-wider mb-4'>
              Quick Links
            </h3>
            <ul className='space-y-3'>
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className='text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group'
                  >
                    <ArrowRight className='h-4 w-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200' />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div className='lg:col-span-2 md:col-span-1'>
            <h3 className='text-sm font-semibold text-white uppercase tracking-wider mb-4'>
              Explore
            </h3>
            <ul className='space-y-3'>
              {navigation.explore.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className='text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group'
                  >
                    <ArrowRight className='h-4 w-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200' />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className='lg:col-span-2 md:col-span-1'>
            <h3 className='text-sm font-semibold text-white uppercase tracking-wider mb-4'>
              Support
            </h3>
            <ul className='space-y-3'>
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className='text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group'
                  >
                    <ArrowRight className='h-4 w-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200' />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className='lg:col-span-2 md:col-span-1'>
            <h3 className='text-sm font-semibold text-white uppercase tracking-wider mb-4'>
              Stay Updated
            </h3>
            <p className='text-gray-400 text-sm mb-4'>
              Subscribe to our newsletter for local updates and exclusive
              offers.
            </p>
            <form className='space-y-3'>
              <div className='relative rounded-lg'>
                <input
                  type='email'
                  className='w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-4 pr-12 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  placeholder='Enter your email'
                />
                <button
                  type='submit'
                  className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white'
                >
                  <ArrowRight className='h-4 w-4' />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
          <div className='flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8'>
            <p className='text-gray-400 text-sm'>
              © {new Date().getFullYear()} localnearme. All rights reserved.
            </p>
            <div className='flex space-x-4 text-sm text-gray-400'>
              <a
                href='/privacy'
                className='hover:text-white transition-colors duration-200'
              >
                Privacy Policy
              </a>
              <span>·</span>
              <a
                href='/terms'
                className='hover:text-white transition-colors duration-200'
              >
                Terms of Service
              </a>
            </div>
          </div>

          <div className='flex items-center space-x-6'>
            <a
              href='tel:+1234567890'
              className='text-gray-400 hover:text-white text-sm flex items-center transition-colors duration-200'
            >
              <Phone className='h-4 w-4 mr-2' />
              (123) 456-7890
            </a>
            <a
              href='mailto:info@localnearme.com'
              className='text-gray-400 hover:text-white text-sm flex items-center transition-colors duration-200'
            >
              <Mail className='h-4 w-4 mr-2' />
              info@localnearme.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
