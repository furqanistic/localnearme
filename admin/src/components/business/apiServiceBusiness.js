import { axiosInstance } from '../../config'

export const fetchbusiness = async () => {
  const response = await axiosInstance.get(`/business`)
  return response.data.data.businesses
}

export const createBusiness = async (businessData) => {
  const response = await axiosInstance.post(`/business`, businessData)
  return response.data.data.businesses
}

export const updateBusiness = async (id, businessData) => {
  const response = await axiosInstance.patch(`/business/${id}`, businessData)
  return response.data.data.businesses
}

export const deleteBusiness = async (id) => {
  await axiosInstance.delete(`/business/${id}`)
}

export const sendDigitalFlyer = async (id) => {
  const response = await axiosInstance.post(`/business/${id}/send-flyer`)
  return response.data
}
