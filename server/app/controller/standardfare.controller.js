const StandardFare = require('../models/standardfare');

module.exports = {
    getStandardFares: async (req, res) => {
        try {
            const standardfares = await StandardFare.find().select('_id seat_type price_per_minute airline').populate('airline', '_id name').exec();
            res.status(200).json({
                count: standardfares.length,
                standardfares: standardfares
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                error: err
            })
        }
    },
    getStandardFare: async (req, res) => {
        try {
            const standardfare = await StandardFare.findById({ _id: req.params.id }).select('_id seat_type price_per_minute airline').populate('airline', '_id name').exec();
            if (standardfare) {
                res.status(200).json(standardfare);
            } else {
                res.status(404).json({
                    error: "No valid document found for provided id"
                })
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({
                error: err
            })
        }
    },
    postStandardFare: async (req, res) => {
        const standardfare = new StandardFare({
            seat_type: req.body.seat_type,
            price_per_minute: req.body.price_per_minute,
            airline: req.body.airline
        });
        try {
            const result = await standardfare.save();
            res.status(201).json({
                message: "StandardFare created successfully",
                createdStandardFare: {
                    _id: result._id,
                    seat_type: result.seat_type,
                    price_per_minute: result.price_per_minute,
                    airline: result.airline
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/api/standardfare/' + result._id,
                }
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({
                error: err
            })
        }
    },
    putStandardFare: async (req, res) => {
        try {
            const standardfare = await StandardFare.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: false })
                .select('_id seat_type price_per_minute airline')
                .populate('airline', '_id name')
                .exec();
            res.status(200).json({
                message: 'StandardFare updated successfully',
                updatedStandardFare: standardfare,
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/api/standardfare/' + standardfare._id
                }
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({
                error: err
            })
        }
    }
}