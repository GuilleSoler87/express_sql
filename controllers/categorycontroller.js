const db = require("../config/database.js");

const categorycontroller = {

    // añadir categorias
    create(req, res) {
        let category = {
            name: req.body.name,
        };
        let sql = 'INSERT INTO Categories SET ?';
        db.query(sql, category, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send('Category added...');
        });
    },

    // actualizar una categoría
    updateById(req, res) {
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
    },
    // muestra todas las categorías
    getAll(req, res) {
        let sql = 'SELECT * FROM categories';
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    },

    // muestra categoría por id
    getById(req, res) {
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
    },
};

module.exports = categorycontroller;