import bodyParser from "body-parser";
import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import expenses from "@/routes/expenses";
import categories from "@/routes/categories";

dotenv.config();

const app: Express = express();
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/expenses", expenses);
app.use("/categories", categories);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
