const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const {validateEditProfileData} = require("../utils/validations");

profileRouter.get("/profile/view", userAuth, async(req, res) => {
    try{
        const user = req.user;
        res.send(user);
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async(req, res)=>{
    try{
       if(!validateEditProfileData(req)){
        throw new Error("Invlid update field");
       }
       const loggedInUser = req.user;
       Object.keys(req.body).every((field) => 
            loggedInUser[field] = req.body[field]
       );
       await loggedInUser.save();
       res.json({
        message: `${loggedInUser.firstName}, your profile was updated successfully`,
        data: loggedInUser
       })
    }catch(err){
        res.status(400).send("UPDATE ERROR: " + err.message);
    }
});



module.exports = profileRouter;