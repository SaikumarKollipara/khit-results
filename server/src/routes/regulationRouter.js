import express from 'express';
import { uploadRegulation } from '../controllers/regulationController.js';

const router = express.Router();

router.post('/upload', uploadRegulation);

export default router;