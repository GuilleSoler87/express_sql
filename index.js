const express = require("express");
const app = express();
const PORT = 8080
const db = require("./config/database")



app.use(express.json()) //parsear el body (traducir)

// crea base de datos
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE DataBExpressSql';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created...')
    })
});

// crea tabla productos
app.get('/createtableprods', (req, res) => {
    let sql = 'CREATE TABLE Products (id INT AUTO_INCREMENT, name VARCHAR(100), price FLOAT, PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Products table created...');
    });
});

// crea tabla categorias
app.get('/createtablecateg', (req, res) => {
    let sql = 'CREATE TABLE Categories (id INT AUTO_INCREMENT, name VARCHAR(100), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Categories table created...');
    });
});

// crea tabla clasificación
app.get('/createtableclasif', (req, res) => {
    let sql = 'CREATE TABLE Classification (id INT AUTO_INCREMENT PRIMARY KEY, product_id INT, category_id INT, FOREIGN KEY (product_id) REFERENCES Products(id), FOREIGN KEY (category_id) REFERENCES Categories(id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Classification table created...');
    });
});

// añadir productos
app.post('/addproducts', (req, res) => {
    let product = {
        name: req.body.name,
        price: req.body.price
    };
    let sql = 'INSERT INTO Products SET ?';
    db.query(sql, product, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Product added...');
    });
});

// añadir categorias
app.post('/addcategories', (req, res) => {
    let category = {
        name: req.body.name,
    };
    let sql = 'INSERT INTO Categories SET ?';
    db.query(sql, category, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Category added...');
    });
});

// actualizar un producto
app.put('/updateproduct/:id', (req, res) => {
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
});

// actualizar una categoría
app.put('/updatecategory/:id', (req, res) => {
    let categoryId = req.params.id;
    let updatedCategory = {
        name: req.body.name,
    };
    let sql = 'UPDATE Categories SET ? WHERE id = ?';
    db.query(sql, [updatedCategory, categoryId], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Category updated...');
    });
});

// muestra todos los productos
app.get('/products', (req, res) => {
    let sql = 'SELECT * FROM Products';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

// muestra todas las categorías
app.get('/categories', (req, res) => {
    let sql = 'SELECT * FROM categories';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

//añadir relacion entre productos y categorías
app.post('/classrel', (req, res) => {
    let productId = req.body.product_id;
    let categoryId = req.body.category_id;
    let sql = 'INSERT INTO Classification (product_id, category_id) VALUES (?, ?)';
    db.query(sql, [productId, categoryId], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('New classification added...');
    });
});

// muestra productos y categorias
app.get('/prodcat', (req, res) => {
    let sql = 'SELECT p.name AS product_name, c.name AS category_name FROM Classification cl JOIN Products p ON cl.product_id = p.id JOIN Categories c ON cl.category_id = c.id';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send(result);
    });
});

// muestra producto por id
app.get('/products/:id', (req, res) => {
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
});

// muestra productos por precio descendente 
app.get('/prods/descend', (req, res) => {
    let sql = 'SELECT * FROM Products ORDER BY price DESC';
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send(result);
        } else {
            res.status(404).send('Products not found');
        }
    });
});

// muestra categoría por id
app.get('/categories/:id', (req, res) => {
    let CategoryId = req.params.id;
    let sql = 'SELECT * FROM Categories WHERE id = ?';
    db.query(sql, CategoryId, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send(result[0]);
        } else {
            res.status(404).send('Category not found');
        }
    });
});

//muestra producto por nombre
app.get('/products/search/:name', (req, res) => {
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
});


app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`));