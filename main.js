const express = require("express");
const mysql = require("mysql");

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@GoPats2017',
    database: 'bamazon_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log("MySQL connected");
})



function add_item(name, department_name, price, quantity) {
    app.get("/addpost", (req, res) => {
        let post = { product_name: name, department_name: department_name, price: price, stock_quantity: quantity };
        let sql = "INSERT INTO products SET ?";
        let query = db.query(sql, post, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(post);
        });

    })

};

app.listen("3060", (err) => {
    if (err) throw err;
    console.log("Server listening on port 3060");
});