const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
    id: mongoose.SchemaTypes.ObjectId,
    username: String,
    password : String,
    email: String,
    role : String,
    active: Boolean
});

User.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.password;
    return obj;
};

module.exports = mongoose.model("User", User);
