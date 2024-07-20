import NavigationBar from './components/Home/NavigationBar'

const App = () => {
  return (
    <div>
      <NavigationBar />
      <div className='p-10'>
        <h1 className='text-3xl font-bold'>Main Content</h1>
        <p className='mt-4'>Here is the main content of the page.</p>
      </div>
    </div>
  )
}

export default App
