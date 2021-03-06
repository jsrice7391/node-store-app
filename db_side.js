require("dotenv/config");
require("./server/index.js");
const main = require("./main.js")
const mysql = require("mysql");
// The DB object needed to connect to a databse.
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_ENTRY,
    database: 'bamazon_db'
});

// A plugin that allows theb output of the items in columns
const columnify = require('columnify');


// An insert function 
let add_item = (product_name, department_name, price, quant) => {
    // Take theb input from add item and make it an object 
    let post = { product_name: product_name, department_name: department_name, price: price, stock_quantity: quant };
    let sql = "INSERT INTO products SET ?";
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(product_name + " has been added to the databse");
    });
}


// The update function for the databse. Takes the choice of the item and the amount of the item that the customer wants. 
let update_quant = (choice, quant) => {
    let sql = "SELECT * FROM products WHERE id=" + choice + "";
    let update = db.query(sql, (err, response) => {
        if (err) throw err;

        // If the query actually returns a result.
        if (response.length > 0) {
            let user_choice = response[0];
            // Set the string for the query

            let sql = "UPDATE products SET stock_quantity=" + (response[0].stock_quantity + parseInt(quant)) + " WHERE id=" + choice + "";
            // Run the query with the string that is provided.
            let query = db.query(sql, (err, result) => {
                if (err) throw err;
                console.log(user_choice.product_name + "'s quantity has been successfully updated.");
                db.end();
            });
        } else {
            // If no responses are found
            console.log("No responses found.");

        }
    })

};



let buy_item = (choice, how_many) => {
    let post = choice;
    let sql = "SELECT * FROM products WHERE id=" + choice + "";
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            let user_choice_item = result[0].product_name;
            let user_choice_price = result[0].price;
            let current_inv = result[0].stock_quantity;
            if (current_inv > how_many) {
                let update_it = "UPDATE products SET stock_quantity=" + (current_inv - parseInt(how_many)) + ", product_sales=" + (how_many * user_choice_price) + " WHERE id=" + choice + "";
                let update_query = db.query(update_it, (err, resultingQuant) => {
                    if (err) throw err;
                    console.log("Yor order of " + user_choice_item + " will cost $" + (how_many * user_choice_price) + "");

                });

            } else {
                console.log("We do not have that many, please come back some other time");
            }
        } else {
            console.log("Something went wrong, check the product that you gave us")
        }
    })
}


let showItem = (limit = "") => {
    let sql = "SELECT id, product_name, department_name, price, stock_quantity FROM products " + limit;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        var columns = columnify(result, {
            truncate: true,
            config: {
                description: {
                    maxWidth: 60
                }
            }
        })
        console.log("\n" + columns);
    })
};







module.exports = {
    add_item: add_item,
    showItem: showItem,
    buy_item: buy_item,
    update_quant: update_quant
}