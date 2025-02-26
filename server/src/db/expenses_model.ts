import { Expense } from "@/types";
import { default as pool } from "./connection";

async function getExpenseById(id: string) {
  const [rows] = await pool.query(
    `
          SELECT * 
          FROM expenses
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

async function getAllExpenses(sortBy: string, sortDirection: string) {
  const [rows] = await pool.query(
    `
          SELECT * 
          FROM expenses order by ${sortBy} ${sortDirection}`
  );
  return rows;
}

async function insertExpense(newExpense: Expense) {
  const [row] = await pool.query(
    `insert into expenses (description ,
    category,
    amount,
    createdAt) values (?,?,?,TIMESTAMP(?))`,
    [
      newExpense.description || "null",
      newExpense.category,
      newExpense.amount,
      newExpense.createdAt,
    ]
  );

  return row;
}

async function updateExpense(id: string, expense: Expense) {
  const [row] = await pool.query(
    `update expenses set description=?, category=?, amount=?,createdAt=? where id=?`,
    [
      expense.description,
      expense.category,
      expense.amount,
      expense.createdAt,
      id,
    ]
  );
  return row;
}
async function deleteExpenseById(id: string) {
  await pool.query(`delete from expenses where id=?`, [id]);
  return true;
}

export {
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpenseById,
  insertExpense,
};
