const Feedback = require('../models/feedback');
const moment = require('moment');
const mongoose = require('mongoose');

module.exports = {
    getFeedbacks: (req, res) => {
        Feedback
            .find()
            .select('_id comment user airline')
            .populate('user airline', '_id name phone email dob gender password logo')
            .exec()
            .then(docs => {
                const response = {
                    message: 'Get feedbacks successfully',
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
    getFeedback: (req, res) => {
        const id = req.params.id;
        Feedback
            .findById(id)
            .select('_id comment user airline')
            .populate('user airline', '_id name phone email dob gender password logo')
            .exec()
            .then(doc => {
                if (doc) {
                    res.status(200).json({
                        message: 'Get feedback successfully',
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
    postFeedback: (req, res) => {
        const feedback = new Feedback({
            _id: new mongoose.Types.ObjectId(),
            comment: req.body.comment,
            user: req.body.user,
            airline: req.body.airline
        });
        feedback.save().then(result => {
            res.status(201).json({
                message: "Feedback created successfully",
                results: {
                    _id: result._id,
                    comment: result.comment,
                    user: result.user,
                    airline: result.airline
                },
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

    },
    deleteFeedback: (req, res) => {
        const id = req.params.id;
        Feedback
            .findOneAndRemove({ _id: id }, { new: true, useFindAndModify: false })
            .select('_id comment user airline')
            .populate('user airline', '_id name phone email dob gender password logo')
            .then(doc => {
                res.status(200).json({
                    message: 'Feedback deleted successfully',
                    results: doc
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            });
    },
    putFeedback: (req, res) => {
        const id = req.params.id;
        Feedback.findOneAndUpdate({ _id: id }, req.body, { new: true, useFindAndModify: false })
            .select('_id comment user airline')
            .populate('user airline', '_id name phone email dob gender password logo')
            .exec()
            .then(doc => {
                res.status(200).json({
                    message: 'Feedback updated successfully',
                    results: doc,
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