import { Expense } from "@/types";
import mysql from "mysql2";

export default mysql
  .createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "expanse_tracker",
  })
  .promise();
