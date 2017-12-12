const express = require("express");
const mysql = require("mysql");
require("dotenv/config");
require("./server/index.js");
const database = require("./db_side");

const inquirer = require("inquirer");
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_ENTRY,
    database: 'bamazon_db'
});
db.connect((err) => {
    if (err) throw err;
})



let start = () => {
    inquirer.prompt([{
        name: "user_command",
        type: "list",
        message: "How can we help you?",
        choices: ["Buy", "Show All"],
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


        }

    })
}


start();