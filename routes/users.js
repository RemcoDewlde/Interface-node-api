const express = require("express");
const router = express.Router();

let User = require('../models/User.js');


router.get('/:id', function (req, res, next) {
    User.findById(req.params.id,'_id username role', function (err, data) {
        delete data['password'];
        res.json(data);
    })
});


module.exports = router;




