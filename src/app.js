const express = require("express");
const app = express();

app.use("/hello", (req, res)=>{
    res.send("Hello hello hello!!!");
})

app.use("/connect", (req, res)=>{
    res.send("In order to communicate connect to port 7777")
})

app.use("/", (req, res)=>{
    res.send("Namaste 🙏🏻")
})

app.listen(7777, ()=>{
    console.log("Server listening on port 7777");
});
