const mysql = require("mysql2");

//creo conexión con la bd
const db = mysql.createConnection({
    host: "localhost",
    user: "tu usuario",
    password: "tu contraseña",
    database: "DataBExpressSql", //use expressDB
});

//me conecto a la base de datos
db.connect();

module.exports = db;