import {
  deleteExpenseById,
  getAllExpenses,
  getExpenseById,
  insertExpense,
  updateExpense,
} from "@/db/expenses_model";
import express, { Request, Response } from "express";

const router = express.Router();

router.post("/create_expense", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const newExpense = await insertExpense(body);
    res.json({ expense: newExpense });
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.put("/update_expense/:id", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const id = req.params.id;
    const newExpense = await updateExpense(id, body.expense);
    res.json({ expense: newExpense });
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete("/delete_expense/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json("Missing expense Id");
    }
    const response = await deleteExpenseById(id as string);
    res.json({ success: response });
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json("Missing expense Id");
    }
    const expense = await getExpenseById(id as string);
    res.send(expense);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.get("/", async (req: Request, res: Response) => {
  try {
    const { sortBy, sortDirection } = req.query;
    const response = await getAllExpenses(
      sortBy as string,
      sortDirection as string
    );
    console.log(response);
    res.send(response);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
