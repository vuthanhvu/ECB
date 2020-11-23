const router = require('express').Router();
const authMiddle = require('../middleware/authMiddle');
const authAdminMiddle = require('../middleware/authAdminMiddle');

const productCtrl = require('../controllers/productCtrl');

router.route('/products')
    .get(productCtrl.getAllProducts)
    .post(authMiddle, authAdminMiddle,productCtrl.createProduct)

router.route('/products/:id')
    .delete(authMiddle, authAdminMiddle, productCtrl.deleteProduct)
    .put( authMiddle, authAdminMiddle, productCtrl.updateProduct)

module.exports = router;