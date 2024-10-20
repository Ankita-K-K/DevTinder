const validator = require("validator");
const validateSignUp = (req) => {
    const {emailId, password, firstName, lastName} = req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not valid");
    }else if(!validator.isEmail(emailId)){
        throw new Error("Not a valid emailId");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong");
    }
}

module.exports = {validateSignUp};