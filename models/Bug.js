const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Bug = new Schema({
    id: mongoose.SchemaTypes.ObjectId,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    what: String,
    how: String,
    where: String,
    notes: String,
    severity: String,
    user_id: String
});
Bug.set('timestamps', true);

module.exports = mongoose.model("Bug", Bug);
