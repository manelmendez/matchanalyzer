import app from './app.js'
import config from './config/config.js'

// conectar el servidor
app.listen(config.port, () => {
  console.log(`API corriendo en http://localhost:${config.port}`);
});