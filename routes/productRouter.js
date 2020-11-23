const router = require('express').Router();

const productCtrl = require('../controllers/productCtrl');

router.route('/products')
    .get(productCtrl.getAllProducts)
    .post(productCtrl.createProduct)

router.route('/products/:id')
    .delete()
    .put()

module.exports = router;