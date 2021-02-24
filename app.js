const inquirer = require("inquirer");
const mysql = require("mysql");
const { allowedNodeEnvironmentFlags } = require("process");
const db = require("./db");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Daphne77",
  database: "employeeschema_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log(`Connected at ${connection.threadId}`);
});

//add departments, roles, employees
function start() {
  inquirer
    .prompt({
      name: "start",
      type: "list",
      message: "Would you like to add, view or update?",
      choices: ["ADD", "VIEW", "UPDATE", "EXIT"],
    })
    .then(function (answer) {
      if (answer.start === "ADD") {
        add();
      } else if (answer.start === "VIEW") {
        view();
      } else if (answer.start === "UPDATE") {
        update();
      } else {
        connection.end();
      }
    });
}

//add departments, roles, employees
function add() {
  inquirer
    .prompt({
      name: "additem",
      type: "list",
      message: "Would you like to add a department, role, or employee?",
      choice: ["DEPARTMENT", "ROLE", "EMPLOYEE"],
    })
    .then(function (answer) {
      if (answer.additem === "DEPARTMENT") {
        adddept();
      } else if (answer.additem === "ROLE") {
        addrole();
      } else {
        addemployee();
      }
    });
}

//view departments, roles, employees

//update employee roles
