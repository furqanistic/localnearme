import {
  AlertCircle,
  Eye,
  EyeOff,
  Loader,
  Lock,
  LogIn,
  Mail,
  User,
  UserPlus,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../config'
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice'

const SignupLoginPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [redirect, setRedirect] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (redirect) {
      const timer = setTimeout(() => {
        navigate('/')
      }, 1000) // Redirect after 2 seconds
      return () => clearTimeout(timer)
    }
  }, [redirect, navigate])

  const toggleForm = () => {
    setIsLogin(!isLogin)
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(loginStart())
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      if (!isLogin && password !== confirmPassword) {
        throw new Error('Passwords do not match')
      }
      const endpoint = isLogin ? '/auth/signin' : '/auth/signup'
      const payload = isLogin ? { email, password } : { name, email, password }
      const response = await axiosInstance.post(endpoint, payload)
      if (response.data.status === 'success') {
        if (isLogin) {
          setSuccess('Logged in successfully!')
          dispatch(loginSuccess(response.data))
          // Remove this line: localStorage.setItem('token', response.data.token)
          setRedirect(true)
        } else {
          setSuccess('Account created successfully! Please log in.')
          setIsLogin(true)
          setName('')
          setPassword('')
          setConfirmPassword('')
          setAgreeTerms(false)
        }
      } else {
        throw new Error(response.data.message || 'An error occurred')
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || 'An error occurred'
      setError(errorMessage)
      dispatch(loginFailure(errorMessage))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    // Implement Google login logic here
  }

  return (
    <div className='flex-1 relative z-10 overflow-auto'>
      <div className='min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <div className='text-center'>
            <h2 className='mt-6 text-3xl font-extrabold text-white'>
              {isLogin ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className='mt-2 text-sm text-gray-400'>
              {isLogin
                ? 'Sign in to access your account'
                : 'Join us and start your journey'}
            </p>
          </div>
          <div className='mt-8 bg-gray-800 bg-opacity-50 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-gray-700'>
            {error && (
              <div
                className='mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800'
                role='alert'
              >
                <div className='flex items-center'>
                  <AlertCircle className='h-4 w-4 mr-2' />
                  <span>{error}</span>
                </div>
              </div>
            )}
            {success && (
              <div
                className='mb-4 p-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800'
                role='alert'
              >
                <span>{success}</span>
              </div>
            )}
            <form className='space-y-6' onSubmit={handleSubmit}>
              {!isLogin && (
                <div>
                  <label htmlFor='name' className='sr-only'>
                    Full Name
                  </label>
                  <div className='relative'>
                    <User
                      className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                      size={18}
                    />
                    <input
                      id='name'
                      name='name'
                      type='text'
                      required
                      className='appearance-none rounded-lg relative block w-full px-3 py-2 pl-10 border border-gray-600 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-700 transition duration-150 ease-in-out'
                      placeholder='Full Name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              )}
              <div>
                <label htmlFor='email-address' className='sr-only'>
                  Email address
                </label>
                <div className='relative'>
                  <Mail
                    className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                    size={18}
                  />
                  <input
                    id='email-address'
                    name='email'
                    type='email'
                    autoComplete='email'
                    required
                    className='appearance-none rounded-lg relative block w-full px-3 py-2 pl-10 border border-gray-600 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-700 transition duration-150 ease-in-out'
                    placeholder='Email address'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor='password' className='sr-only'>
                  Password
                </label>
                <div className='relative'>
                  <Lock
                    className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                    size={18}
                  />
                  <input
                    id='password'
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    autoComplete='new-password'
                    required
                    className='appearance-none rounded-lg relative block w-full px-3 py-2 pl-10 pr-10 border border-gray-600 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-700 transition duration-150 ease-in-out'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type='button'
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              {!isLogin && (
                <div>
                  <label htmlFor='confirm-password' className='sr-only'>
                    Confirm Password
                  </label>
                  <div className='relative'>
                    <Lock
                      className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                      size={18}
                    />
                    <input
                      id='confirm-password'
                      name='confirm-password'
                      type={showPassword ? 'text' : 'password'}
                      autoComplete='new-password'
                      required
                      className='appearance-none rounded-lg relative block w-full px-3 py-2 pl-10 pr-10 border border-gray-600 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-700 transition duration-150 ease-in-out'
                      placeholder='Confirm Password'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  {password !== confirmPassword && confirmPassword !== '' && (
                    <p className='mt-2 text-sm text-red-500 flex items-center'>
                      <AlertCircle size={16} className='mr-1' /> Passwords do
                      not match
                    </p>
                  )}
                </div>
              )}
              {!isLogin && (
                <div className='flex items-center'>
                  <input
                    id='agree-terms'
                    name='agree-terms'
                    type='checkbox'
                    required
                    className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                  />
                  <label
                    htmlFor='agree-terms'
                    className='ml-2 block text-sm text-gray-400'
                  >
                    I agree to the{' '}
                    <a
                      href='#'
                      className='text-blue-400 hover:text-blue-300 transition duration-150 ease-in-out'
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              )}
              <div>
                <button
                  type='submit'
                  className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed'
                  disabled={loading}
                >
                  <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                    {loading ? (
                      <Loader className='h-5 w-5 animate-spin text-blue-500' />
                    ) : isLogin ? (
                      <LogIn
                        className='h-5 w-5 text-blue-500 group-hover:text-blue-400'
                        aria-hidden='true'
                      />
                    ) : (
                      <UserPlus
                        className='h-5 w-5 text-blue-500 group-hover:text-blue-400'
                        aria-hidden='true'
                      />
                    )}
                  </span>
                  {loading ? 'Processing...' : isLogin ? 'Sign in' : 'Sign up'}
                </button>
              </div>
            </form>
            <div className='mt-6'>
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-600'></div>
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='px-2 bg-gray-800 text-gray-400'>Or</span>
                </div>
              </div>
              <div className='mt-6'>
                <button
                  onClick={handleGoogleLogin}
                  className='w-full flex items-center justify-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-200 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out'
                >
                  <svg
                    className='h-5 w-5 mr-2'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z' />
                  </svg>
                  Sign in with Google
                </button>
              </div>
            </div>
            <div className='mt-6'>
              <p className='text-center text-sm text-gray-400'>
                {isLogin
                  ? "Don't have an account?"
                  : 'Already have an account?'}
                <button
                  onClick={toggleForm}
                  className='font-medium text-blue-400 hover:text-blue-300 ml-2 transition duration-150 ease-in-out'
                >
                  {isLogin ? 'Sign up' : 'Log in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupLoginPage
