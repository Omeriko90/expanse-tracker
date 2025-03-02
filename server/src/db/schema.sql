CREATE DATABASE IF NOT EXISTS expense_tracker;
USE expense_tracker;

CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description text,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS expenses (
  id INT AUTO_INCREMENT PRIMARY KEY,
    category_id varchar(255) NOT NULL,
    description varchar(255),
    amount INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);


insert into categories 
values
('housing', 'Housing', 'Housing covers the money you pay to keep a roof over your head. This includes everything from rent or mortgage payments to property taxes, HOA dues, and home maintenance costs.', NOW()),
('transportation', 'Transportation', 'Regardless of your location or lifestyle, everyone needs to get from point A to point B. Typically, this budget category includes car payments, registration and DMV fees, gas, maintenance, parking, tolls, ridesharing costs, and public transit.', NOW()),
('food', 'Food', 'Shopping and cooking at home? Sampling local restaurants? Either way, we all have to eat. Many budgeters include both groceries and dining out in this category (e.g., restaurant meals, work lunches, food delivery, etc.)', NOW()),
('utilities', 'Utilities', 'This category covers the services that keep your home up and running — things like gas, electricity, water, and sewage bills. Some families also include “connectivity” services, like internet and cell phone bills.', NOW()),
('insurance', 'Insurance', 'This category includes Health insurance (if you pay it out of your take-home pay),Homeowner’s or renter’s insurance, Auto insurance, Life insurance and Disability insurance.', NOW()),
('medical_healthcare', 'Medical & Healthcare', 'This category includes Out-of-pocket costs for primary care, Specialty care (dermatologists, psychologists, etc.), Dental care, Urgent care, Prescriptions and OTC medications, Supplements and vitamins and Medical devices and supplies.', NOW()),
('saving_investing_debt_payments', 'Saving, Investing, & Debt Payments', 'This category includes loans, pension funds, investing etc.', NOW()),
('personal', 'Personal Spending', 'This category includes things like gym memberships, clothes and shoes, haircuts and highlights, home decor and furniture and gifts.', NOW()),
('entertainment', 'Entertainment', 'This category can include things like concert tickets, sporting events, family activities & vacations, cable, streaming services, and other subscriptions (e.g., Hulu and Netflix), restaurants (if you didn’t include this under “Food”), video games, and hobbies.', NOW()),
('other', 'Other', 'This category is for things that aren`t matching to any other category in the list.', NOW());



insert into expenses (
    category_id,
    description,
    amount,
    created_at)
values
('housing','Some art to living room', 200, TIMESTAMP('2025-01-31 11:40:00')),
('food', 'Weekly groceries',400 , TIMESTAMP('2025-01-21 15:30:00')),
('insurance', 'Family health insurance',150,  TIMESTAMP('2025-02-01 10:35:00')),
('entertainment', 'Standup',250,  TIMESTAMP('2025-02-11 20:30:00')),
('personal','Haircut', 80,  TIMESTAMP('2025-02-21 14:10:00')),
('personal', 'Clothes',200,  TIMESTAMP('2025-02-08 17:00:00')),
('saving_investing_debt_payments','Car loan', 235, TIMESTAMP('2024-02-01 10:00:00')),
('other', "Restaurant for dad's birthday",400 , TIMESTAMP('2025-02-23 19:00:00')),
('housing', 'Aircondition fix',150,  TIMESTAMP('2025-03-01 12:25:00')),
('utilities', 'electricity bill',95,  TIMESTAMP('2025-02-11 09:00:00')),
('transportation','Car annual inspection', 100,  TIMESTAMP('2025-03-03 10:30:00')),
('entertainment', 'UEFA champions league final ticket',550,  TIMESTAMP('2024-05-01 14:00:00'));




