CREATE DATABASE expanse_tracker;
USE expanse_tracker;

CREATE TABLE expenses (
  id integer PRIMARY KEY AUTO_INCREMENT,
  description VARCHAR(255),
  category TEXT NOT NULL,
  amount integer NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE categories (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255),
  description TEXT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE users (
  id integer PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW()
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



