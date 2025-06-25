import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./configs/mongodb.js";

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

// App listen
app.listen(port, () => {
  console.log("server running on port: " + port);
});
