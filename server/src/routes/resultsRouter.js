import express from 'express';
import { uploadResults } from '../controllers/resultsController.js';

const router = express.Router();

router.post('/upload', uploadResults);

// router.get('/results');
// router.post('/results');

export default router;