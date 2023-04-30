import express from 'express';

import resultsRouter from './routes/resultsRouter.js';
import { errorHandler } from './middlewares/errorMiddleware.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Route handlers
app.use('/api/v1/results', resultsRouter);
app.use('*', (req, res) => { res.status(200).send('khit results api'); });

app.use(errorHandler);

export default app;