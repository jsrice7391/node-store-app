require("dotenv/config");
require("./server/index.js");
const mysql = require("mysql");
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_ENTRY,
    database: 'bamazon_db'
});

const columnify = require('columnify')

let add_item = (product_name, department_name, price, quant) => {
    let post = { product_name: product_name, department_name: department_name, price: price, stock_quantity: quant };
    let sql = "INSERT INTO products SET ?";
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
    });
}



let buy_item = (choice, how_many) => {
    let post = choice;
    let sql = "SELECT * FROM products WHERE id=" + choice + "";
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        let user_choice_item = result[0].product_name;
        let user_choice_price = result[0].price;
        let current_inv = result[0].stock_quantity;
        if (current_inv > how_many) {
            let update_it = "UPDATE products SET stock_quantity=" + (current_inv - how_many) + " WHERE id=" + choice + "";
            let update_query = db.query(update_it, (err, resultingQuant) => {
                if (err) throw err;
                console.log("Yor order of " + user_choice_item + " will cost $" + (how_many * user_choice_price) + "");

            })

        } else {
            console.log("We do not have that many, please come back some other time");
        }
    })
}


let showItem = (limit = "") => {
    let sql = "SELECT * FROM products " + limit;
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
        console.log(columns);
    })
};




module.exports = {
    add_item: add_item,
    showItem: showItem,
    buy_item: buy_item
}