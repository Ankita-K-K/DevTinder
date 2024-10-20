function validateEditProfileData(req){
    const allowedUpdateFields = ["firstName", "lastName", "about", "skills", "age", "gender", "photoUrl"];
    const isEditAllowed = Object.keys(req.body).every((feilds)=>allowedUpdateFields.includes(feilds));
    return isEditAllowed;
}

module.exports = {validateEditProfileData};