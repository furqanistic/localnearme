import Cats from '@/components/Home/Cats'
import CustomSlider from '@/components/Home/CustomSlider'
import SearchBar from '@/components/Home/SearchBar'
import Stats from '@/components/Home/Stats'
import Footer from '@/components/Layout/Footer'
import NavigationBar from '../../components/Layout/NavigationBar'

const Home = () => {
  const sliderCount = 7

  const businessData = {
    name: 'Cozy Corner BnB',
    type: 'Bed and Breakfast',
    description: 'A charming bed and breakfast in the heart of the city...',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'ST',
      zipCode: '12345',
    },
    websiteUrl: 'https://www.cozycornerbnb.com',
    phoneNumber: '+1 (555) 123-4567',

    openingHours: [
      { day: 'Monday', open: '8:00 AM', close: '10:00 PM' },
      // ... other days
    ],
    tags: ['Cozy', 'City Center', 'Free Wi-Fi'],
  }

  return (
    <>
      <NavigationBar />
      <SearchBar />
      <Cats />
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {Array.from({ length: sliderCount }).map((_, index) => (
            <CustomSlider business={businessData} key={index} />
          ))}
        </div>
      </div>
      <h1 className='container mx-auto p-4 font-medium text-3xl text-white'>
        Past experiences
      </h1>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {Array.from({ length: sliderCount }).map((_, index) => (
            <CustomSlider business={businessData} key={index} />
          ))}
        </div>
      </div>
      <Stats />
      <Footer />
    </>
  )
}

export default Home
