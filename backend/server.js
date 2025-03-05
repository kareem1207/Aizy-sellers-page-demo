import express from "express";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.routes.js";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(express.json()); //* allows json for req.body

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running in development mode");
  });
}

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
