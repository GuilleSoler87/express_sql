const express = require("express");
const productcontroller = require("../controllers/productcontroller");
const router = express.Router();

//app - router POSTS ES UNA TABLA!!! NO EL MÉTODO POST
router.post('/addproducts', productcontroller.create);
router.put('/updateproduct/:id', productcontroller.updateById);
router.get('/products',productcontroller.getAll);
router.get('/prodcat',productcontroller.getProdCat);
router.get('/products/:id',productcontroller.getById);
router.get('/prods/descend',productcontroller.getByPriDesc);
router.get('/search/:name',productcontroller.getProdName);
router.delete('/products/:id',productcontroller.deleteById);

module.exports = router;