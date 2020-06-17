const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Guide = new Schema({
    id: mongoose.SchemaTypes.ObjectId,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    guideName: String,
    guideDesc: String,
    guideText: String,
    tags: [String],
    comments: [{
        userID: String,
        comment: String,
        resolved: Boolean
    }]
});

Guide.index({guideName: 'text'});
Guide.index({tags: 'text'});
Guide.set('timestamps', true);


module.exports = mongoose.model("Guide", Guide);
