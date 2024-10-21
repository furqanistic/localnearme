const Loader = () => {
  return (
    <>
      <div className='fixed inset-0 flex items-center justify-center bg-[#141414] z-50'>
        <div className='text-center p-8 rounded-2xl bg-[#212121] shadow-lg'>
          <div className='relative w-32 h-32 mx-auto mb-8'>
            <div className='absolute inset-0 animate-spin-slow'>
              <svg
                className='w-full h-full'
                viewBox='0 0 100 100'
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle
                  cx='50'
                  cy='50'
                  r='45'
                  fill='none'
                  stroke='rgba(59, 130, 246, 0.2)'
                  strokeWidth='8'
                />
                <circle
                  cx='50'
                  cy='50'
                  r='45'
                  fill='none'
                  stroke='#3B82F6'
                  strokeWidth='8'
                  strokeDasharray='70 30'
                  strokeLinecap='round'
                />
              </svg>
            </div>
            <div className='absolute inset-0 flex items-center justify-center'>
              <svg
                className='w-16 h-16 text-[#3B82F6] animate-pulse'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
                />
              </svg>
            </div>
          </div>
          <h2 className='text-3xl font-bold text-white mb-2'>
            Exploring Your World
          </h2>
          <p className='text-xl text-gray-400'>
            Discover amazing listings near you
          </p>
          <div className='mt-8 flex justify-center space-x-4'>
            {['🏠', '🍽️', '🏢', '🛍️'].map((emoji, index) => (
              <div
                key={index}
                className='text-3xl animate-bounce bg-[#212121] rounded-full p-3 shadow-lg'
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Loader
