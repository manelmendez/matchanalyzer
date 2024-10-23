import pg from 'pg'

process.loadEnvFile()

const { Pool } = pg
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.PMA_HOST || process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432
})
pool
  .connect()
  .then(() => {
    console.log('Connected to postgresql')
  })
  .catch((err) => {
    console.log('Connection failed')
    console.log(err)
    console.log('Trying connection again...')
    reconnect()
  })
const reconnect = async () => {
  pool
    .connect()
    .then(() => {
      console.log('Connected to postgresql')
    })
    .catch((err) => {
      console.log('Connection failed')
      console.log(err)
      setTimeout(function () {
        console.log('Trying connection again...')
        reconnect()
      }, 5000)
    })
}

pool.on('error', (err) => {
  console.error('Conexión perdida', err.stack)
  reconnect()
})

export default pool
