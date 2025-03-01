# expense-tracker

This app is for tracking your expenses so you can get control over your financials!
Currently you can add, edit and delete expenses. You can see the current month spending, sort them by creation date, amount and category and search expenses based on the description or category.

## Requirements

1. Node.js version: 20.9.0 or later version
2. MySql installed (you can check this video if you don't have it installed https://www.youtube.com/watch?v=u96rVINbAUI)

## How to set the project

### Server

1. Run `cd server/`
2. Run `npm i`
3. Now we need to create the DB (so if you didn't installed the MySql before do it now):
3.1. Run `mysql -u root -p`
3.2. Enter your password
3.3. Run `source  path/to/project/expanse-tracker/server/src/db/schema.sql`
3.4. The DB should be created. Run `show databases;`, if the DB was created successfully you should be able to see a new DB named `expense_tracker` in your DB list.
4. Run `npm run dev`

### Client

1. Run `cd client/`
2. Run `npm i`
3. Run `npm run dev`
