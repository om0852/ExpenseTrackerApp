import express from "express";
import { config } from "dotenv";
import { sql } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import router from "./routes/transactionRoute.js";
import job from "./config/cron.js";

config();

const app = express();
app.use(express.json());
app.use(rateLimiter);
if(process.env.NODE_ENV==="production") job.start();
const PORT = process.env.PORT || 5001;

async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10,2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;
    console.log("Database Created Successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
app.get("/",(req,res)=>{
  res.json("hey bro")
})
app.use("/api", router);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is up and running on port:5001");
  });
});
