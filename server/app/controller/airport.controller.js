const Airport = require('../models/airport');

module.exports = {
    getAirports: (req, res) => {
        Airport
            .find()
            .select('_id code name location')
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    airports: docs
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
    getAirport: (req, res) => {
        const id = req.params.id;
        Airport
            .findById(id)
            .select('_id code name location')
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
    postAirport: (req, res) => {
        const airport = new Airport({
            code: req.body.code,
            name: req.body.name,
            location: req.body.location
        });
        airport.save().then(result => {
            res.status(201).json({
                message: "Airport created successfully",
                createdAirport: {
                    _id: result._id,
                    code: result.code,
                    name: result.name,
                    location: result.location
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/api/airport/' + result._id,
                }
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

    },
    deleteAirport: (req, res) => {
        const id = req.params.id;
        Airport
            .findOneAndRemove({ _id: id }, { new: true, useFindAndModify: false })
            .select('_id code name location')
            .exec()
            .then(doc => {
                res.status(200).json({
                    message: 'Airport deleted successfully',
                    deletedAirport: doc,
                    request: {
                        type: 'POST',
                        url: 'http://localhost:4000/api/airport',
                        body: {
                            code: 'String',
                            name: 'String',
                            location: 'String'
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
    putAirport: (req, res) => {
        const id = req.params.id;
        // const updateOps = {};
        // for (const ops of req.body) {
        //     updateOps[ops.propName] = ops.value;
        // }
        // { $set: updateOps }
        Airport.findOneAndUpdate({ _id: id }, req.body, { new: true, useFindAndModify: false })
            .select('_id code name location')
            .exec()
            .then(doc => {
                res.status(200).json({
                    message: 'Airport updated successfully',
                    updatedAirport: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:4000/api/airport/' + doc._id
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