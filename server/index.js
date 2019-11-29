const app = require('./app')
const config = require('./config/config');

// conectar el servidor
app.listen(config.port, () => {
  console.log(`API corriendo en http://localhost:${config.port}`)
})