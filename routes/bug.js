const express = require("express");
const router = express.Router();

let Bug = require('../models/Bug.js');

router.get('', function (req, res) {
    Bug.find().exec().then((feature) => {
        try {
            res.json(feature);
        } catch (e) {
            throw e
        }
    })
});

router.post('', function (req, res) {
    let bug = new Bug({
        user_id: req.body.user,
        what: req.body.what,
        how: req.body.how,
        where: req.body.where,
        notes: req.body.notes,
        severity: req.body.severity
    });
    bug.save();
    res.json({ok: true, message: "Bug saved successfully"})
});

router.get('/:id', function (req, res) {
    Bug.findById(req.params.id, function (err, data) {
        res.json(data);
    })
});


router.delete('/:id', function (req, res) {
    Bug.findByIdAndDelete({_id: req.params.id}, function (err, result) {
        if (err) {
            res.json({success: false, message: err});
            throw err
        }
        if (result) {
            res.json({success: true, message: "Deleted successfully"})
        }
    })
});

module.exports = router;




