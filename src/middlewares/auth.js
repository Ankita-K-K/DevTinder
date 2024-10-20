const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const userAuth = async(req, res, next) => {
    try{
        const {token} = req.cookies;
        if(!token){
            throw new Error("Inavlid token");
        }
        const {_id} = jwt.verify(token, "DevTinder$@#890");
        const user = await User.findById({_id: _id});
        if(!user){
            throw new Error("User not Found");
        }
        req.user = user;
        next();
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }

}

module.exports = { userAuth };   