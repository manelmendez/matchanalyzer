import express from 'express'
import apiV1 from './routes/routesV1.js'
import path from 'path'
// import morgan from 'morgan'
// import helmet from 'helmet'
// import history from 'connect-history-api-fallback'
import { corsMiddleware } from './middlewares/cors.js'
import { errorCtrl } from './controllers/errorCtrl.js'
const app = express()
// middleware para solo parsear requires en formato urlencoded
app.use(express.urlencoded({ extended: false }))
// middleware para solo parsear requires en formato JSON
app.use(express.json())
// middleware para usar CORS y su configuración (métodos que permite)
app.use(corsMiddleware())
// middleware para obtener LOGS de cada petición que hagamos al servidor
// app.use(morgan('dev'))

// SEGURIDAD, helmet protege de varias cosas sobretodo en temas de cabeceras HTTP
// app.use(helmet()) //desactivado de momento porque da problemas al cargar imagenes por el CSP header
app.disable('x-powered-by') // cabezera peligrosa, activar si se desactiva helmet()
// middleware para que las rutas estaticas de la SPA funcionen bien (esto es "por culpa" del HISTORY MODE de VueJS)
// app.use(history())
// la ruta a los archivos estaticos (HTML, JS, ...) una vez hecho el "build" en cliente
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, '../client/dist')))
app.use('/assets',express.static(path.join(__dirname,'src/assets')))
// hay que decirle a express en que ruta estan las vistas (aunque solo hay una que es index.html en la carpeta client)
// app.set('views', path.join(__dirname, '../client/dist'));
// aquí le decimos que el engine que usaremos es html y que use EJS para renderizarlo
// app.engine('html', require('ejs').renderFile);
// ahora seteamos html como view engine de express
// app.set('view engine', 'html');
// aquí le decimos que en cualquier ruta nos renderice el index.html que es la base de todos los componentes
// app.get('*', (request, response) => {
//    response.render('index')
// })

// Rutas
app.use('/v1', apiV1)
// Error Control
app.use(errorCtrl)

export default app
