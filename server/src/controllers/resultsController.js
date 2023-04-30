import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { AppError } from "../middlewares/errorMiddleware.js";

export async function uploadResults (req, res, next) {
  try {


    // Cleanup
    const uploadedFilePath = path.resolve(dirname(fileURLToPath(import.meta.url)), '../uploads', req.file.originalname)
    fs.unlink(uploadedFilePath, (error) => {
      if (error) {
        console.error(`Failed to delete file: ${uploadedFilePath}`, error);
      } else {
        console.log(`File deleted: ${uploadedFilePath}`);
      }
    });
    return res.status(200).json({ success: true, message: 'Results uploaded successfully' });
  } catch (err) {
    next(err);
  }
}