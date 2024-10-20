const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const User = require("../models/userModel");
const ConnectionRequest = require("../models/connectionRequestModel");

requestRouter.post("/request/connectionRequest/:status/:toUserId",userAuth, async (req, res) => {
    try{
        const user = req.user;
        const fromUserId = user._id;
        const status = req.params.status;
        const toUserId = req.params.toUserId;
        const allowedStatus = ["interested", "ignored"];
        if(!allowedStatus.includes(status)){
            return res.status(400).send({message: `${status} is not a valid status`});
        }
        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(404).send({message: "User not found"});
        }
        const userExist = await ConnectionRequest.findOne({
            $or: [
                {fromUserId, toUserId},
                {fromUserId:toUserId, toUserId:fromUserId}
            ]
        });
        if(userExist){
            return res.status(400).send({message: "Connection Request Exists"})
        }
        const connectionRequest = new ConnectionRequest({fromUserId, toUserId, status});
        await connectionRequest.save();
        res.send({message: user.firstName + " " + status + " " + toUser.firstName, data: toUser})
    }catch(err){
        res.status(400).send({message: err.message})
    }
});

module.exports = requestRouter;