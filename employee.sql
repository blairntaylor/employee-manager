DROP DATABASE IF EXISTS employeeschema_db;
CREATE DATABASE employeeschema_db;
USE employeeschema_db;

CREATE TABLE department (
id INT AUTO_INCREMENT NOT NULL,
name VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE role (
id INT AUTO_INCREMENT NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10,2) NOT NULL,
dept_id INT NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE employee (
id INT AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR (30) NOT NULL,
role_id INT,
manager_id INT,
PRIMARY KEY (id)
);


-- seeds --
INSERT INTO department (name)
VALUES ("accounting"), ("marketing");

INSERT INTO role (title, salary, dept_id)
VALUES ("senior manager", "30000", 2), ("CFO", "70000", 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Martha", "Morrison", 12, 1), ("Ben", "Jammin", 45, 1);
