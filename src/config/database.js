const mongoose = require("mongoose");

const connetDB = async () => {
    await mongoose.connect("mongodb+srv://ankitakanakagiri:mvwgrjcAasXKOwhv@nodiee-node.nwvnu.mongodb.net/devTinder");
}

module.exports = connetDB;
