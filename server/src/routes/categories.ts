import { getAllCategories, getCategoryById } from "@/db/categories_model";
import express, { Request, Response } from "express";

const router = express.Router();

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
router.get("/", async (_req: Request, res: Response) => {
  try {
    const response = await getAllCategories();
    res.send(response);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
