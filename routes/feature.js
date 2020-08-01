const express = require("express");
const router = express.Router();

let Feature = require('../models/FeatureRequest.js');

router.get('', function (req, res) {
    Feature.find()
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err))
});

router.post('', function (req, res) {

    const {user_id, text, title, location} = req.body;
    let template = new Feature({
        user_id,
        text,
        title,
        location
    });
    template.save()
        .then(() => res.status(200).json({ok: true, message: "Feature Request saved successfully"}))
        .catch((err) => res.status(400).json(err))
});

router.get('/:id', function (req, res) {
    Feature.findById(req.params.id)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err))
});

router.delete('/:id', function (req, res) {
    Feature.deleteOne({_id: req.params.id})
        .then((data) => {
            res.status(200).json({success: true, message: "Deleted successfully", payload: {data}})
        })
        .catch((err) => {
            res.status(400).json("Request Failed")
        });
});

module.exports = router;




