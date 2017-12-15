-- CREATE DATABASE bamazon_db;
-- 
-- USE bamazon_db;
-- 
-- CREATE TABLE products (
-- 	id INT auto_increment NOT NULL,
--     product_name VARCHAR(25) NOT NULL,
--     department_name varchar(25) NOT NULL,
--     price DECIMAL(10,2) Not Null,
--     stock_quantity INT(10) NOT NULL
-- );
-- 
-- CREATE TABLE departments (
-- 	id INT AUTO_INCREMENT NOT NULL,
--     department_name VARCHAR(20) NOT NULL,
--     over_head_costs VARCHAR(20) NOT NULL
-- );
-- 
-- CREATE TABLE users (
-- 	id INT auto_increment not null,
--     user_name varchar(30) not null,
--     user_pass varchar(20) not null,
--     user_perm varchar(20),
--     CHECK (user_perm = "user" OR user_perm = "admin")
-- );
--     
-- INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Raspberry Pi 3", "Technology", 60.00, 1000);
-- INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("iphone 10", "Technology", 800.00, 60);
-- INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Eloquent JS", "Books", 20.00, 10);
-- INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Pyhton for Dummies", "Books", 20.00, 100);
-- INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("XBOX 1", "Technology", 320.00, 40);
-- INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Fotball", "Sports", 45.00, 5);
-- INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Bluetooth Headphones", "Audio", 26.00, 400);
-- INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Tomagachi", "Technology", 20.00, 2);
-- 
-- 
-- ALTER TABLE products ADD COLUMN product_sales int;
-- 
-- SELECT departments.id, departments.department_name AS 'Department Name', departments.over_head_costs 
-- AS 'Over Head Costs', products.product_sales 
-- AS 'Product Sales', departments.over_head_costs - products.product_sales 
-- AS 'Total Profit' 
-- FROM departments 
-- LEFT JOIN products 
-- ON departments.id = products.id;




    