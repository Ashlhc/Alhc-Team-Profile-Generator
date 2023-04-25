const inquirer = require('inquirer');
const fs = require('fs');
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const generateHtml = require('./util/generateHtml');

const employees = [];

function promptEmployee() {
    inquirer
        .prompt([
            {
                type:'confirm',
                name: 'addEmployee',
                message: 'Do you want to add an Employee?',
            },
        ])
        .then((answer) => {
            if(answer.addEmployee) {
                promptEmployeeType();
            } else {
                fs.writeFile('index.html', generateHtml(employees), (err,data) => {
                    if (err) {
                        throw err;
                    }
                    console.log('Yay!');
                });
                
            }
        })
        .catch((error) => {
            console.log('Error:', error);
        });
}
function promptEmployeeType() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'employeeType',
                message: 'Select employee type:',
                choiches: ['Manager', 'Engineer', 'Intern'],
            },
        ])
        .then((answer) => {
            switch (answer.employeeType) {
                case 'Manager':
                    promptManager();
                    break;
                case 'Engineer':
                    promptEngineer();
                    break;
                case 'Intern':
                    promptIntern();
                    break;
                    default:
                        console.log('Invalid employee type');
                        promptEmployeeType();
            }
        })
        .catch((error) => {
            console.log('Error:', error);
        });
}
function promptManager() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: "Enter manager's name:",
            },
            {
                type: 'input',
                name: 'id',
                message: "Enter manager's ID:",
            },
            {
                type: 'input',
                name: 'email',
                message: "Enter manager's email address:",
            },
            {
                type: 'input',
                name: 'officeNumber',
                message: "Enter manager's office number:",
            },
        ])
        .then((answers) => {
            const manager = new Manager(
                answers.name,
                answers.id,
                answers.email,
                answers.officeNumber
            );
        })
}

