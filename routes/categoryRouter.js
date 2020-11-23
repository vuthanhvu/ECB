const router = require('express').Router();
const categoryCtrl = require('../controllers/categoryCtrl');
const authMiddle = require('../middleware/authMiddle');
const authAdminMiddle = require('../middleware/authAdminMiddle');

router.route('/category')
    .get(categoryCtrl.getCategories)
    .post(authMiddle, authAdminMiddle, categoryCtrl.createCategory)

router.route('/category/:id')
    .delete(authMiddle, authAdminMiddle, categoryCtrl.deleteCategory)
    .put(authMiddle, authAdminMiddle, categoryCtrl.updateCategory)

module.exports = router;