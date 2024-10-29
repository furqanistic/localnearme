import Navigationbar from '@/components/Layout/NavigationBar'
import { Bell, Eye, Mail, Moon } from 'lucide-react'
import React, { useState } from 'react'

const BasicSettingsPage = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    profileVisibility: 'public',
    newsletter: false,
  })

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
        <div className='max-w-2xl mx-auto'>
          {/* Header */}
          <h1 className='text-2xl font-bold mb-8'>Settings</h1>

          {/* Settings Container */}
          <div className='bg-[#1e1e1e] rounded-xl p-6 space-y-6'>
            <div className='h-px bg-[#424242]' />

            {/* Notifications */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <Bell size={20} className='text-gray-400' />
                <div>
                  <h3 className='font-medium'>Email Notifications</h3>
                  <p className='text-sm text-gray-400'>Receive email updates</p>
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
                  <p className='text-sm text-gray-400'>Receive newsletter</p>
                </div>
              </div>
              <ToggleSwitch
                enabled={settings.newsletter}
                onChange={(value) =>
                  setSettings((prev) => ({ ...prev, newsletter: value }))
                }
              />
            </div>
          </div>

          {/* Save Button */}
          <div className='mt-6'>
            <button className='w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200'>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default BasicSettingsPage
