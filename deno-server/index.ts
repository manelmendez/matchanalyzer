import app from './app.ts';
import config from './config/config.ts';

app.addEventListener('listen', () => {
  console.log(`\nListening on localhost:${config.port}`);
});
// conectar el servidor
await app.listen({port:config.port})
