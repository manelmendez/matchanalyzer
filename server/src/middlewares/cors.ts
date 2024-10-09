import cors from 'cors'

const acceptedOrigins: string[] = [
  'http://localhost:9999',
  'http://localhost:9000',
  'http://localhost:9009',
  'http://192.168.1.140:9999',
  'http://192.168.1.140:9000',
  'http://192.168.1.140:9009',
  'https://matchanalyzer.duckdns.org',
];

const corsOptions: cors.CorsOptions = {
  origin: acceptedOrigins
};

export const corsMiddleware = () => cors(corsOptions)