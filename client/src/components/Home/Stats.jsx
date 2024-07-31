import { useState } from 'react'

const Stats = () => {
  const [selectedTab, setSelectedTab] = useState('statistics')
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }
  return (
    <div className='w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      <div className='sm:hidden'>
        <label htmlFor='tabs' className='sr-only'>
          Select tab
        </label>
        <select
          id='tabs'
          className='bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-sm rounded-t-lg focus:ring-dee-purple-500 focus:border-dee-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-dee-purple-500 dark:focus:border-dee-purple-500'
          onChange={(e) => setSelectedTab(e.target.value)}
        >
          <option value='statistics'>Statistics</option>
          <option value='services'>Services</option>
          <option value='faq'>FAQ</option>
        </select>
      </div>
      <ul
        className='hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400 rtl:divide-x-reverse'
        role='tablist'
      >
        <li className='w-full'>
          <button
            type='button'
            role='tab'
            className={`inline-block w-full p-4 rounded-ss-lg text-base font-light ${
              selectedTab === 'statistics'
                ? 'bg-gray-50 dark:bg-gray-700'
                : 'hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
            onClick={() => setSelectedTab('statistics')}
          >
            Statistics
          </button>
        </li>
        <li className='w-full'>
          <button
            type='button'
            role='tab'
            className={`inline-block w-full p-4 text-base font-light ${
              selectedTab === 'services'
                ? 'bg-gray-50 dark:bg-gray-700'
                : 'hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
            onClick={() => setSelectedTab('services')}
          >
            Services
          </button>
        </li>
        <li className='w-full'>
          <button
            type='button'
            role='tab'
            className={`inline-block w-full p-4 rounded-se-lg text-base font-light ${
              selectedTab === 'faq'
                ? 'bg-gray-50 dark:bg-gray-700'
                : 'hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
            onClick={() => setSelectedTab('faq')}
          >
            FAQ
          </button>
        </li>
      </ul>
      <div className='border-t border-gray-200 dark:border-gray-600'>
        {selectedTab === 'statistics' && (
          <div
            className='p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800'
            role='tabpanel'
          >
            <dl className='grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3  dark:text-white sm:p-8'>
              <div className='flex flex-col items-center justify-center text-center font-light'>
                <dt className='mb-2 text-3xl font-extrabold text-deep-purple-700'>
                  500+
                </dt>
                <dd className='text-deep-purple-500 dark:text-deep-purple-400'>
                  Airbnb Hosts Engaged
                </dd>
              </div>
              <div className='flex flex-col items-center justify-center text-center font-light'>
                <dt className='mb-2 text-3xl font-extrabold text-deep-purple-700'>
                  1000+
                </dt>
                <dd className='text-deep-purple-500 dark:text-deep-purple-400'>
                  Local Guides Published:
                </dd>
              </div>
              <div className='flex flex-col items-center justify-center text-center font-light'>
                <dt className='mb-2 text-3xl font-extrabold text-deep-purple-700'>
                  1500+
                </dt>
                <dd className='text-deep-purple-500 dark:text-deep-purple-400 '>
                  Restaurants Participating
                </dd>
              </div>
              <div className='flex flex-col items-center justify-center text-center font-light'>
                <dt className='mb-2 text-3xl font-extrabold text-deep-purple-700'>
                  300+
                </dt>
                <dd className='text-deep-purple-500 dark:text-deep-purple-400'>
                  Active Contributors
                </dd>
              </div>
              <div className='flex flex-col items-center justify-center text-center font-light'>
                <dt className='mb-2 text-3xl font-extrabold text-deep-purple-700'>
                  20+
                </dt>
                <dd className='text-deep-purple-500 dark:text-deep-purple-400'>
                  Top-Rated Businesses Featured
                </dd>
              </div>
              <div className='flex flex-col items-center justify-center text-center font-light'>
                <dt className='mb-2 text-3xl font-extrabold text-deep-purple-700'>
                  50+
                </dt>
                <dd className='text-deep-purple-500 dark:text-deep-purple-400'>
                  Deals and Promotions Offered:
                </dd>
              </div>
            </dl>
          </div>
        )}
        {selectedTab === 'services' && (
          <div
            className='p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800'
            role='tabpanel'
          >
            <h2 className='mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white'>
              How we are the best?
            </h2>
            <ul
              role='list'
              className='space-y-4 text-gray-500 dark:text-gray-400'
            >
              <li className='flex space-x-2 rtl:space-x-reverse items-center'>
                <svg
                  className='flex-shrink-0 w-3.5 h-3.5 text-deep-purple-600 dark:text-deep-purple-500'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                </svg>
                <span className='leading-tight font-light'>
                  Provides Airbnb guests with personalized local guides and
                  exclusive deals, enriching their travel experience.
                </span>
              </li>
              <li className='flex space-x-2 rtl:space-x-reverse items-center'>
                <svg
                  className='flex-shrink-0 w-3.5 h-3.5 text-deep-purple-600 dark:text-deep-purple-500'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                </svg>
                <span className='leading-tight font-light'>
                  {' '}
                  Features a digital flyer system that allows restaurants to
                  directly market to potential customers and manage online
                  reviews effectively.
                </span>
              </li>
              <li className='flex space-x-2 rtl:space-x-reverse items-center'>
                <svg
                  className='flex-shrink-0 w-3.5 h-3.5 text-deep-purple-600 dark:text-deep-purple-500'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                </svg>
                <span className='leading-tight font-light'>
                  Offers Airbnb hosts free advertising for one property,
                  boosting visibility and potential bookings.
                </span>
              </li>
              <li className='flex space-x-2 rtl:space-x-reverse items-center'>
                <svg
                  className='flex-shrink-0 w-3.5 h-3.5 text-deep-purple-600 dark:text-deep-purple-500'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                </svg>
                <span className='leading-tight font-light'>
                  Engages both tourists and locals by providing a platform that
                  merges travel with local commerce and interactive features.
                </span>
              </li>
            </ul>
          </div>
        )}
        {selectedTab === 'faq' && (
          <div
            className='p-4 bg-white rounded-lg dark:bg-gray-800'
            role='tabpanel'
          >
            <div
              id='accordion-flush'
              data-accordion='collapse'
              data-active-classes='bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
              data-inactive-classes='text-gray-500 dark:text-gray-400'
            >
              <h2 id='accordion-flush-heading-1'>
                <button
                  type='button'
                  className='flex items-center justify-between w-full py-5 font-medium text-left rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400'
                  onClick={() => toggleAccordion(1)}
                  aria-expanded={activeIndex === 1}
                  aria-controls='accordion-flush-body-1'
                >
                  <span className='font-light'>
                    How does this platform benefit me as an Airbnb host?
                  </span>
                  <svg
                    data-accordion-icon
                    className={`w-3 h-3 ${
                      activeIndex === 1 ? 'rotate-180' : ''
                    } shrink-0`}
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 10 6'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M9 5 5 1 1 5'
                    />
                  </svg>
                </button>
              </h2>
              <div
                id='accordion-flush-body-1'
                className={`${activeIndex === 1 ? '' : 'hidden'}`}
                aria-labelledby='accordion-flush-heading-1'
              >
                <div className='py-5 border-b border-gray-200 dark:border-gray-700'>
                  <p className='mb-2 text-gray-500 dark:text-gray-400'>
                    As an Airbnb host, you can enhance your guests experience by
                    providing them with free access to comprehensive local
                    guides that include recommended restaurants, attractions,
                    and unique local insights. Additionally, you can advertise
                    one of your properties on our platform for free, increasing
                    your visibility and potential bookings. Our platform is
                    designed to make your listing more appealing to guests by
                    offering them added value during their stay.
                  </p>
                  <p className='text-gray-500 dark:text-gray-400'>
                    Check out this guide to learn how to{' '}
                    <a
                      href=''
                      className='text-deep-purple-600 dark:text-deep-purple-500 hover:underline'
                    >
                      get started
                    </a>
                  </p>
                </div>
              </div>

              <h2 id='accordion-flush-heading-2'>
                <button
                  type='button'
                  className='flex items-center justify-between w-full py-5 font-medium text-left rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400'
                  onClick={() => toggleAccordion(2)}
                  aria-expanded={activeIndex === 2}
                  aria-controls='accordion-flush-body-2'
                >
                  <span className='font-light'>
                    What advantages do restaurants have by participating?
                  </span>
                  <svg
                    data-accordion-icon
                    className={`w-3 h-3 ${
                      activeIndex === 2 ? 'rotate-180' : ''
                    } shrink-0`}
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 10 6'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M9 5 5 1 1 5'
                    />
                  </svg>
                </button>
              </h2>
              <div
                id='accordion-flush-body-2'
                className={`${activeIndex === 2 ? '' : 'hidden'}`}
                aria-labelledby='accordion-flush-heading-2'
              >
                <div className='py-5 border-b border-gray-200 dark:border-gray-700'>
                  <p className='mb-2 text-gray-500 dark:text-gray-400'>
                    Restaurants can increase their exposure by being featured in
                    our local guides, which are accessed by tourists and locals
                    looking for dining options. Participating in our platform
                    allows you to publish your deals and flyers, directly
                    engaging with potential customers. Moreover, our unique
                    digital flyer system includes a review prompt feature that
                    encourages satisfied customers to leave positive feedback on
                    Google, enhancing your online reputation and visibility.
                  </p>
                  <p className='text-gray-500 dark:text-gray-400'>
                    Check out the{' '}
                    <a
                      href=''
                      className='text-deep-purple-600 dark:text-deep-purple-500 hover:underline'
                    >
                      Guide Section
                    </a>
                  </p>
                </div>
              </div>

              <h2 id='accordion-flush-heading-3'>
                <button
                  type='button'
                  className='flex items-center justify-between w-full py-5 font-medium text-left rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400'
                  onClick={() => toggleAccordion(3)}
                  aria-expanded={activeIndex === 3}
                  aria-controls='accordion-flush-body-3'
                >
                  <span className='font-light'>
                    Can you explain how the digital flyer system works and how
                    it benefits me as a customer
                  </span>
                  <svg
                    data-accordion-icon
                    className={`w-3 h-3 ${
                      activeIndex === 3 ? 'rotate-180' : ''
                    } shrink-0`}
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 10 6'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M9 5 5 1 1 5'
                    />
                  </svg>
                </button>
              </h2>
              <div
                id='accordion-flush-body-3'
                className={`${activeIndex === 3 ? '' : 'hidden'}`}
                aria-labelledby='accordion-flush-heading-3'
              >
                <div className='py-5 border-b border-gray-200 dark:border-gray-700'>
                  <p className='mb-2 text-gray-500 dark:text-gray-400'>
                    Our digital flyer system is designed to provide you with
                    exclusive deals and updates from your favorite local spots.
                    By scanning a QR code at participating businesses, you can
                    subscribe to receive digital flyers that include special
                    promotions and updates directly to your phone.
                  </p>
                  <p className='mb-2 text-gray-500 dark:text-gray-400'>
                    If you choose to rate the business, a high rating prompts
                    you to leave a review on Google, enhancing the business
                    profile. Conversely, if your experience was less than
                    satisfactory, you will be directed to a feedback form,
                    allowing you to voice your concerns directly to the business
                    for immediate attention.
                  </p>
                  <p className='mb-2 text-gray-500 dark:text-gray-400'>
                    This system ensures that your feedback is valued and that
                    you always have access to the latest deals in your area.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Stats
