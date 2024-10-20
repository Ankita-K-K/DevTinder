const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

userSchema = mongoose.Schema({
    firstName:{
        type: String,
        minLength : 2,
        maxLength: 20,
        required: true
    },
    lastName:{
        type: String,
        minLength: 2,
        maxLength: 50
    },
    emailId: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        validate(value) {
            const isEmail = validator.isEmail(value);
            if(!isEmail){
                throw new Error("Invalid emailId: " + value)
            }
        },
        unique: true
    },
    password: {
        type: String,
        required: true,
        validate(value){
            const isStrongPassword = validator.isStrongPassword(value);
            if(!isStrongPassword){
                throw new Error("Not a strong password");
            }
        }
    },
    age: {
        type: Number,
        min: 18,
        max: 100
    },
    gender: {
        type: String,   
        validate(value){
            validGenders = ["male", "female", "others"];
            if(!validGenders.includes(value)){
                throw new Error("Gender may: " + validGenders.join(" "));
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://t3.ftcdn.net/jpg/07/95/95/14/360_F_795951406_h17eywwIo36DU2L8jXtsUcEXqPeScBUq.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Photo provided is not valid")
            }
        }
    },
    about: {
        type: String,
        default: "This is the default about of the user"
    },
    skills:{
        type: [String],
        validate(value){
            if(value.length > 10){
                throw new Error("Skills can be atmost 10");
            }
        }
    },
    passwordResetToken:{
        type: String
    },
    passwordResetTokenExpires:{
        type: Date
    }
},
{
    timeStamps: true
}
);

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id: user._id}, "DevTinder$@#890", {expiresIn: "7d"});
    return token
}

userSchema.methods.validatePassword = async function(userInputPassword){
    const user = this;
    const passwordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(userInputPassword, passwordHash);
    return isPasswordCorrect;
}

module.exports = mongoose.model("User", userSchema);