const express = require("express");
const router = express.Router();

let User = require('../models/User.js');


router.get('/:id',(req, res) => {
    User.findById({_id: req.params.id})
        .then((users) => res.status(200).json(users))
        .catch((err) => res.status(400).json("Request Failed"));
});

router.get('',  (req, res) => {
    User.find()
        .then((users) => res.status(200).json(users))
        .catch((err) => res.status(400).json("Request Failed"));
});

router.patch('',  (req, res) => {
    const query = {_id: req.body._id};
    User.findOneAndUpdate(query, req.body, function (err, result) {
        if (err) {
            res.json({error: err})
        } else {
            res.json({found: result})
        }
    })
});

router.post('/search', (req, res) => {
    const query = {
        // the query searches for username or email address
        $or: [{username: {$regex: req.body.search, $options: 'i'}}, {email: {$regex: req.body.search, $options: 'i'}}]
    };

    User.find(query)
        .then((users) => res.status(200).json(users))
        .catch((err) => res.status(400).json("Request Failed"));
});

module.exports = router;




