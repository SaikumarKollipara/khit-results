import express from 'express';
import { uploadResults } from '../controllers/resultsController.js';
import upload from '../config/multer.js';

const router = express.Router();

router.post('/upload', upload.single('results'), uploadResults);

export default router;