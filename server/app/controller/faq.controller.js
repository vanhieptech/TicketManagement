const FAQ = require('../models/faq');
const mongoose = require('mongoose');

module.exports = {
    getFAQs: (req, res) => {
        FAQ
            .find()
            .select('_id question answer')
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    aircraft: docs
                }
                res.status(200).json(response);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            })
    },
    getFAQ: (req, res) => {
        const id = req.params.id;
        FAQ
            .findById(id)
            .select('_id question answer')
            .exec()
            .then(doc => {
                if (doc) {
                    res.status(200).json(doc);
                } else {
                    res.status(404).json({
                        error: "No valid document found for provided id"
                    })
                }
            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            });
    },
    postFAQ: (req, res) => {
        const faq = new FAQ({
            _id: new mongoose.Types.ObjectId(),
            question: req.body.quesion,
            answer: req.body.answer
        });
        faq.save().then(result => {
            res.status(201).json({
                message: "FAQ created successfully",
                createdFAQ: {
                    _id: result._id,
                    question: result.question,
                    answer: result.answer
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/api/faq/' + result._id,
                }
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

    },
    deleteFAQ: (req, res) => {
        const id = req.params.id;
        FAQ
            .findOneAndRemove({ _id: id }, { new: true, useFindAndModify: false })
            .select('_id question answer')
            .then(doc => {
                res.status(200).json({
                    message: 'FAQ deleted successfully',
                    deletedFAQ: doc,
                    request: {
                        type: 'POST',
                        url: 'http://localhost:4000/api/faq',
                        body: {
                            question: 'String',
                            answer: 'String'
                        }
                    }
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            });
    },
    putFAQ: (req, res) => {
        const id = req.params.id;
        FAQ.findOneAndUpdate({ _id: id }, req.body, { new: true, useFindAndModify: false })
            .select('_id question answer')
            .exec()
            .then(doc => {
                res.status(200).json({
                    message: 'FAQ updated successfully',
                    updatedFAQ: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:4000/api/faq/' + doc._id
                    }
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            });
    }
}