const Ticket = require('../models/ticket');

module.exports = {
    getTickets: (req, res) => {
        Ticket
            .find()
            .select('_id state flight seat order')
            .exec()
            .then(docs => {
                const response = {
                    code: 200,
                    message: 'Get tickets successfully',
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
    getTicket: (req, res) => {
        const id = req.params.id;
        Ticket
            .findById(id)
            .select('_id state flight seat order')
            .exec()
            .then(doc => {
                if (doc) {
                    res.status(200).json({
                        code: 200,
                        message: 'Get ticket successfully',
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
    postTicket: (req, res) => {
        const ticket = new Ticket({
            state: req.body.state,
            flight: req.body.flight,
            seat: req.body.seat
        });
        ticket.save().then(result => {
            res.status(201).json({
                code: 201,
                message: "Ticket created successfully",
                createdTicket: {
                    _id: result._id,
                    state: result.state,
                    flight: result.flight,
                    seat: result.seat
                },
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

    },
    deleteTicket: (req, res) => {
        const id = req.params.id;
        Ticket
            .findOneAndRemove({ _id: id }, { new: true, useFindAndModify: false })
            .select('_id state flight seat order')
            .exec()
            .then(doc => {
                res.status(200).json({
                    code: 200,
                    message: 'Ticket deleted successfully',
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
    putTicket: (req, res) => {
        const id = req.params.id;
        Ticket.findOneAndUpdate({ _id: id }, req.body, { new: true, useFindAndModify: false })
            .select('_id state flight seat order')
            .exec()
            .then(doc => {
                res.status(200).json({
                    code: 200,
                    message: 'Ticket updated successfully',
                    results: doc,
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            });
    },
}