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

module.exports = mongoose.model("User", User);
