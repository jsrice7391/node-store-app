const express = require("express");
const mysql = require("mysql");
require("dotenv/config");
require("./server/index.js");
const database = require("./db_side");
const inquirer = require("inquirer");
const admin = require("./admin.js");


database.showItem();

function authenticate() {
    inquirer.prompt([{
        name: "user_name",
        type: "input",
        message: "Username? "
    }, {
        name: "role",
        type: "list",
        message: "What is your role?",
        choices: ["user", "admin"]
    }]).then(function(response) {
        let user_name = response.user_name;
        if (response.role == "admin") {
            inquirer.prompt([{
                name: "password",
                type: "password",
                message: "What is your admin password"
            }]).then(function(response) {
                admin.auth_user(user_name, response.password);
            })
        } else {
            start();
        }
    });
};

authenticate();



function start() {
    inquirer.prompt([{
        name: "user_command",
        type: "list",
        message: "How can we help you?",
        choices: ["Buy", "Show All", "View low Inventory", "Add new product", "Add to Inventory"],
        filter: function(str) {
            return str.split(" ").join("-").toLowerCase();
        }
    }]).then(function(response) {
        let choice = response.user_command;
        switch (choice) {
            case "buy":
                inquirer.prompt([{
                    name: "item_id",
                    message: "What is the id of the item you would like?",

                }, {
                    name: "item_count",
                    message: "How many would you like?"
                }]).then(function(response) {
                    database.buy_item(response.item_id, response.item_count);
                });
                break;
            case "show-all":
                database.showItem();
                break;
            case "view-low-inventory":
                database.showItem("WHERE stock_quantity < 5");
                break;
            case "add-new-product":
                inquirer.prompt([{
                    name: "product_name",
                    message: "What is the name of the product?"
                }, {
                    name: "product_department",
                    message: "What is the department of the product?",

                }, {
                    name: "product_price",
                    message: "How Much is the product?",
                    validate: function(value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }, {
                    name: "product_quant",
                    message: "How much of this item do you have?",
                    validate: function(value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }]).then(function(response) {
                    database.add_item(response.product_name, response.product_department, response.product_price, response.product_quant);
                });
                break;
            case "add-to-inventory":
                inquirer.prompt([{
                    name: "user_product",
                    message: "What is the ID of the product you wish to add to?"

                }, {
                    name: "user_quant",
                    message: "How many do you wish to add?"
                }]).then(function(response) {
                    database.update_quant(response.user_product, response.user_quant)
                });
                break;
            default:
                console.log("How did you get here?");
                break;
        }

    });

};

module.exports = {
    start: start
}