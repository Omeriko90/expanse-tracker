import {
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategoryById,
  insertCategory,
} from "@/db/categories_model";
import express, { Request, Response } from "express";

const router = express.Router();

router.post("/create_category", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const newExpense = await insertCategory(body);
    res.json({ expense: newExpense });
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.put("/update_category/:id", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const id = req.params.id;
    const newExpense = await updateCategory(id, body.expense);
    res.json({ expense: newExpense });
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete("/delete_category/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json("Missing expense Id");
    }
    const response = await deleteCategoryById(id as string);
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
    const expense = await getCategoryById(id as string);
    res.send(expense);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.get("/", async (req: Request, res: Response) => {
  try {
    const response = await getAllCategories();
    res.send(response);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
