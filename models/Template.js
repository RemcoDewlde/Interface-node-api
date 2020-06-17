const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Template = new Schema({
    id: mongoose.SchemaTypes.ObjectId,
    Name: String,
    productPrice: String,
    status: String,
    sellingPoints: [{
        nameSellingPoint: String,
        valueSellingPoint: String
    }],
    sale: Boolean,
    salePrice: String,
    marge: Boolean,
});

Template.index({Name: 'text'});

module.exports = mongoose.model("Template", Template);
