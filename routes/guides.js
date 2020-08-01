const express = require("express");
const router = express.Router();

let Guide = require('../models/Guide');

router.get('/', (req, res) => {
    Guide.find()
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err))
});

router.post('', (req, res) => {

    const guide = new Guide({
        guideName: req.body.form.guideName,
        guideDesc: req.body.form.description,
        guideText: req.body.form.editor,
        tags: req.body.tags
    });

    guide.save()
        .then((data) => res.status(200).json({ok: "Guide saved", body: data})
            .catch((err) => res.status(400).json("Request Failed")));
});

router.post('/search', (req, res) => {
    // query: searches for match in the title or in the tags
    const query = {
        $or: [{guideName: {$regex: req.body.search, $options: 'i'}}, {tags: {$regex: req.body.search, $options: 'i'}}]
    };

    Guide.find(query)
        .then((data) => res.status(200).json({found: data}))
        .catch((err) => res.status(400).json({error: err}));
});

router.get('/:id', (req, res) => {
    Guide.findById(req.params.id)
        .then((data) => res.status(200).json({found: data}))
        .catch((err) => res.status(400).json({error: err}))
});

router.patch('', (req, res) => {
    // TODO: clean this route
    const query = {_id: req.body._id};
    Guide.findOneAndUpdate(query, req.body, function (err, result) {
        if (err) {
            res.json({error: err})
        } else {
            res.json({found: result})
        }
    })
});

router.delete('/:id', (req, res) => {
    Guide.deleteOne({_id: req.params.id})
        .then((data) => { res.status(200).json({success: true, message: "Deleted successfully"})})
        .catch((err) => {res.status(400).json("Request Failed")});
});


module.exports = router;
