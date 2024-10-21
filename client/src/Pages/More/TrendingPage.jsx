import Navigationbar from '@/components/Layout/NavigationBar'
import { motion } from 'framer-motion'
import { ArrowRight, DollarSign, Search, Star, TrendingUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const TrendingPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [trendingData, setTrendingData] = useState([])

  useEffect(() => {
    // Simulating data fetch
    const fetchData = async () => {
      // Replace this with actual API call
      const data = [
        {
          id: 1,
          name: 'Maple Leaf Diner',
          category: 'restaurant',
          rating: 4.8,
          priceRange: 'medium',
          image:
            'https://banfflakelouise.bynder.com/m/38b4d61b3d085b50/2000x1080_jpg-2023_TheMapleLeaf_Restaurant_BanffHospitalityCollective.jpg',
          description:
            'Famous for its Canadian-inspired breakfast and brunch menu.',
        },
        {
          id: 2,
          name: 'Outdoor Adventure Gear',
          category: 'store',
          rating: 4.6,
          priceRange: 'high',
          image:
            'https://img.freepik.com/premium-photo/camping-gear-supplies-outdoor-adventure_1123896-155069.jpg',
          description:
            'Premium outdoor equipment for hiking and camping enthusiasts.',
        },
        {
          id: 3,
          name: 'Fairmont Chateau Lake Louise',
          category: 'hotel',
          rating: 4.9,
          priceRange: 'high',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5fGKKf63hm3HoxiVfC-z-3c7oxOt0PyTFbA&s',
          description:
            'Luxury hotel with stunning views of the Rocky Mountains and Lake Louise.',
        },
        {
          id: 4,
          name: 'The Poutine Shack',
          category: 'restaurant',
          rating: 4.7,
          priceRange: 'low',
          image:
            'https://www.progressivebynature.com/sites/default/files/businesses/images/pouitne.jpg',
          description:
            "Serving over 30 varieties of Canada's favorite dish - poutine!",
        },
        {
          id: 5,
          name: 'Canuck Souvenirs',
          category: 'store',
          rating: 4.5,
          priceRange: 'medium',
          image:
            'https://stuckattheairport.com/wp-content/uploads/2011/06/YVR-CANUCKS-STUFF-500x332.jpg',
          description:
            'One-stop shop for all your Canadian souvenirs and gifts.',
        },
        {
          id: 6,
          name: 'HI Montreal Hostel',
          category: 'hotel',
          rating: 4.4,
          priceRange: 'low',
          image:
            'https://media-cdn.tripadvisor.com/media/photo-s/01/22/7c/a9/hi-montreal-hostel-auberge.jpg',
          description:
            'Budget-friendly accommodation in the heart of Montreal.',
        },
      ]
      setTrendingData(data)
    }
    fetchData()
  }, [])

  const filteredData = trendingData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || item.category === selectedCategory)
  )

  const categories = ['all', 'restaurant', 'store', 'hotel']

  return (
    <>
      <Navigationbar />
      <div className='bg-[#141414] min-h-screen text-gray-200 p-4 md:p-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex flex-col md:flex-row justify-between items-start mb-12'>
            <motion.h1
              className='text-4xl md:text-6xl font-bold mb-6 md:mb-0'
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              Trending
              <br />
              in Canada
            </motion.h1>
            <div className='w-full md:w-1/2'>
              <div className='relative mb-4'>
                <input
                  type='text'
                  placeholder='Search trending places...'
                  className='w-full pl-10 pr-4 py-2 bg-gray-800 border-b-2 border-gray-700 focus:border-blue-500 focus:outline-none text-gray-200'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className='absolute left-2 top-2 h-5 w-5 text-gray-400' />
              </div>
              <div className='flex flex-wrap gap-2'>
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-3 py-1 text-sm ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    } transition-colors duration-300`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {filteredData.map((item, index) => (
              <motion.div
                key={item.id}
                className={`bg-gray-900 p-4 ${
                  index % 3 === 0 ? 'md:col-span-2' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className='relative mb-4'>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='w-full h-48 object-cover'
                  />
                  <div className='absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 text-sm'>
                    {item.category}
                  </div>
                </div>
                <h2 className='text-2xl font-bold mb-2'>{item.name}</h2>
                <p className='text-gray-400 mb-4'>{item.description}</p>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center'>
                    <Star className='h-5 w-5 text-yellow-400 mr-1' />
                    <span className='text-yellow-400 font-semibold'>
                      {item.rating}
                    </span>
                  </div>
                  <div className='flex items-center'>
                    <TrendingUp className='h-5 w-5 text-green-400 mr-2' />
                    {Array(3)
                      .fill()
                      .map((_, i) => (
                        <DollarSign
                          key={i}
                          className={`h-4 w-4 ${
                            i < item.priceRange.length
                              ? 'text-green-400'
                              : 'text-gray-600'
                          }`}
                        />
                      ))}
                  </div>
                </div>
                <button className='mt-4 w-full bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold py-2 px-4 flex items-center justify-center transition-colors duration-300'>
                  <span>View Details</span>
                  <ArrowRight className='ml-2 h-4 w-4' />
                </button>
              </motion.div>
            ))}
          </div>

          {filteredData.length === 0 && (
            <motion.div
              className='bg-gray-900 p-8 text-center mt-8'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <p className='text-xl text-gray-400'>
                No trending places found. Try adjusting your search or filters.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}

export default TrendingPage
