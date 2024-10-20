const validator = require("validator");
const validateLoginEmail = (emailId) => {
    const isEmailValid =  validator.isEmail(emailId);
    if(!isEmailValid){
        throw new Error("Invalid Credentials");
    }
}

module.exports = {validateLoginEmail};