const Regulation = require('../models/regulation');
const mongoose = require('mongoose');

module.exports = {
    getRegulations: (req, res) => {
        console.log('Hello');
        Regulation
            .find()
            .select('_id name value admin')
            .populate('admin', '_id name phone email dob gender permission')
            .exec()
            .then(docs => {
                const response = {
                    code: 200,
                    message:'Get regulations successfully',
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
    getRegulation: (req, res) => {
        const id = req.params.id;
        Regulation
            .findById(id)
            .select('_id name value admin')
            .populate('admin', '_id name phone email dob gender permission')
            .exec()
            .then(doc => {
                if (doc) {
                    res.status(200).json({
                        code: 200,
                        message: 'Get a regulation successfully',
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
    postRegulation: (req, res) => {
        const regulation = new Regulation({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            value: req.body.value,
            admin: req.body.admin
        });
        regulation.save().then(result => {
            res.status(201).json({
                code: 201,
                message: "Regulation created successfully",
                results: {
                    _id: result._id,
                    name: result.name,
                    value: result.value,
                    admin: result.admin
                },
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

    },
    deleteRegulation: (req, res) => {
        const id = req.params.id;
        Regulation
            .findOneAndRemove({ _id: id }, { new: true, useFindAndModify: false })
            .select('_id name value admin')
            .populate('admin', '_id name phone email dob gender permission')
            .then(doc => {
                res.status(200).json({
                    code: 200,
                    message: 'Regulation deleted successfully',
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
    putRegulation: (req, res) => {
        const id = req.params.id;
        Regulation.findOneAndUpdate({ _id: id }, req.body, { new: true, useFindAndModify: false })
            .select('_id name value admin')
            .populate('admin', '_id name phone email dob gender permission')
            .exec()
            .then(doc => {
                res.status(200).json({
                    code: 200,
                    message: 'Regulation updated successfully',
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