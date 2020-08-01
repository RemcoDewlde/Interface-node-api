const express = require("express");
const router = express.Router();

let PriceCard = require('../models/Pricecard');

router.get('', function (req, res) {
    PriceCard.find()
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err))
});

router.post('', function (req, res) {
    const {Name, ProductPrice, status, marge, sale, salePrice, SellingPoints} = req.body;
    const priceCard = new PriceCard({
        Name,
        ProductPrice,
        status,
        marge,
        sale,
        salePrice,
        SellingPoints
    });
    priceCard.save()
        .then((data) => res.status(200).json({ok: true, message: "PriceCard saved successfully"})
            .catch((err) => res.status(400).json("Request Failed")));
});

router.get('/:id', (req, res) => {
    PriceCard.findById(req.params.id)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err))
});

router.delete('/:id', (req, res) => {
    PriceCard.deleteOne({_id: req.params.id})
        .then((data) => {
            res.status(200).json({success: true, message: "Deleted successfully", payload: {data}})
        })
        .catch((err) => {
            res.status(400).json("Request Failed")
        });
});

router.post('/search', function (req, res) {
    PriceCard.find({Name: {$regex: req.body.search, $options: 'i'}})
        .then((data) => {
            res.status(200).json({found: data})
        })
        .catch((err) => {
            res.status(400).json("Request Failed")
        })
});

module.exports = router;
