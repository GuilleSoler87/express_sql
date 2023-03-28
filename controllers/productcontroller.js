const db = require("../config/database.js");

const productcontroller = {

    // añadir productos
    create(req, res) {
        let product = {
            name: req.body.name,
            price: req.body.price
        };
        let sql ='INSERT INTO Products SET ?';
        db.query(sql, product, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send('Product added...');
        });
    },

    // actualizar un producto
    updateById(req, res) {
        let productId = req.params.id;
        let updatedProduct = {
            name: req.body.name,
            price: req.body.price
        };
        let sql = 'UPDATE Products SET ? WHERE id = ?';
        db.query(sql, [updatedProduct, productId], (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send('Product updated...');
        });
    },

    // muestra todos los productos
    getAll(req, res) {
        let sql = 'SELECT * FROM Products';
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    },

    // muestra productos y categorias
    getProdCat(req, res) {
        let sql = 'SELECT p.name AS product_name, c.name AS category_name FROM Classification cl JOIN Products p ON cl.product_id = p.id JOIN Categories c ON cl.category_id = c.id';
        db.query(sql, (err, result) => {
            if (err) {
                throw err;
            }
            console.log(result);
            res.send(result);
        });
    },

    // muestra producto por id
    getById(req, res) {
        let productId = req.params.id;
        let sql = 'SELECT * FROM Products WHERE id = ?';
        db.query(sql, productId, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                res.send(result[0]);
            } else {
                res.status(404).send('Product not found');
            }
        });
    },

    // muestra productos por precio descendente 
    getByPriDesc(req, res) {
        let sql = 'SELECT * FROM Products ORDER BY price DESC';
        db.query(sql, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                res.send(result);
            } else {
                res.status(404).send('Products not found');
            }
        });
    },

    //muestra producto por nombre
    getProdName(req, res) {
        let productName = req.params.name;
        let sql = 'SELECT * FROM Products WHERE name LIKE ?';
        let query = '%' + productName + '%';
        db.query(sql, query, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                res.send(result);
            } else {
                res.status(404).send('Product not found');
            }
        });
    },

    //borra un producto por su ID
    deleteById(req, res) {
        let productId = req.params.id;

        // Elimina los registros asociados en la tabla "classification"
        let sql1 = 'DELETE FROM classification WHERE product_id = ?';
        db.query(sql1, productId, (err, result) => {
            if (err) throw err;

            // Elimina el producto correspondiente en la tabla "products"
            let sql2 = 'DELETE FROM products WHERE id = ?';
            db.query(sql2, productId, (err, result) => {
                if (err) throw err;
                if (result.affectedRows > 0) {
                    res.send(`Product with ID ${productId} deleted.`);
                } else {
                    res.status(404).send('Product not found');
                }
            });
        });
    },
};

module.exports = productcontroller;