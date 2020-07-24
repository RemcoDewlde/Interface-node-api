const express = require("express");
const router = express.Router();

let Guide = require('../models/Guide');


router.get('/', (req, res) => {
    Guide.find().exec().then((guides) => {
        try {
            res.json(guides);
        } catch (e) {
            throw e
        }
    })
});

router.post('', function (req, res) {
    const guide = new Guide({
        guideName: req.body.form.guideName,
        guideDesc: req.body.form.description,
        guideText: req.body.form.editor,
        tags: req.body.tags
    });
    guide.save().then((result, err) => {
        if (err) {
            res.json({error: err})
        } else {
            res.json({ok: "Guide saved", body: result})
        }
    })

});

router.post('/search', function (req, res) {
    const query = {
        $or: [{guideName: {$regex: req.body.search, $options: 'i'}}, {
            tags: {
                $regex: req.body.search,
                $options: 'i'
            }
        }]
    };

    Guide.find(query, function (err, result) {
        if (err) {
            res.json({error: err})
        } else {
            res.json({found: result})
        }
    })
});

router.get('/:id', function (req, res) {
    Guide.findById(req.params.id, function (err, result) {
        if (err) {
            res.json({error: err})
        } else {
            res.json({found: result})
        }
    })
});

router.patch('', function (req, res) {
    const query = {_id: req.body._id};
    Guide.findOneAndUpdate(query, req.body, function (err, result) {
        if (err) {
            res.json({error: err})
        } else {
            res.json({found: result})
        }
    })
});

router.delete('/:id', function (req, res) {
    Guide.findByIdAndDelete({_id: req.params.id}, function (err, result) {
        if (err) throw err;
        if (result) {
            res.json({success: true, message: "Deleted successfully"})
        }
    })
});


module.exports = router;
