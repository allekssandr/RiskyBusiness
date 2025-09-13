import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { errorHandler } from '@/middlewares/errorHandler';
import { notFound } from '@/middlewares/notFound';
import gameRoutes from '@/routes/gameRoutes';
import playerRoutes from '@/routes/playerRoutes';
import scenarioRoutes from '@/routes/scenarioRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/games', gameRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/scenarios', scenarioRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Health check: http://localhost:${PORT}/health`);
});

export default app;
