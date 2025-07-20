import express from "express";
import  {config} from "dotenv";
import { sql } from "./config/db.js";


config();


const app = express();

const PORT = process.env.PORT || 5001;


async function initDB(){
    try {
        await sql`CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10,2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`
        console.log("Database created successfully")
    } catch (error) {
        console.log(error);
        process.exit(1)
    }

}


app.get("/", (req, res) => {
  res.send("it is me");
});






initDB().then(()=>{
    app.listen(PORT, () => {
        console.log("Server is up and running on port:5001");
    });
})
