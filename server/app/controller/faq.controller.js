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
                    message: 'Get FAQs successfully',
                    results: docs
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
                    res.status(200).json({
                        message: 'Get FAQ successfully',
                        results: doc});
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
                results: {
                    _id: result._id,
                    question: result.question,
                    answer: result.answer
                },
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
                    results: doc,
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
                    results: doc
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