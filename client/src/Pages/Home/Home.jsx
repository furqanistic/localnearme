import Cats from '@/components/Home/Cats'
import CustomSlider from '@/components/Home/CustomSlider'
import SearchBar from '@/components/Home/SearchBar'
import Stats from '@/components/Home/Stats'
import Footer from '@/components/Layout/Footer'
import Loader from '@/components/utils/Loader'
import { axiosInstance } from '@/config'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import NavigationBar from '../../components/Layout/NavigationBar'

const Home = () => {
  const [listings, setListings] = useState([])
  const sliderCount = 7

  const { status } = useQuery(
    'all-business-listings',
    async () => {
      const res = await axiosInstance.get(`business`)
      return res.data.data.businesses
    },
    {
      onSuccess: (data) => {
        setListings(data)
      },
    }
  )

  const renderBusinessSliders = (start, end) => {
    if (status === 'loading') {
      return Array(end - start)
        .fill()
        .map((_, index) => (
          <CustomSlider key={index} business={{}} isLoading={true} />
        ))
    }
    if (status === 'error') {
      return <p>Error loading data</p>
    }
    if (status === 'success') {
      return listings
        .slice(start, end)
        .map((business, index) => (
          <CustomSlider key={index} business={business} isLoading={false} />
        ))
    }
    return null
  }

  return (
    <>
      <NavigationBar />
      <SearchBar />
      <Cats />
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {renderBusinessSliders(0, sliderCount)}
        </div>
      </div>
      <h1 className='container mx-auto p-4 font-medium text-3xl text-white'>
        Past experiences
      </h1>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {renderBusinessSliders(sliderCount, sliderCount * 2)}
        </div>
      </div>
      <Stats />
      <Footer />
    </>
  )
}

export default Home
