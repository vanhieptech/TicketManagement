const Regulation = require('../models/regulation');
const mongoose = require('mongoose');

module.exports = {
    getRegulations: (req, res) => {
        Regulation
            .find()
            .select('_id name value admin')
            .populate('admin', '_id userdetail permission')
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    regulations: docs
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
            .populate('admin', '_id userdetail permission')
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
    postRegulation: (req, res) => {
        const regulation = new Regulation({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            value: req.body.value,
            admin: req.body.admin
        });
        regulation.save().then(result => {
            res.status(201).json({
                message: "Regulation created successfully",
                createdRegulation: {
                    _id: result._id,
                    name: result.name,
                    value: result.value,
                    admin: result.admin
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/api/regulation/' + result._id,
                }
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
            .populate('admin', '_id userdetail permission')
            .then(doc => {
                res.status(200).json({
                    message: 'Regulation deleted successfully',
                    deletedRegulation: doc,
                    request: {
                        type: 'POST',
                        url: 'http://localhost:4000/api/regulation',
                        body: {
                            name:'String',
                            value:'Number',
                            admin:'ObjectId'
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
    putRegulation: (req, res) => {
        const id = req.params.id;
        Regulation.findOneAndUpdate({ _id: id }, req.body, { new: true, useFindAndModify: false })
            .select('_id name value admin')
            .populate('admin', '_id userdetail permission')
            .exec()
            .then(doc => {
                res.status(200).json({
                    message: 'Regulation updated successfully',
                    updatedRegulation: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:4000/api/regulation/' + doc._id
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