import express from 'express';
import cors from 'cors';
import "dotenv/config";
import connectDB from './config/db.js';
import userRouter from './routes/userRoute.js';
import resumeRouter from './routes/resumeRouter.js';
import aiRouter from './routes/aiRoute.js';
import path from 'path';
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;

// 🔥 حل مشكلة __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// database connection
await connectDB();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// API Routes
app.use('/api/users', userRouter);
app.use('/api/resume', resumeRouter);
app.use('/api/ai', aiRouter);

// 🔥 React build
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});