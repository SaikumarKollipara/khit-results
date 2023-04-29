import app from './app.js';

function startServer() {
  app.listen(5000, () => { console.log(`Server listening on port: ${5000}`); });
}

startServer()