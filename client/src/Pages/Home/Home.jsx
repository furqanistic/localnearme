import { CarouselSlider } from '@/components/Home/CarouselSlider'
import Cats from '@/components/Home/Cats'
import SearchBar from '@/components/Home/SearchBar'
import Footer from '@/components/Layout/Footer'
import NavigationBar from '../../components/Layout/NavigationBar'

const Home = () => {
  // Number of CarouselSlider components you want to display
  const sliderCount = 7

  return (
    <>
      <NavigationBar />
      <SearchBar />
      <Cats />
      <div className='container mx-auto px-4'>
        <div className='flex flex-wrap -mx-2'>
          {Array.from({ length: sliderCount }).map((_, index) => (
            <div key={index} className='w-full sm:w-1/2 lg:w-1/4 px-2 mb-4'>
              <CarouselSlider />
            </div>
          ))}
        </div>
      </div>
      <h1 className='container mx-auto p-4 font-medium text-3xl'>
        Past experiences
      </h1>

      <div className='container mx-auto px-4'>
        <div className='flex flex-wrap -mx-2'>
          {Array.from({ length: sliderCount }).map((_, index) => (
            <div key={index} className='w-full sm:w-1/2 lg:w-1/4 px-2 mb-4'>
              <CarouselSlider />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home
