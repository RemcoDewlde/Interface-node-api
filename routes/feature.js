const express = require("express");
const router = express.Router();

let Feature = require('../models/FeatureRequest.js');

router.get('', function (req, res) {
    Feature.find().exec().then((feature) => {
        try {
            res.json(feature);
        } catch (e) {
            throw e
        }
    })
});

router.post('', function (req, res) {
    let template = new Feature({
        user_id: req.body.user_id,
        text: req.body.text,
        title: req.body.title,
        location: req.body.location
    });
    template.save();
    res.json({ok: true, message: "Feature saved successfully"})
});

router.get('/:id', function (req, res) {
    Feature.findById(req.params.id, function (err, data) {
        res.json(data);
    })
});

router.delete('/:id', function (req, res) {
    Feature.findByIdAndDelete({_id: req.params.id}, function (err, result) {
        if (err) throw err;
        if (result) {
            res.json({success: true, message: "Deleted successfully"})
        }
    })
});

module.exports = router;




