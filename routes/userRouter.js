const router = require("express").Router();

const userCtrl = require("../controllers/userCtrl");
const authMiddle = require('../middleware/authMiddle');


router.post("/register", userCtrl.register);

router.post("/login", userCtrl.login);

router.get("/logout", userCtrl.logout);

router.get("/refresh_token", userCtrl.handleRefreshToken);

router.get('/info', authMiddle, userCtrl.getUser);

router.patch('/add_cart', authMiddle, userCtrl.addCart)

module.exports = router;
