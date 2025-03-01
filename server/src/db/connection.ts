import mysql from "mysql2";

export default mysql
  .createPool({
    host: "127.0.0.1",
    user: "root",
    password: "12345678",
    database: "expense_tracker",
  })
  .promise();
