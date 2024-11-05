import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { LogIn, X } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoginRequiredModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/login')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-md bg-gray-900 border border-gray-800 text-white p-6 shadow-2xl'>
        {/* Content */}
        <DialogHeader className='space-y-4'>
          <div className='mx-auto w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center'>
            <LogIn className='w-8 h-8 text-gray-300' />
          </div>
          <DialogTitle className='text-2xl font-bold text-center text-gray-100'>
            Login Required
          </DialogTitle>
          <p className='text-gray-400 text-center text-base'>
            Please sign in to access this feature
          </p>
        </DialogHeader>

        <div className='mt-8 space-y-4'>
          <Button
            className='w-full bg-gray-800 hover:bg-gray-700 text-white py-6 text-base font-medium'
            onClick={handleLogin}
          >
            <LogIn className='w-5 h-5 mr-2' />
            Sign In
          </Button>

          <Button
            variant='ghost'
            className='w-full text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LoginRequiredModal
