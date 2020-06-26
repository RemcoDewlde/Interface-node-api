const express = require("express");
const router = express.Router();

let User = require('../models/User.js');


router.get('/:id', function (req, res) {
    User.findById(req.params.id, '_id username role', function (err, data) {
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




