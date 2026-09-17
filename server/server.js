import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import serviceRoutes from "./routes/serviceRoutes.js"
import technicianRoutes from "./routes/technicianRoutes.js"
import cors from 'cors'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

connectDB()


const PORT =process.env.PORT || 8000;



app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/", (req, res) => {
  res.send("Hello from Node.js Server!");
});

app.use('/api/auth',authRoutes)
app.use('/api/services',serviceRoutes)
app.use('/api/technicians',technicianRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
