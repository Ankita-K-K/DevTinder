const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const userAuth = async(req, res, next) => {
    try{
        const {token} = req.cookies;
        if(!token){
            return res.status(401).send("Please Login");
        }
        const {_id} = jwt.verify(token, "DevTinder$@#890");
        const user = await User.findById({_id: _id});
        if(!user){
            return res.status(404).send("User not Found");
        }
        req.user = user;
        next();
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }

}

module.exports = { userAuth };   