import express from "express";
import cors from "cors";
import "dotenv/config";
import { dbconnect } from "./config/db.js";
import bookRoutes from "./routes/bookRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { limiter } from "./middleware/rate-limiter.js";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'https://booklify-2igp.vercel.app'
})); 
app.use(express.json());
app.use(limiter);

// Routes
app.use("/books", bookRoutes);
app.use("/users", userRoutes);
 


// Connect to database and start server
dbconnect();

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server is running on http://localhost:${PORT}`);
});
