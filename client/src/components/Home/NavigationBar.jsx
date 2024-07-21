import React from 'react'

const NavBar = () => {
  const [open, setOpen] = React.useState(false)
  const [flyer, setFlyer] = React.useState(false)
  const [flyerTwo, setFlyerTwo] = React.useState(false)

  return (
    <>
      <div className='relative bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
          <div className='flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10'>
            <div className='flex justify-start lg:w-0 lg:flex-1'>
              <a href='#'>
                <span className='sr-only'>Workflow</span>
                <img
                  className='h-12 w-auto sm:h-14'
                  src='/logoicon.png'
                  alt=''
                />
              </a>
            </div>
            <div className='-mr-2 -my-2 md:hidden'>
              <button
                type='button'
                className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
                onClick={() => setOpen(!open)}
              >
                <span className='sr-only'>Open menu</span>
                {/* Heroicon name: outline/menu */}
                <svg
                  className='h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>
            </div>
            <nav className='hidden md:flex space-x-10'>
              <div className='relative'>
                {/* Item active: "text-gray-900", Item inactive: "text-gray-500" */}
                <button
                  type='button'
                  className="
                   group bg-white rounded-md text-gray-500 inline-flex items-center text-base font-normal hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 pb-8'
                  "
                  onClick={() => (setFlyer(!flyer), setFlyerTwo(false))}
                >
                  <span>Explore</span>
                  {/*
              Heroicon name: solid/chevron-down

              Item active: "text-gray-600", Item inactive: "text-gray-400"
            */}
                  <svg
                    className={
                      flyer === true
                        ? 'transform rotate-180 ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500 transition ease-out duration-200'
                        : 'transform rotate-0 transition ease-out duration-200 ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                    }
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
                {/*
            'Solutions' flyout menu, show/hide based on flyout menu state.

            Entering: "transition ease-out duration-200"
              From: "opacity-0 translate-y-1"
              To: "opacity-100 translate-y-0"
            Leaving: "transition ease-in duration-150"
              From: "opacity-100 translate-y-0"
              To: "opacity-0 translate-y-1"
          */}

                <div
                  onMouseLeave={() => setFlyer(false)}
                  className={
                    flyer
                      ? ' opacity-100 translate-y-0 transition ease-out duration-200 absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2'
                      : ' opacity-0 translate-y-1 absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2'
                  }
                >
                  <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden'>
                    <div className='relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8'>
                      <a
                        href='#'
                        className='-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50'
                      >
                        {/* Heroicon name: outline/chart-bar */}
                        <svg
                          className='flex-shrink-0 h-6 w-6 text-indigo-600'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z'
                          />
                        </svg>
                        <div className='ml-4'>
                          <p className='text-base font-medium text-gray-900'>
                            Stores
                          </p>
                          <p className='mt-1 text-sm text-gray-500'>
                            You can find all stores, sort by trending here!
                          </p>
                        </div>
                      </a>
                      <a
                        href='#'
                        className='-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50'
                      >
                        {/* Heroicon name: outline/cursor-click */}
                        <svg
                          className='flex-shrink-0 h-6 w-6 text-indigo-600'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          fill='currentColor'
                        >
                          <path d='M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z' />
                        </svg>
                        <div className='ml-4'>
                          <p className='text-base font-medium text-gray-900'>
                            Local Guides
                          </p>
                          <p className='mt-1 text-sm text-gray-500'>
                            Guides for local areas, showcasing various stores
                            and services.
                          </p>
                        </div>
                      </a>
                      <a
                        href='#'
                        className='-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50'
                      >
                        {/* Heroicon name: outline/shield-check */}
                        <svg
                          className='flex-shrink-0 h-6 w-6 text-indigo-600'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          fill='currentColor'
                        >
                          <path d='M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z' />
                          <path
                            fillRule='evenodd'
                            d='M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z'
                            clipRule='evenodd'
                          />
                        </svg>
                        <div className='ml-4'>
                          <p className='text-base font-medium text-gray-900'>
                            Plan & Pricing
                          </p>
                          <p className='mt-1 text-sm text-gray-500'>
                            Details about the different subscription plans
                            (Free, Premium, Advanced) and their features.
                          </p>
                        </div>
                      </a>
                      <a
                        href='#'
                        className='-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50'
                      >
                        {/* Heroicon name: outline/view-grid */}
                        <svg
                          className='flex-shrink-0 h-6 w-6 text-indigo-600'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          fill='currentColor'
                        >
                          <path d='M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z' />
                          <path d='M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z' />
                        </svg>
                        <div className='ml-4'>
                          <p className='text-base font-medium text-gray-900'>
                            Newsletter
                          </p>
                          <p className='mt-1 text-sm text-gray-500'>
                            Information about subscribing to newsletters and
                            managing email preferences.
                          </p>
                        </div>
                      </a>
                    </div>
                    <div className='px-5 py-5 bg-gray-50 space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8'>
                      <div className='flow-root'>
                        <a
                          href='#'
                          className='-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100'
                        >
                          {/* Heroicon name: outline/play */}
                          <svg
                            className='flex-shrink-0 h-6 w-6 text-gray-400'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            aria-hidden='true'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
                            />
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                          </svg>
                          <span className='ml-3'>Watch Demo</span>
                        </a>
                      </div>
                      <div className='flow-root'>
                        <a
                          href='#'
                          className='-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100'
                        >
                          {/* Heroicon name: outline/phone */}
                          <svg
                            className='flex-shrink-0 h-6 w-6 text-gray-400'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            aria-hidden='true'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                            />
                          </svg>
                          <span className='ml-3'>Contact Us</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href='#'
                className='text-base font-normal text-gray-500 hover:text-gray-900'
              >
                About Us
              </a>
              <a
                href='#'
                className='text-base font-normal text-gray-500 hover:text-gray-900'
              >
                Connect
              </a>
              <div className='relative'>
                {/* Item active: "text-gray-900", Item inactive: "text-gray-500" */}
                <button
                  type='button'
                  className='group bg-white rounded-md text-gray-500 inline-flex items-center text-base font-normal hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  onClick={() => (setFlyerTwo(!flyerTwo), setFlyer(false))}
                >
                  <span>More</span>
                  {/*
              Heroicon name: solid/chevron-down

              Item active: "text-gray-600", Item inactive: "text-gray-400"
            */}
                  <svg
                    className={
                      flyerTwo === true
                        ? 'transform rotate-180 ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500 transition ease-out duration-200'
                        : 'ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                    }
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
                {/*
            'More' flyout menu, show/hide based on flyout menu state.

            Entering: "transition ease-out duration-200"
              From: "opacity-0 translate-y-1"
              To: "opacity-100 translate-y-0"
            Leaving: "transition ease-in duration-150"
              From: "opacity-100 translate-y-0"
              To: "opacity-0 translate-y-1"
          */}{' '}
                <div
                  onMouseLeave={() => setFlyerTwo(false)}
                  className={
                    flyerTwo
                      ? ' opacity-100 translate-y-0 transition ease-out duration-200 absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2'
                      : ' opacity-0 translate-y-1 absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2'
                  }
                >
                  <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden'>
                    <div className='relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8'>
                      <a
                        href='#'
                        className='-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50'
                      >
                        {/* Heroicon name: outline/support */}
                        <svg
                          className='flex-shrink-0 h-6 w-6 text-indigo-600'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          aria-hidden='true'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z'
                          />
                        </svg>
                        <div className='ml-4'>
                          <p className='text-base font-medium text-gray-900'>
                            Create Profile
                          </p>
                          <p className='mt-1 text-sm text-gray-500'>
                            A call-to-action for business owners to create their
                            online profile/storefront.
                          </p>
                        </div>
                      </a>
                      <a
                        href='#'
                        className='-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50'
                      >
                        {/* Heroicon name: outline/bookmark-alt */}
                        <svg
                          className='flex-shrink-0 h-6 w-6 text-indigo-600'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          aria-hidden='true'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                          />
                        </svg>
                        <div className='ml-4'>
                          <p className='text-base font-medium text-gray-900'>
                            Guides
                          </p>
                          <p className='mt-1 text-sm text-gray-500'>
                            Learn how to maximize our platform to get the most
                            out of it.
                          </p>
                        </div>
                      </a>
                      <a
                        href='#'
                        className='-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50'
                      >
                        {/* Heroicon name: outline/calendar */}
                        <svg
                          className='flex-shrink-0 h-6 w-6 text-indigo-600'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          aria-hidden='true'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                          />
                        </svg>
                        <div className='ml-4'>
                          <p className='text-base font-medium text-gray-900'>
                            Events
                          </p>
                          <p className='mt-1 text-sm text-gray-500'>
                            See what meet-ups and other events we might be
                            planning near you.
                          </p>
                        </div>
                      </a>
                      <a
                        href='#'
                        className='-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50'
                      >
                        {/* Heroicon name: outline/shield-check */}
                        <svg
                          className='flex-shrink-0 h-6 w-6 text-indigo-600'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          aria-hidden='true'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                          />
                        </svg>
                        <div className='ml-4'>
                          <p className='text-base font-medium text-gray-900'>
                            Security
                          </p>
                          <p className='mt-1 text-sm text-gray-500'>
                            Understand how we take your privacy seriously.
                          </p>
                        </div>
                      </a>
                    </div>
                    <div className='px-5 py-5 bg-gray-50 sm:px-8 sm:py-8'>
                      <div>
                        <h3 className='text-sm tracking-wide font-medium text-gray-500 uppercase'>
                          Recent Posts
                        </h3>
                        <ul className='mt-4 space-y-4'>
                          <li className='text-base truncate'>
                            <a
                              href='#'
                              className='font-medium text-gray-900 hover:text-gray-700'
                            >
                              How to Create an Effective Online Storefront
                            </a>
                          </li>
                          <li className='text-base truncate'>
                            <a
                              href='#'
                              className='font-medium text-gray-900 hover:text-gray-700'
                            >
                              The Benefits of Having an Online Presence for
                              Local Businesses
                            </a>
                          </li>
                          <li className='text-base truncate'>
                            <a
                              href='#'
                              className='font-medium text-gray-900 hover:text-gray-700'
                            >
                              Success Stories : Best practices for crafting
                              newsletters.
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className='mt-5 text-sm'>
                        <a
                          href='#'
                          className='font-medium text-indigo-600 hover:text-indigo-500'
                        >
                          {' '}
                          View all posts <span aria-hidden='true'>→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
            <div className='hidden md:flex items-center justify-end md:flex-1 lg:w-0'>
              <a
                href='#'
                className='whitespace-nowrap text-base font-light text-gray-500 hover:text-gray-900'
              >
                Sign in
              </a>
              <a
                href='#'
                className='ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-light text-white bg-indigo-600 hover:bg-indigo-700'
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
        {/*
    Mobile menu, show/hide based on mobile menu state.

    Entering: "duration-200 ease-out"
      From: ""
      To: ""
    Leaving: "duration-100 ease-in"
      From: "opacity-100 scale-100"
      To: "opacity-0 scale-95"
  */}

        <div
          className={
            open
              ? 'opacity-100 scale-100 transition ease-out duration-200 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'
              : 'opacity-0 scale-95 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'
          }
        >
          <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50'>
            <div className='pt-5 pb-6 px-5'>
              <div className='flex items-center justify-between'>
                <div>
                  <img
                    className='h-8 w-auto'
                    src='/logoicon.png'
                    alt='Workflow'
                  />
                </div>
                <div className='-mr-2'>
                  <button
                    type='button'
                    className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
                    onClick={() => setOpen(!open)}
                  >
                    <span className='sr-only'>Close menu</span>
                    {/* Heroicon name: outline/x */}
                    <svg
                      className='h-6 w-6'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      aria-hidden='true'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className='mt-6'>
                <nav className='grid gap-y-8'>
                  <a
                    href='#'
                    className='-m-3 p-3 flex items-center rounded-md hover:bg-gray-50'
                  >
                    {/* Heroicon name: outline/chart-bar */}
                    <svg
                      className='flex-shrink-0 h-6 w-6 text-indigo-600'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z'
                      />
                    </svg>
                    <span className='ml-3 text-base font-medium text-gray-900'>
                      Stores
                    </span>
                  </a>
                  <a
                    href='#'
                    className='-m-3 p-3 flex items-center rounded-md hover:bg-gray-50'
                  >
                    {/* Heroicon name: outline/cursor-click */}
                    <svg
                      className='flex-shrink-0 h-6 w-6 text-indigo-600'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                    >
                      <path d='M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z' />
                    </svg>
                    <span className='ml-3 text-base font-medium text-gray-900'>
                      Local Guides
                    </span>
                  </a>
                  <a
                    href='#'
                    className='-m-3 p-3 flex items-center rounded-md hover:bg-gray-50'
                  >
                    {/* Heroicon name: outline/shield-check */}
                    <svg
                      className='flex-shrink-0 h-6 w-6 text-indigo-600'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                    >
                      <path d='M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z' />
                      <path
                        fillRule='evenodd'
                        d='M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <span className='ml-3 text-base font-medium text-gray-900'>
                      Plan & Pricing
                    </span>
                  </a>
                  <a
                    href='#'
                    className='-m-3 p-3 flex items-center rounded-md hover:bg-gray-50'
                  >
                    {/* Heroicon name: outline/view-grid */}
                    <svg
                      className='flex-shrink-0 h-6 w-6 text-indigo-600'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                    >
                      <path d='M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z' />
                      <path d='M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z' />
                    </svg>
                    <span className='ml-3 text-base font-medium text-gray-900'>
                      Newsletter
                    </span>
                  </a>
                  <a
                    href='#'
                    className='-m-3 p-3 flex items-center rounded-md hover:bg-gray-50'
                  >
                    {/* Heroicon name: outline/refresh */}
                    <svg
                      className='flex-shrink-0 h-6 w-6 text-indigo-600'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      aria-hidden='true'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                    <span className='ml-3 text-base font-medium text-gray-900'>
                      Watch Demo
                    </span>
                  </a>
                </nav>
              </div>
            </div>
            <div className='py-6 px-5 space-y-6'>
              <div className='grid grid-cols-2 gap-y-4 gap-x-8'>
                <a
                  href='#'
                  className='text-base font-medium text-gray-900 hover:text-gray-700'
                >
                  Connect
                </a>
                <a
                  href='#'
                  className='text-base font-medium text-gray-900 hover:text-gray-700'
                >
                  Guides
                </a>
                <a
                  href='#'
                  className='text-base font-medium text-gray-900 hover:text-gray-700'
                >
                  Create Profile
                </a>
                <a
                  href='#'
                  className='text-base font-medium text-gray-900 hover:text-gray-700'
                >
                  Blog
                </a>
                <a
                  href='#'
                  className='text-base font-medium text-gray-900 hover:text-gray-700'
                >
                  Help Center
                </a>
                <a
                  href='#'
                  className='text-base font-medium text-gray-900 hover:text-gray-700'
                >
                  Guides
                </a>
                <a
                  href='#'
                  className='text-base font-medium text-gray-900 hover:text-gray-700'
                >
                  Security
                </a>
                <a
                  href='#'
                  className='text-base font-medium text-gray-900 hover:text-gray-700'
                >
                  Events
                </a>
              </div>
              <div>
                <a
                  href='#'
                  className='w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700'
                >
                  Sign up
                </a>
                <p className='mt-6 text-center text-base font-medium text-gray-500'>
                  Existing customer?
                  <a href='#' className='text-indigo-600 hover:text-indigo-500'>
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NavBar
