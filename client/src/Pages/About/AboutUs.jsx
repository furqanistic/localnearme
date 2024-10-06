import Navigationbar from '@/components/Layout/NavigationBar'
import { motion } from 'framer-motion'
import { Home, Mail, MapPin, Star, Users, Utensils } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const AboutUs = () => {
  return (
    <>
      <Navigationbar />

      <div className='bg-[#141414] text-gray-200 min-h-screen'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
          <motion.h1
            className='text-4xl md:text-5xl font-bold text-center mb-12'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About BissLocal
          </motion.h1>

          <motion.section
            className='mb-16'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className='text-3xl font-semibold mb-6 text-blue-400'>
              Our Mission
            </h2>
            <p className='text-lg mb-4'>
              BissLocal is on a mission to bridge the gap between travelers,
              local businesses, and Airbnb hosts. We're creating a unique
              ecosystem that benefits everyone involved:
            </p>
            <ul className='list-disc list-inside space-y-2 ml-4 text-gray-300'>
              <li>Providing free local guides for Airbnb guests</li>
              <li>
                Offering a platform for Airbnb hosts to showcase their
                properties
              </li>
              <li>
                Connecting travelers with the best local restaurants and
                attractions
              </li>
              <li>
                Helping local businesses reach more customers through our
                digital flyer system
              </li>
            </ul>
          </motion.section>

          <motion.section
            className='mb-16'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h2 className='text-3xl font-semibold mb-6 text-blue-400'>
              What We Offer
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {[
                {
                  icon: <MapPin className='w-8 h-8 mb-4 text-green-400' />,
                  title: 'Local Guides',
                  description:
                    'Curated guides featuring the best local attractions, restaurants, and experiences.',
                },
                {
                  icon: <Home className='w-8 h-8 mb-4 text-purple-400' />,
                  title: 'Airbnb Listings',
                  description:
                    'A platform for Airbnb hosts to showcase one property for free, increasing their visibility.',
                },
                {
                  icon: <Utensils className='w-8 h-8 mb-4 text-yellow-400' />,
                  title: 'Restaurant Features',
                  description:
                    'Highlighted restaurant recommendations in our local guides.',
                },
                {
                  icon: <Mail className='w-8 h-8 mb-4 text-blue-400' />,
                  title: 'Digital Flyer System',
                  description:
                    'Innovative digital flyer distribution for local businesses to share deals and promotions.',
                },
                {
                  icon: <Star className='w-8 h-8 mb-4 text-red-400' />,
                  title: 'Review Management',
                  description:
                    'Smart review system to boost positive Google reviews and manage feedback.',
                },
                {
                  icon: <Users className='w-8 h-8 mb-4 text-indigo-400' />,
                  title: 'Community Building',
                  description:
                    'Connecting travelers with local experiences and businesses.',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className='bg-gray-800 p-6 rounded-lg shadow-lg'
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {item.icon}
                  <h3 className='text-xl font-semibold mb-2'>{item.title}</h3>
                  <p className='text-gray-400'>{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            className='mb-16'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h2 className='text-3xl font-semibold mb-6 text-blue-400'>
              Our Vision
            </h2>
            <p className='text-lg mb-4'>
              We envision BissLocal as the go-to platform for travelers seeking
              authentic local experiences and for businesses looking to connect
              with both tourists and locals. Our future plans include:
            </p>
            <ul className='list-disc list-inside space-y-2 ml-4 text-gray-300'>
              <li>
                Expanding our ecosystem to include more features for Airbnb
                hosts and guests
              </li>
              <li>
                Implementing a login system for accessing premium local guides
              </li>
              <li>
                Fostering partnerships with local restaurants to offer unique
                deals
              </li>
              <li>
                Continuously improving our digital flyer and review management
                systems
              </li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <h2 className='text-3xl font-semibold mb-6 text-blue-400'>
              Join Us on This Journey
            </h2>
            <p className='text-lg mb-4'>
              Whether you're a traveler, an Airbnb host, or a local business
              owner, BissLocal has something for you. Join our community today
              and be part of the revolution in local travel experiences!
            </p>
            <Link to='/signup'>
              <div className='flex justify-center mt-8'>
                <motion.button
                  className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign Up Now
                </motion.button>
              </div>
            </Link>
          </motion.section>
        </div>
      </div>
    </>
  )
}

export default AboutUs
