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

//view departments function
function view() {
  inquirer
    .prompt({
      name: "viewitem",
      type: "list",
      message: "Would you like to view departments, roles, or employees?",
      choices: ["DEPARTMENT", "ROLE", "EMPLOYEE"],
    })
    .then(function (answer) {
      console.log(answer);
      if (answer.viewitem === "DEPARTMENT") {
        viewdept();
      } else if (answer.viewitem === "ROLE") {
        viewrole();
      } else {
        viewemployee();
      }
    });
}
//view department - select all from department table
function viewdept() {
  console.log("Viewing departments");
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.log(res);
    start();
  });
}
//view roles - select only title from roles table
function viewrole() {
  console.log("Viewing roles");
  connection.query("SELECT title FROM role", (err, res) => {
    if (err) throw err;
    console.log(res);
    start();
  });
}
//view employee - select first and last name columns from employee table
function viewemployee() {
  console.log("You are viewing employees");
  connection.query("SELECT first_name, last_name FROM employee", (err, res) => {
    if (err) throw err;
    console.log(res);
    start();
  });
}

// update employee roles -
//which employee id ?, then what is the new role id to replace the current?
function update() {
  inquirer
    .prompt([
      {
        name: "updateitem",
        type: "input",
        message: "What employee Id do you want to update?",
      },
      {
        name: "updateid",
        type: "input",
        message: "What new role Id do you want to use?",
      },
    ])
    .then(function (answer) {
      console.log(`You are updating employee id #: ${answer.updateitem}.`);
      console.log(answer);
      //query table for first_name, last_name, role_id
      //update table - ? is a placeholder
      const query = "UPDATE employee SET role_id = ? WHERE id = ?";
      connection.query(
        query,
        [parseInt(answer.updateid), parseInt(answer.updateitem)],
        (err, res) => {
          console.log(res);
        }
      );
      start();
    });
}
