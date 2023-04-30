import app from './app.js';

import config from './config/config.js';
import connectDB from './config/database.js';

function startServer() {
  connectDB();
  app.listen(config.PORT, () => { console.log(`Server listening on port: ${config.PORT}`); });
}

startServer();