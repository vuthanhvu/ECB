const Users = require("../models/userModel");

const authAdminMiddle = async (req, res, next) => {
    try {
        const user = await Users.findOne({ _id: req.user.id });

        if(user. role === 0)
            return res.status(400).json({msg: "Admin resources acces denied"});
        
        next();

    } catch (err) {
        return res.status(500).json({ msg: err.massage });
    }
};

module.exports = authAdminMiddle;