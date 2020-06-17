const express = require("express");
const router = express.Router();

let Pricecard = require('../models/Pricecard');

router.get('', function (req, res) {
    Pricecard.find().exec().then((data) => {
        try {
            res.json(data);
        } catch (e) {
            throw e
        }
    })
});

router.post('', function (req, res, next) {
    let template = new Pricecard(
        req.body
    );
    template.save();
    res.json({ok: true, message: "PriceCard saved successfully"})
});

router.get('/:id', function (req, res, next) {
    Pricecard.findById(req.params.id, function (err, data) {
        res.json(data);
    })
});

router.delete('/:id', function (req, res, next) {
    Pricecard.findByIdAndDelete({_id: req.params.id}, function (err, result) {
        if (err) throw err;
        if (result) {
            res.json({success: true, message: "Deleted successfully"})
        }
    })
});

router.post('/search', function (req, res, next) {
    Pricecard.find({
        Name: {
            $regex: req.body.search,
            $options: 'i'
        }
    })
        .exec((err, result) => {
            res.json({found: result});
            if (err) {
                next(err)
            }
        })
});


module.exports = router;
