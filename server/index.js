import app from './app.js'
import config from './config/config.js'
import os from 'node:os'

// console.log('Información del sistema operativo:')
// console.log('-------------------')
// console.log('Nombre del sistema operativo', os.platform())
// console.log('Versión del sistema operativo', os.release())
// console.log('Arquitectura', os.arch())
// console.log('CPUs', os.cpus())
// console.log('Memoria libre', os.freemem() / 1024 / 1024)
// console.log('Memoria total', os.totalmem() / 1024 / 1024)

// conectar el servidor
app.listen(config.port, () => {
  console.log(`API corriendo en http://localhost:${config.port}`)
})
