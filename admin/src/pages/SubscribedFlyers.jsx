import Header from '../components/common/Header'
import SubscribedBusinesses from '../components/subscribedFlyers/SubscribedBusinesses'

const SubscribedFlyers = () => {
  return (
    <>
      <div className='flex-1 relative z-10 overflow-auto'>
        <Header title={'Subscribed Flyers'} />
        <SubscribedBusinesses />
      </div>
    </>
  )
}

export default SubscribedFlyers
