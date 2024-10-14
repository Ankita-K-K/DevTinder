const { adminAuth, userAuth } = require("./middlewares/auth");

// app.get("/connect/:id/:password", (req, res)=>{
//     console.log(req.params);
//     console.log(req.query);
//     res.send("Hello hello hello!!!");
// })

// app.post("/connect", (req, res)=>{
//     res.send({
//         firstName:"Ankita",
//         lastName:"K K"
//     })
// })

// app.delete("/connect", (req, res)=>{
//     res.send("In order to communicate connect to port 7777")
// })

// app.get("/user", (req, res, next) => {
//     console.log("1st response");
//     next();
//     //res.send("1st response");
// },
// (req,res,next)=>{
//     console.log("2nd response");
//     next();
//     //res.send("2nd response");
// },
// (req,res,next)=>{
//     console.log("2nd response");
//     next();
//     //res.send("2nd response");
// },
// (req,res,next)=>{
//     console.log("3rd response");
//     next();
//     //res.send("3rd response");
// },
// (req,res,next)=>{
//     console.log("4th response");
//     // res.send("4th response");
//     next();
// },(req, res, next)=>{
//     console.log("6th response");
//     res.send("6th response");
// }
// )

app.use("/admin", adminAuth);
app.get("/admin/getAllData", (req, res)=>{
    // throw new Error("Admin not identified") 
    res.send("All data");
});

app.get("/user/getData", userAuth, (req, res)=>{
    res.send("All the user data");
})

app.get("/user/login", (req, res)=>{
    res.send("User logged in");
})

app.use("/", (err, req, res, next)=>{
    if(err){
        console.log(err);
        res.status(500).send("Something went wrong!!");
    }
    // res.send("Namaste 🙏🏻")
})
