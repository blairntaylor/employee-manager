const inquirer = require("inquirer");
const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Daphne77",
  database: "employeeschema_db",
});

init();

connection.connect(function (err) {
  if (err) throw err;
  console.log(`Connected at ${connection.threadId}`);
});

function init() {
  start();
}

// ask for departments, roles, employees;

function start() {
  inquirer
    .prompt({
      name: "start",
      type: "list",
      message: "Would you like to add, view or update?",
      choices: ["ADD", "VIEW", "UPDATE", "EXIT"],
    })
    .then(function (answer) {
      console.log(answer);
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
//add exit
//add departments, roles, employees
function add() {
  inquirer
    .prompt({
      name: "additem",
      type: "list",
      message: "Would you like to add a department, role, or employee?",
      choices: ["DEPARTMENT", "ROLE", "EMPLOYEE"],
    })
    .then(function (answer) {
      console.log(answer);
      if (answer.additem === "DEPARTMENT") {
        adddept();
      } else if (answer.additem === "ROLE") {
        addrole();
      } else {
        addemployee();
      }
    });
}

//add department function
function adddept() {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "What type of department would you like to add?",
    })
    .then(function (answer) {
      console.log(answer);
      connection.query(
        "INSERT INTO department SET ?",
        { name: answer.department },
        function (err) {
          if (err) throw err;
          console.log("Department was saved.");
          start();
        }
      );
    });
}
//add role function
function addrole() {
  inquirer
    .prompt([
      {
        name: "role",
        type: "input",
        message: "What type of role would you like to add?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary?",
      },
      {
        name: "deptid",
        type: "input",
        message: "What is the department id?",
      },
    ])
    .then(function (answer) {
      console.log(answer);
      const role = answer.role;
      const salary = answer.salary;
      const deptid = answer.deptid;

      connection.query(
        "INSERT INTO role SET ?",
        { title: answer.role, salary: answer.salary, dept_id: answer.deptid },
        function (err) {
          if (err) throw err;
          console.log("Role was saved.");
          start();
        }
      );
    });
}

function addemployee() {
  inquirer
    .prompt([
      {
        name: "first",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "last",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "roleid",
        type: "input",
        message: "What is the employee's role id?",
      },
    ])
    .then(function (answer) {
      console.log(answer);
      const first = answer.first;
      const last = answer.last;
      const roleid = answer.roleid;

      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: first,
          last_name: last,
          role_id: roleid,
        },
        function (err) {
          if (err) throw err;
          console.log("Employee was saved.");
          start();
        }
      );
    });
}

//view departments, roles, employees
function viewdept() {
  console.log("");
}

//update employee roles
