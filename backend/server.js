import express from "express";
import  {config} from "dotenv";


config();


const app = express();

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("it is me");
});







app.listen(PORT, () => {
  console.log("Server is up and running on port:5001");
});
