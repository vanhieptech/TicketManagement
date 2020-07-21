const Ticket = require('../models/ticket');

module.exports = {
    getTickets: (req, res) => {
        Ticket
            .find()
            .select('_id state flight seat order')
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    tickets: docs
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
    postTicket: (req, res) => {
        const ticket = new Ticket({
            state: req.body.state,
            flight: req.body.flight,
            seat: req.body.seat
        });
        ticket.save().then(result => {
            res.status(201).json({
                message: "Ticket created successfully",
                createdTicket: {
                    _id: result._id,
                    state: result.state,
                    flight: result.flight,
                    seat: result.seat
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/api/ticket/' + result._id,
                }
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
                    message: 'Ticket deleted successfully',
                    deletedTicket: doc,
                    request: {
                        type: 'POST',
                        url: 'http://localhost:4000/api/ticket',
                        body: {
                            state: 'String',
                            flight: 'ObjectId',
                            seat: 'ObjectId'
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
    putTicket: (req, res) => {
        const id = req.params.id;
        Ticket.findOneAndUpdate({ _id: id }, req.body, { new: true, useFindAndModify: false })
            .select('_id state flight seat order')
            .exec()
            .then(doc => {
                res.status(200).json({
                    message: 'Ticket updated successfully',
                    updatedTicket: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:4000/api/ticket/' + doc._id
                    }
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