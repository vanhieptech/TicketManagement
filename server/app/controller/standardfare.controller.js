const StandardFare = require('../models/standardfare');

module.exports = {
    getStandardFares: async (req, res) => {
        try {
            const standardfares = await StandardFare.find().select('_id seat_type price_per_minute airline').populate('airline', '_id name').exec();
            res.status(200).json({
                code: 200,
                message: 'Get standardfare successfully',
                results: standardfares
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
                res.status(200).json({
                    code: 200,
                    message: 'Get standardfare successfully',
                    results: standardfare});
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
                code: 201,
                message: "StandardFare created successfully",
                results: {
                    _id: result._id,
                    seat_type: result.seat_type,
                    price_per_minute: result.price_per_minute,
                    airline: result.airline
                },
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
                code: 200,
                message: 'StandardFare updated successfully',
                results: standardfare,
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({
                error: err
            })
        }
    }
}