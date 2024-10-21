import ViewBusinessListing from '@/components/Business/ViewBusinessListing'
import NavigationBar from '@/components/Layout/NavigationBar'
import Loader from '@/components/utils/Loader'
import { axiosInstance } from '@/config'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

const BusinessListingPage = () => {
  const { id } = useParams()

  const { data: business, status } = useQuery(
    ['business', id],
    async () => {
      const res = await axiosInstance.get(`/business/${id}`)
      return res.data.data.business
    },
    {
      enabled: !!id,
    }
  )

  return (
    <div>
      <NavigationBar />
      {status === 'loading' && <Loader />}
      {status === 'error' && <p>Error loading business data</p>}
      {status === 'success' && business && (
        <ViewBusinessListing business={business} />
      )}
    </div>
  )
}

export default BusinessListingPage
