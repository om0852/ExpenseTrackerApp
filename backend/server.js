import express from "express";
import { config } from "dotenv";
import { sql } from "./config/db.js";

config();

const app = express();
app.use(express.json());
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
    console.log("Database created successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

app.get("/", (req, res) => {
  res.send("it is me");
});

app.get("/api/transactions/:userId",async(req,res)=>{
    try {
        
        const {userId} = req.params;
        const transactions = await sql`SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC`
        
        res.status(200).json(transactions);
    } catch (error) {
      console.log(error);  
      res.status(500).json("Internal Error");

    }
})


app.post("/api/transactions", async (req, res) => {
  try {
    const { title, amount, category, user_id } = req.body;
    if (!title || !user_id || !category || amount === undefined) {
      return res.status(400).json({ message: "all field are required" });
    }
    const transation =
      await sql` INSERT INTO transactions(user_id,title,amount,category) VALUES (${user_id},${title},${amount},${category}) RETURNING *`;

    res.status(201).json(transation[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Error");
  }
});

app.delete("/api/transactions/:id",async (req,res) => {
try {
    const {id} = req.params;
    if(!id){
        res.status(400).json({message:"id required"})
    }
  const transation =   await sql` delete from transactions where id = ${id} RETURNING *`
    res.status(200).json({message:"Delete successfully"})
    
} catch (error) {
    res.status(500).json("Internal Error");
}
    
})

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is up and running on port:5001");
  });
});
