const express = require("express");
const router = express.Router();

let Template = require('../models/template.js');

router.get('', function (req, res) {
    Template.find().exec().then((data) => {
        try {
            res.json(data);
        } catch (e) {
            throw e
        }
    })
});

router.post('', function (req, res, next) {
    let template = new Template(
        req.body
    );
    template.save();
    res.json({ok: true, message: "Template saved successfully"})
});

router.get('/:id', function (req, res, next) {
    Template.findById(req.params.id, function (err, data) {
        res.json(data);
    })
});

router.delete('/:id', function (req, res, next) {
    Template.findByIdAndDelete({_id: req.params.id}, function (err, result) {
        if (err) throw err;
        if (result) {
            res.json({success: true, message: "Deleted successfully"})
        }
    })
});

router.post('/search', function (req, res, next) {
    Template.find({
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
