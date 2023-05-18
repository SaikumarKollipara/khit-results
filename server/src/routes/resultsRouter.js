import express from 'express';
import { getResults, uploadResults } from '../controllers/resultsController.js';
import upload from '../config/multer.js';

const router = express.Router();

router.get('/:rollNo', getResults);
router.post('/upload', upload.single('file'), uploadResults);

export default router;