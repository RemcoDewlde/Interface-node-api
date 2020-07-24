const express = require("express");
const router = express.Router();

let User = require('../models/User.js');


router.get('/:id', function (req, res) {
    User.findById(req.params.id, function (err, data) {
        delete data['password'];
        res.json(data);
    })
});

router.get('', function (req, res) {
    User.find().exec().then((users) => {
        users.toJSON;
        try {
            res.json(users);
        } catch (e) {
            throw e
        }
    })
});

router.patch('', function (req, res) {
    const query = {_id: req.body._id};
    User.findOneAndUpdate(query, req.body, function (err, result) {
        if (err) {
            res.json({error: err})
        } else {
            res.json({found: result})
        }
    })
});


router.post('/search', function (req, res) {
    const query = {
        $or: [
            {username: {$regex: req.body.search, $options: 'i'}},
            {email: {$regex: req.body.search, $options: 'i'}}
        ]
    };

    User.find(query).exec().then((users) => {
        users.toJSON;
        try {
            res.json(users);
        } catch (e) {
            throw e
        }
    })
});


module.exports = router;




