import dotenv from "dotenv";
import { getAbsolutePath } from "../utils/features.js";

// import path, { dirname } from "path";
// import { fileURLToPath } from "url";

// const __dirname = dirname(fileURLToPath(import.meta.url));
// const CONFIG_FILE_PATH = path.join(__dirname, "../../.env");

const CONFIG_FILE_PATH = getAbsolutePath(import.meta.url, '../../.env');

dotenv.config({ path: CONFIG_FILE_PATH });

const config = {
  PORT: process.env.PORT || 5000,
  APP_ENV: process.env.APP_ENV || "production",
  DB_URI: process.env.DB_URI,
  DB_NAME: process.env.DB_NAME,
  FRONTEND_URL: process.env.FRONTEND_URL
};

export default config;