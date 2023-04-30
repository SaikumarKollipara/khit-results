import multer from 'multer';

import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: (req, file, cb) => { 
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => { 
    // cb(null, Date.now() + '-' + file.originalname);
    // cb(null, file.fieldname + '.' + file.originalname.split('.').at(-1));
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });
export default upload;