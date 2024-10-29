import Navigationbar from '@/components/Layout/NavigationBar'
import {
  Building,
  Calendar,
  Camera,
  Edit2,
  Mail,
  MapPin,
  Phone,
  Save,
} from 'lucide-react'
import React, { useState } from 'react'

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    company: 'Tech Solutions Inc.',
    joinDate: 'January 2022',
    bio: 'Passionate developer with expertise in React and modern web technologies. Always eager to learn and contribute to innovative projects.',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsEditing(false)
    // Here you would typically handle the API call to update the profile
  }

  return (
    <>
      <Navigationbar />
      <div className='min-h-screen bg-[#141414] text-gray-100 p-4 md:p-8'>
        <div className='max-w-4xl mx-auto'>
          {/* Header Section */}
          <div className='flex flex-col md:flex-row items-start md:items-center justify-between mb-8'>
            <h1 className='text-3xl font-bold mb-4 md:mb-0'>
              Profile Settings
            </h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className='flex items-center gap-2 px-4 py-2 bg-[#424242] rounded-lg hover:bg-[#525252] transition-colors'
            >
              {isEditing ? (
                <>
                  <Save size={20} />
                  <span>Save Changes</span>
                </>
              ) : (
                <>
                  <Edit2 size={20} />
                  <span>Edit Profile</span>
                </>
              )}
            </button>
          </div>

          {/* Main Content */}
          <div className='bg-[#1e1e1e] rounded-xl p-6 shadow-lg'>
            {/* Profile Photo Section */}
            <div className='flex flex-col items-center mb-8'>
              <div className='relative'>
                <div className='w-32 h-32 rounded-full bg-[#424242] flex items-center justify-center overflow-hidden'>
                  <img
                    src='https://ttwo.dk/wp-content/uploads/2017/08/person-placeholder.jpg'
                    alt='Profile'
                    className='w-full h-full object-cover'
                  />
                </div>
                {isEditing && (
                  <button className='absolute bottom-0 right-0 p-2 bg-[#424242] rounded-full hover:bg-[#525252] transition-colors'>
                    <Camera size={20} />
                  </button>
                )}
              </div>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Profile Information Grid */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Name */}
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-400'>
                    Full Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className='w-full px-4 py-2 rounded-lg bg-[#2a2a2a] border border-[#424242] focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
                  />
                </div>

                {/* Email */}
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-400'>
                    Email
                  </label>
                  <div className='relative'>
                    <Mail
                      size={20}
                      className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                    />
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className='w-full pl-10 pr-4 py-2 rounded-lg bg-[#2a2a2a] border border-[#424242] focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-400'>
                    Phone
                  </label>
                  <div className='relative'>
                    <Phone
                      size={20}
                      className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                    />
                    <input
                      type='tel'
                      name='phone'
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className='w-full pl-10 pr-4 py-2 rounded-lg bg-[#2a2a2a] border border-[#424242] focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
                    />
                  </div>
                </div>

                {/* Location */}
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-400'>
                    Location
                  </label>
                  <div className='relative'>
                    <MapPin
                      size={20}
                      className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                    />
                    <input
                      type='text'
                      name='location'
                      value={formData.location}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className='w-full pl-10 pr-4 py-2 rounded-lg bg-[#2a2a2a] border border-[#424242] focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
                    />
                  </div>
                </div>

                {/* Company */}
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-400'>
                    Company
                  </label>
                  <div className='relative'>
                    <Building
                      size={20}
                      className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                    />
                    <input
                      type='text'
                      name='company'
                      value={formData.company}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className='w-full pl-10 pr-4 py-2 rounded-lg bg-[#2a2a2a] border border-[#424242] focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
                    />
                  </div>
                </div>

                {/* Join Date */}
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-400'>
                    Join Date
                  </label>
                  <div className='relative'>
                    <Calendar
                      size={20}
                      className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                    />
                    <input
                      type='text'
                      name='joinDate'
                      value={formData.joinDate}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className='w-full pl-10 pr-4 py-2 rounded-lg bg-[#2a2a2a] border border-[#424242] focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage
