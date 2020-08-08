const Airport = require('../models/airport');

module.exports = {
    getAirports: (req, res) => {
        Airport
            .find()
            .select('_id code name location')
            .exec()
            .then(docs => {
                const response = {
                    message: 'Get airports successfully',
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
    getAirport: (req, res) => {
        const id = req.params.id;
        Airport
            .findById(id)
            .select('_id code name location')
            .exec()
            .then(doc => {
                if (doc) {
                    res.status(200).json({
                        message: 'Get airport successfully',
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
    postAirport: (req, res) => {
        const airport = new Airport({
            code: req.body.code,
            name: req.body.name,
            location: req.body.location
        });
        airport.save().then(result => {
            res.status(201).json({
                message: "Airport created successfully",
                results: {
                    _id: result._id,
                    code: result.code,
                    name: result.name,
                    location: result.location
                },
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