import { Category } from "@/types";
import { default as pool } from "./connection";

async function getCategoryById(id: string) {
  const [rows] = await pool.query(
    `
          SELECT * 
          FROM categories
          WHERE id = ?
          `,
    [id]
  );
  if (Array.isArray(rows) && rows.length > 0) {
    return rows[0];
  } else {
    return null;
  }
}

async function getAllCategories() {
  const [rows] = await pool.query(
    `
          SELECT * 
          FROM categories`
  );
  return rows;
}

async function insertCategory(newExpense: Category) {
  const [row] = await pool.query(
    `insert into categories (description ,
    title,
    amount,
    createdAt) values (?,?,?,TIMESTAMP(?))`,
    [newExpense.description || "null", newExpense.title, newExpense.createdAt]
  );

  return row;
}

async function updateCategory(id: string, category: Category) {
  const [row] = await pool.query(
    `update categories set description=?, title=?, createdAt=? where id=?`,
    [category.description, category.title, category.createdAt, id]
  );
  return row;
}
async function deleteCategoryById(id: string) {
  await pool.query(`delete from categories where id=?`, [id]);
  return true;
}

export {
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategoryById,
  insertCategory,
};
