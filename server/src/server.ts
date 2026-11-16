import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import docRoutes from './routes/docRoutes.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/docs', docRoutes);

app.get('/', (req, res) => {
  res.send('Ajaia Docs Backend is running successfully!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});