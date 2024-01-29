import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:9999',
  'http://localhost:9000',
  'http://localhost:9009',
  'http://192.168.1.140:9999',
  'http://192.168.1.140:9000',
  'http://192.168.1.140:9009',
  'https://matchanalyzer.duckdns.org'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (acceptedOrigins.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
})
