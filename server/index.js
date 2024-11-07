import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { todoRouter } from './routes/todos.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/todos', todoRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Development mode - let Vite handle all requests
if (process.env.NODE_ENV === 'development') {
  console.log('Running in development mode');
  app.get('*', (req, res) => {
    res.redirect('http://localhost:5173' + req.url);
  });
} else {
  // Production mode - serve static files and handle client routing
  console.log('Running in production mode');
  app.use(express.static(path.join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});