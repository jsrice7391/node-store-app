require("dotenv/config");
require("./server/index.js");
const main = require("./main.js")
const mysql = require("mysql");
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_ENTRY,
    database: 'bamazon_db'
});
const columnify = require('columnify');
const inquirer = require("inquirer");


let auth_user = (user, user_pass) => {
    let sql = 'SELECT * FROM users WHERE user_name="' + user + '" AND user_pass="' + user_pass + '";';
    let query = db.query(sql, (err, res) => {
        if (err) throw err;
        if (res.length === 1) {
            console.log("Welcome " + user);
            admin_access();
        } else {
            console.log("Get out of here you swine!");
        }
    })
}

let admin_access = () => {
    inquirer.prompt([{
        name: "user_command",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Product Sales By Department", "Create New Department"],
        filter: function(str) {
            return str.split(" ").join("-").toLowerCase();
        }
    }]).then(function(response) {
        let admin_choice = response.user_command;
        switch (admin_choice) {
            case "view-product-sales-by-department":
                console.log("Here are the sales by deapartment")
                department_show();
            case "create-new-department":
                console.log("Let us create a new department");
                break;
            default:
                console.log("How did you get here?");
                break;
        }
    })
}

let department_show = () => {
    let my_query = "SELECT departments.id, departments.department_name AS 'Department Name', departments.over_head_costs AS 'Over Head Costs', products.product_sales AS 'Product Sales', departments.over_head_costs - products.product_sales AS 'Total Profit' FROM departments LEFT JOIN products ON departments.id = products.id;";
    let query = db.query(my_query, (err, res) => {
        if (err) throw err;
        var columns = columnify(res, {
            truncate: true,
            config: {
                description: {
                    maxWidth: 60
                }
            }
        })
        console.log("\n" + columns);


    });
}



module.exports = {
    auth_user: auth_user
}