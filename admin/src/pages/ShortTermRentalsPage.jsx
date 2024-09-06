import Header from '../components/common/Header'
import Rentals from '../components/ShortTermRentals/Rentals'

const ShortTermRentalsPage = () => {
  return (
    <>
      <div className='flex-1 relative z-10 overflow-auto'>
        <Header title={'Short Term Rentals'} />
        <Rentals />
      </div>
    </>
  )
}

export default ShortTermRentalsPage
