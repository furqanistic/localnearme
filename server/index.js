import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import businessRoute from './routes/business.js'
import newsletterRoutes from './routes/newsLetters.js'
import subscriptionRoutes from './routes/subscription.js'

const app = express()
dotenv.config()

const allowedOrigins = [
  process.env.NODE_ENV === 'production'
    ? process.env.MAIN_DOMAIN
    : process.env.CLIENT_URL,
  process.env.DASHBOARD_URL,
  process.env.API_URL,
]

app.use(cookieParser())
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

app.use(express.json())
mongoose.set('strictQuery', true)

app.options('*', cors()) // Enable pre-flight requests for all routes

app.use((req, res, next) => {
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin)
  }
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Methods',
    'GET,PUT,POST,DELETE,UPDATE,OPTIONS'
  )
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
  )
  next()
})

app.use('/api/auth/', authRoute)
app.use('/api/business/', businessRoute)
app.use('/api/subscriptions/', subscriptionRoutes)
app.use('/api/newsletter/', newsletterRoutes)
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "script-src 'self' https://js.stripe.com https://m.stripe.network https://checkout.stripe.com;"
  )
  next()
})
const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log('Connected to MongoDB')
    })
    .catch((err) => console.log(err))
}

app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Something went wrong'
  return res.status(status).json({
    success: false,
    status,
    message,
  })
})

// run here
app.listen(8800, () => {
  connect()
  console.log('Server running at 8800')
})
