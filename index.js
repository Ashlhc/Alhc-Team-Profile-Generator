const inquirer = require('inquirer');
const fs = require('fs');
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const generateHtml = require('./util/generateHtml');

const employees = [];

function promptEmployee() {
    inquirer.prompt([
            {
                type:'confirm',
                name: 'addEmployee',
                message: 'Do you want to add an Employee?',
            },
        ])
        .then((answers)=>{
            if(answers.addEmployee) {
                promptEmployeeType();
            } else {
                fs.writeFile('index.html', generateHtml(employees), (err,data)=>{
                    if(err) {
                        throw err;
                    }
                    console.log('Yay!');
                });
                
            }
        })
        .catch((error)=>{
            console.log('Error:', error);
        });
}
function promptEmployeeType() {
    inquirer.prompt([
            {
                type: 'list',
                name: 'employeeType',
                message: 'Select employee type:',
                choices: ['Manager', 'Engineer', 'Intern'],
            },
        ])
        .then((answers)=>{
            switch (answers.employeeType) {
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
        .catch((error)=>{
            console.log('Error:', error);
        });
}
function promptManager() {
    inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: "Enter manager's name:",
            },{
                type: 'input',
                name: 'id',
                message: "Enter manager's ID:",
            },{
                type: 'input',
                name: 'email',
                message: "Enter manager's email address:",
            },{
                type: 'input',
                name: 'officeNumber',
                message: "Enter manager's office number:",
            },
        ])
        .then((answers)=>{ 
            const manager = new Manager(
                answers.name,
                answers.id,
                answers.email,
                answers.officeNumber
            );
            employees.push(manager);
            promptEmployee();
        })
        .catch((error)=>{
            console.log('Error:',error);
        });
}

function promptEngineer() {
    inquirer.prompt([
        {
            type:'input',
            name: 'name',
            message:"Enter engineer's name",
        },{
            type: 'input',
            name: 'id',
            message: "Enter engineer's ID",
        },{
            type: 'input',
            name: 'email',
            message: "Enter engineer's email address:",
        },{
            type: 'input',
            name: 'github',
            message: "Enter engineer's Github",
        },
    ])
    .then((answers)=>{
        const engineer = new Engineer(
            answers.name,
            answers.id,
            answers.email,
            answers.github
        );
        employees.push(engineer);
        promptEmployee();
    })
    .catch((error)=>{
        console.log('Error:', error);
    });
}
function promptIntern() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "Enter intern's name"
        },{
            type: 'input',
            name: 'id',
            message: "Enter intern's ID"
        },{
            type: 'input',
            name: 'email',
            message: "Enter intern's email adress",
        },{
            type: 'input',
            name: 'school',
            message: "Enter name of intern's school",
        },
    ])
    .then((answers)=>{
        const intern = new Intern(
            answers.name,
            answers.id,
            answers.email,
            answers.school
        );
        employees.push(intern);
        promptEmployee();
    })
    .catch((error)=>{
        console.log('Error', error);
    });
}
promptEmployee();

