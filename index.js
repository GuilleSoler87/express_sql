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



app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`));