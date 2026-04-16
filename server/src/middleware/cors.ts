import express from "express";
import cors from 'cors';


const cors = cors();
const app = express();

// Allow specific origin
app.use(cors({ origin: 'http://localhost:3000' }));

// Or allow all origins (use with caution in production)
// app.use(cors());