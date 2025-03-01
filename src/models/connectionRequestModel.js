const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema({
        fromUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true
        },
        toUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true
        },
        status: {
            type: String,
            enum: {
                values: ["interested", "ignored", "accepted", "rejected"],
                message: `${VALUE} is not a valid status`
            },
            require: true
        }
    },
    {
        timestamps: true
    }
);

connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send the connection request to yourself");
    }
    next();
})
connectionRequestSchema.index({fromUserId: 1, toUserId: 1});
module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);