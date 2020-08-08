const Payment = require('../models/payment');
const mongoose = require('mongoose');

module.exports = {
    getPayments: (req, res) => {
        Payment
            .find()
            .select('_id card_id user_name amount')
            .exec()
            .then(docs => {
                const response = {
                    code: 200,
                    message: 'Get payments successfully',
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
    getPayment: (req, res) => {
        const id = req.params.id;
        Payment
            .findById(id)
            .select('_id card_id user_name amount')
            .exec()
            .then(doc => {
                if (doc) {
                    res.status(200).json({
                        code: 200,
                        message: 'Get payment successfully',
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
    postPayment: (req, res) => {
        const payment = new Payment({
            _id: new mongoose.Types.ObjectId(),
            card_id: req.body.card_id,
            user_name: req.body.user_name,
            amount: req.body.amount
        });
        payment.save().then(result => {
            res.status(201).json({
                code: 201,
                message: "Payment created successfully",
                results: {
                    _id: result._id,
                    card_id: result.card_id,
                    user_name: result.user_name,
                    amount: result.amount
                },
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

    },
    deletePayment: (req, res) => {
        const id = req.params.id;
        Payment
            .findOneAndRemove({ _id: id }, { new: true, useFindAndModify: false })
            .select('_id card_id user_name amount')
            .then(doc => {
                res.status(200).json({
                    code: 200,
                    message: 'Payment deleted successfully',
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
    putPayment: (req, res) => {
        const id = req.params.id;
        Payment.findOneAndUpdate({ _id: id }, req.body, { new: true, useFindAndModify: false })
            .select('_id card_id user_name amount')
            .exec()
            .then(doc => {
                res.status(200).json({
                    code: 200,
                    message: 'Payment updated successfully',
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