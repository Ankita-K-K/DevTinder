const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/userModel")
app.use(express.json());
connectDB().then(()=>{
    console.log("Database connection eshtablished...");
    app.listen(7777, ()=>{
        console.log("Server listening on port 7777");
    });
})
.catch((err) => {
    console.log("Database is not connected");
})

app.post("/signup", async (req, res)=>{
    // const user = new User({
    //     firstName: "Panda",
    //     lastName: "🐼",
    //     emailId: "Panda@🐼.com",
    //     password: "🐼@123"
    // });
    const user = new User(req.body);
    try{
        // throw new Error("Something went wrong");
        console.log(req.body);
        await user.save();
        res.send("Signed up Successfully");
    }catch(err){
        res.status(400).send("Sign up Error: " + err.message);
    }
})



