import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { errorHandler } from "./middleware/errorHandler.js";
import connectDb from "./config/Db.js";
import authRouter from "./routes/authRoute.js";

//es6 module__dirname alternative
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// initialize app
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
//DataBase Connection
connectDb();

// static folder for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Routes
app.use("api/auth", authRouter);
app.use(errorHandler);

//404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
    statusCode: 404,
  });
});

app.listen(3000, () => {
  console.log("Server is runing");
});
