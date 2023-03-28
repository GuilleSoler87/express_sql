const express = require("express");
const categorycontroller = require("../controllers/categorycontroller");
const router = express.Router();

//app - router POSTS ES UNA TABLA!!! NO EL MÉTODO POST
router.post('/addcategories', categorycontroller.create);
router.put('/updatecategory/:id', categorycontroller.updateById);
router.get('/categories',categorycontroller.getAll);
router.get('/categories/:id',categorycontroller.getById);

module.exports = router;