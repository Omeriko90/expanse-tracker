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

export { getAllCategories, getCategoryById };
