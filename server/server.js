import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import serviceRoutes from "./routes/serviceRoutes.js"

dotenv.config();

const app = express();

connectDB()


const PORT =process.env.PORT || 8000;



app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Node.js Server!");
});

app.use('/api/auth',authRoutes)
app.use('/api/services',serviceRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
