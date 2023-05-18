import express from 'express';
import cors from 'cors';

import resultsRouter from './routes/resultsRouter.js';
import regulationRouter from './routes/regulationRouter.js';
import { errorHandler } from './middlewares/errorMiddleware.js';
import config from './config/config.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// Route handlers
app.use('/api/v1/results', resultsRouter);
app.use('/api/v1/regulation', regulationRouter);
app.get('*', (req, res) => { res.status(400).send('Route not found'); });

app.use(errorHandler);

export default app;