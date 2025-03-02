import { Expense } from "@/types";
import { default as pool } from "./connection";
import { ResultSetHeader } from "mysql2";

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

async function getTotalExpenseSummaryByDateRange(start: string, end: string) {
  const [rows] = await pool.query(
    `
          SELECT sum(amount) as totalAmount
          FROM expenses
          WHERE created_at between timestamp(?) and timestamp(?)
          `,
    [start, end]
  );
  if (Array.isArray(rows) && rows.length > 0) {
    return rows[0];
  } else {
    return 0;
  }
}

async function getAllExpenses(
  sortBy: string,
  sortDirection: string,
  page: number,
  searchQuery: string
) {
  const page_size = 5;
  const search = `%${searchQuery.toLowerCase()}%`;

  const [rows] = await pool.query(
    `
          SELECT * 
          FROM expenses where lower(description) like ? or category_id like ? order by ${sortBy} ${sortDirection} limit ? offset ?`,
    [search, search, page_size, page * page_size]
  );
  return rows;
}

async function insertExpense(newExpense: Expense) {
  const [row] = await pool.query<ResultSetHeader>(
    `insert into expenses (description ,
    category_id,
    amount,
    created_at) values (?,?,?,TIMESTAMP(?))`,
    [
      newExpense.description,
      newExpense.category_id,
      newExpense.amount,
      newExpense.created_at,
    ]
  );

  const newRow = await getExpenseById(row.insertId.toString());

  return newRow;
}

async function updateExpense(id: string, expense: Expense) {
  const [row] = await pool.query(
    `update expenses set description=?, category_id=?, amount=?,created_at=? where id=?;`,
    [
      expense.description,
      expense.category_id || null,
      expense.amount,
      expense.created_at,
      id,
    ]
  );

  const updatedRow = await getExpenseById(id);
  return updatedRow;
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
  getTotalExpenseSummaryByDateRange,
};
