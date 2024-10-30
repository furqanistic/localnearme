import Navigationbar from '@/components/Layout/NavigationBar'
import {
  Bell,
  Building,
  Calendar,
  Camera,
  Edit2,
  Eye,
  Mail,
  MapPin,
  Moon,
  Phone,
  Save,
} from 'lucide-react'
import React, { useState } from 'react'

const ProfileProfile = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    company: 'Tech Solutions Inc.',
    joinDate: 'January 2022',
    bio: 'Passionate developer with expertise in React and modern web technologies.',
  })
  const [settings, setSettings] = useState({
    emailNotifications: true,
    profileVisibility: 'public',
    newsletter: false,
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

  const ToggleSwitch = ({ enabled, onChange }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 
        ${enabled ? 'bg-blue-600' : 'bg-[#424242]'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 
          ${enabled ? 'translate-x-6' : 'translate-x-1'}`}
      />
    </button>
  )

  return (
    <>
      <Navigationbar />
      <div className='min-h-screen bg-[#141414] text-gray-100 p-4 md:p-8'>
        <div className='max-w-4xl mx-auto'>
          {/* Header Section */}
          <div className='flex flex-col md:flex-row items-start md:items-center justify-between mb-8'>
            <h1 className='text-3xl font-bold mb-4 md:mb-0'>Profile</h1>
            <div className='flex gap-4'>
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-blue-600 text-white'
                    : 'bg-[#424242] hover:bg-[#525252]'
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'settings'
                    ? 'bg-blue-600 text-white'
                    : 'bg-[#424242] hover:bg-[#525252]'
                }`}
              >
                Settings
              </button>
              {activeTab === 'profile' && (
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
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className='bg-[#1e1e1e] rounded-xl p-6 shadow-lg'>
            {activeTab === 'profile' ? (
              <>
                {/* Profile Photo Section */}
                <div className='flex flex-col items-center mb-8'>
                  <div className='relative'>
                    <div className='w-32 h-32 rounded-full bg-[#424242] flex items-center justify-center overflow-hidden'>
                      <img
                        src='/api/placeholder/128/128'
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
              </>
            ) : (
              // Settings Tab Content
              <div className='space-y-6'>
                {/* Email Notifications */}
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <Bell size={20} className='text-gray-400' />
                    <div>
                      <h3 className='font-medium'>Email Notifications</h3>
                      <p className='text-sm text-gray-400'>
                        Receive email updates
                      </p>
                    </div>
                  </div>
                  <ToggleSwitch
                    enabled={settings.emailNotifications}
                    onChange={(value) =>
                      setSettings((prev) => ({
                        ...prev,
                        emailNotifications: value,
                      }))
                    }
                  />
                </div>

                <div className='h-px bg-[#424242]' />

                {/* Profile Visibility */}
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <Eye size={20} className='text-gray-400' />
                    <div>
                      <h3 className='font-medium'>Profile Visibility</h3>
                      <p className='text-sm text-gray-400'>
                        Control who can see your profile
                      </p>
                    </div>
                  </div>
                  <select
                    value={settings.profileVisibility}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        profileVisibility: e.target.value,
                      }))
                    }
                    className='bg-[#2a2a2a] border border-[#424242] rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  >
                    <option value='public'>Public</option>
                    <option value='private'>Private</option>
                  </select>
                </div>

                <div className='h-px bg-[#424242]' />

                {/* Newsletter */}
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <Mail size={20} className='text-gray-400' />
                    <div>
                      <h3 className='font-medium'>Newsletter</h3>
                      <p className='text-sm text-gray-400'>
                        Receive newsletter updates
                      </p>
                    </div>
                  </div>
                  <ToggleSwitch
                    enabled={settings.newsletter}
                    onChange={(value) =>
                      setSettings((prev) => ({ ...prev, newsletter: value }))
                    }
                  />
                </div>

                {/* Save Button */}
                <div className='mt-6'>
                  <button className='w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200'>
                    Save Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileProfile
