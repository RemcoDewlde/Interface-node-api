const express = require("express");
const router = express.Router();

let Template = require('../models/template.js');

router.get('', function (req, res) {
    Template.find()
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err))
});

router.post('', function (req, res) {
    const { Name, ProductPrice, status, marge, sale, salePrice, SellingPoints } = req.body;
    let template = new Template({
        Name,
        ProductPrice,
        status,
        marge,
        sale,
        salePrice,
        SellingPoints
    });
    template.save()
        .then((data) => res.status(200).json({ok: true, message: "Template saved successfully"})
        .catch((err) => res.status(400).json("Request Failed")));
});

router.get('/:id', (req, res) => {
    Template.findById(req.params.id)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err))
});

router.delete('/:id',(req, res) => {
    Template.deleteOne({_id: req.params.id})
        .then((data) => {res.status(200).json({success: true, message: "Deleted successfully", payload: {data}})})
        .catch((err) => {res.status(400).json("Request Failed")});
});

router.post('/search', function (req, res) {
    Template.find({Name: { $regex: req.body.search, $options: 'i'}})
        .then((data) => {res.status(200).json({found: data})})
        .catch((err) => {res.status(400).json("Request Failed")})
});


module.exports = router;
