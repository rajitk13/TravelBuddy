const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function authentication (req, res, next){
    try{
        const token = req.header("Authorization").replace("Bearer ","");
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        const foundUser = await User.findOne({
            _id:decoded._id,
            "tokens.token":token
        });
        if(!foundUser) throw new Error("Unable to authenticate User");
        req.token=token;
        req.user=foundUser;
        next();
    } catch(error){
        res.status(404).send(error);
    }
}
module.exports=authentication;