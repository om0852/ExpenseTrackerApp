import express from "express";
import { sql } from "../config/db.js";
const router = express.Router();



router.get("/", (req, res) => {
    res.send("it is me");
  });
  
  router.get("/transactions/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const transactions =
        await sql`SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC`;
  
      res.status(200).json(transactions);
    } catch (error) {
      console.log(error);
      res.status(500).json("Internal Error");
    }
  });
  
  router.post("/transactions", async (req, res) => {
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
  
  router.delete("/transactions/:id", async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "id required" });
      }
      const transation =
        await sql` delete from transactions where id = ${id} RETURNING *`;
      res.status(200).json({ message: "Delete successfully" });
    } catch (error) {
      res.status(500).json("Internal Error");
    }
  });
  
  router.get("/transactions/summary/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      console.log(userId)
      const balanceResult = await sql`
  SELECT COALESCE(SUM(amount),0) as balance FROM transactions WHERE user_id =${userId}
  `;
      const incomeResult = await sql`
  SELECT COALESCE(SUM(amount),0) as income FROM transactions WHERE user_id = ${userId} AND amount>0
  
  `;
      const expenseResult = await sql`
  SELECT COALESCE(SUM(amount),0) as expense FROM transactions WHERE user_id = ${userId} AND amount<0
  
  `;
  
  res.status(200).json({
    balance:balanceResult[0].balance,
    income:incomeResult[0].income,
    expense:expenseResult[0].expense
  
  })
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  


export default router