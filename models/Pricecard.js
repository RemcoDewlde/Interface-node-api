const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Pricecard = new Schema({
    id: mongoose.SchemaTypes.ObjectId,
    Name: String,
    productPrice: String,
    status: String,
    sale: String,
    salePrice: String,
    marge: String,
    sellingPoints: [{
        nameSellingPoint: String,
        valueSellingPoint: String
    }],
});

Pricecard.index({Name: 'text'});

module.exports = mongoose.model("Pricecard", Pricecard);
