const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Feature = new Schema({
    id: mongoose.SchemaTypes.ObjectId,
    user_id: String,
    text : String,
    title: String,
    location: String,
});

module.exports = mongoose.model("Feature", Feature);
