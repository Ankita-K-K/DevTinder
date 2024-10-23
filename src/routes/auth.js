const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const { validateSignUp } = require("../utils/validateSignUp");
const User = require("../models/userModel");
const {validateLoginEmail} = require("../utils/validateLoginEmail");

authRouter.post("/signup", async (req, res)=>{
    try {
        const {firstName, lastName,emailId, password} = req.body;
        //validate data
        validateSignUp(req);
        //encryption of the password
        const passwordHash = await bcrypt.hash(password, 10);
        //creating the user instance
        const user = new User({firstName, lastName,emailId, password:passwordHash});
        //save the user to the database
        await user.save();
        res.send("Signed up Successfully");
    }catch(err){
        res.status(400).send("SIGN UP ERROR: " + err.message);
    }
})


authRouter.post("/login", async(req, res)=>{
    try{
        const {emailId, password} = req.body;
        validateLoginEmail(emailId);
        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid Credentials");
        }
        const isPasswordCorrect = await user.validatePassword(password);
        if(!isPasswordCorrect){
            throw new Error("Invalid Credentials");
        }else{
            const token = await user.getJWT();
            res.cookie("token", token, {expires: new Date(Date.now() + (7 * 24 * 3600000))});
            res.send(user);
        }
    }catch(err){
        res.status(400).json({message: "LOGIN ERROR: " + err.message});
    }
});

authRouter.post("/logout", async (req, res)=>{
    res.cookie("token", null, {expires: new Date(Date.now())}).send("Logged Out");
})

module.exports = authRouter;