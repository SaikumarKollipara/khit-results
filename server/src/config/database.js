import mongoose from 'mongoose';

import config from './config.js';

export default async function connectDB () {
  try {
    const connection = await mongoose.connect(config.DB_URI, { dbName: config.DB_NAME });
    console.log(`DB connection successfull with: ${connection.connection.host}`);
  } catch (err) {
    console.log(`Error connecting to ${connection.connection.host}, error: ${err}`);
  }
}