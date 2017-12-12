const mysql = require("mysql");
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@GoPats2017',
    database: 'bamazon_db'
});
const columnify = require('columnify')
    // var columns = columnify(data, {
    //     truncate: true,
    //     config: {
    //         description: {
    //             maxWidth: 20
    //         }
    //     }
    // })


let add_item = (product_name, department_name, price, quant) => {
    let post = { product_name: product_name, department_name: department_name, price: price, stock_quantity: quant };
    let sql = "INSERT INTO products SET ?";
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
    });
}

let showItem = () => {
    let sql = "SELECT * FROM products";
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
}


showItem()