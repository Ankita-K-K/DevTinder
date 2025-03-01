const express = require("express");
const userRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequestModel");
const User = require("../models/userModel");

const USER_SAFE_DATA = "firstName lastName photoUrl about skills age gender"

userRouter.get("/user/requests/recieved", userAuth, async(req, res) => {
    try{
        const loggedInUserId = req.user._id;
        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUserId,
            status: "interested"
        }).populate("fromUserId", USER_SAFE_DATA);
        res.send({
            message: "Requests fetched successfully",
            data: connectionRequest
        });
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});

userRouter.get("/user/connections", userAuth, async(req, res) => {
    try{
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                {fromUserId: loggedInUser._id, status: "accepted"},
                {toUserId: loggedInUser._id, status: "accepted"}
            ]
        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA);
        const data = connectionRequests.map((row)=>{
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        })
        res.send({
            message: "Connections fetched", 
            data: data,
        })
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
    try{
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                {fromUserId: loggedInUser._id}, 
                {toUserId: loggedInUser._id}
            ]
        });
        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });
        const users = await User.find({
            $and: [
                {_id: {$nin: Array.from(hideUsersFromFeed)}},
                {_id: {$ne: loggedInUser._id}}
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);
        res.send(users);
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});

module.exports = userRouter;
