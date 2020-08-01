const express = require("express");
const router = express.Router();

let Bug = require('../models/Bug.js');

router.get('', (req, res) => {
    Bug.find()
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json("Request Failed"));
});

router.post('', (req, res) => {
    let bug = new Bug({
        user_id: req.body.user,
        what: req.body.what,
        how: req.body.how,
        where: req.body.where,
        notes: req.body.notes,
        severity: req.body.severity
    });

    bug.save()
        .then((data) => res.status(200).json({ok: true, message: "Bug saved successfully"}))
        .catch((err) => res.status(400).json("Request Failed"));
});

router.get('/:id', (req, res) => {
    Bug.findById(req.params.id)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err))
});

router.delete('/:id', (req, res) => {
    Bug.deleteOne({_id: req.params.id})
        .then((data) => {
            res.status(200).json({success: true, message: "Deleted successfully"})
        })
        .catch((err) => {
            res.status(400).json({success: false, message: err})
        });
});

module.exports = router;




