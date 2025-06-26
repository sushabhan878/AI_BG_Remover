import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import userRouter from "./routes/userRoutes.js";

// App Config
const port = process.env.PORT || 4000;
const app = express();
await connectDB();
// Initialize Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.get("/", (req, res) => {
  res.send("API Working");
});
app.use("/api/user", userRouter);

// App listen
app.listen(port, () => {
  console.log("server running on port: " + port);
});
