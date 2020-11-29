const router = require('express').Router();
const paymentCtrl = require('../controllers/paymentCtrl');
const authMiddle = require('../middleware/authMiddle');
const authAdminMiddle = require('../middleware/authAdminMiddle');

router.route('/payment')
    .get(authMiddle, paymentCtrl.getPayments)
    .post(authMiddle, paymentCtrl.createPayment)

module.exports = router;