const Flight = require("../models/flight");
const moment = require("moment");
const { populate } = require("../models/flight");
const Aircraft = require("../models/aircraft");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
    getFlights: async(req, res) => {
        if (req.query) {
            //Do querying thing
            //departure,arrival, departure_time, standardfare
            let finalFlights = [];
            let flights = [];
            try {
                flights = await Flight.find({
                    departure_time: req.query.departure_time,
                }).populate({
                    path: "departure arrival standardfare",
                    populate: {
                        path: "airline",
                    },
                });
            } catch (e) {
                console.log(e);
            }
            if (
                req.query.departure &&
                req.query.arrival &&
                req.query.departure_time &&
                req.query.standardfare
            ) {
                //Do search
                try {
                    let filterdFlight = flights.filter((aFlight) => {
                        return (
                            aFlight.departure.code == req.query.departure &&
                            aFlight.arrival.code == req.query.arrival
                        );
                    });
                    let filterdFlightCopy = JSON.parse(JSON.stringify(filterdFlight));
                    filterdFlightCopy.forEach((element) => {
                        let durationMinute =
                            (new Date(element.arrival_time) -
                                new Date(element.departure_time)) /
                            6000;
                        if (req.query.standardfare == "PT") {
                            element.price =
                                durationMinute * element.standardfare[0].price_per_minute;
                            finalFlights.push(element);
                        }
                        if (req.query.standardfare == "TG") {
                            element.price =
                                durationMinute * element.standardfare[1].price_per_minute;
                            finalFlights.push(element);
                        }
                    });

                    if (
                        req.query.filterPitStop &&
                        req.query.filterDeparture_Hour &&
                        req.query.filterAirline &&
                        req.query.filterStandardFare
                    ) {
                        //Pit stop filter
                        if (req.query.filterPitStop > 1) {
                            filterdFlightCopy = filterdFlightCopy.filter((element) => {
                                return element.pit_stop.length > 0;
                            });
                        } else {
                            //Do nothing
                        }
                        if (req.query.filterDeparture_Hour == "Sáng") {
                            filterdFlightCopy = filterdFlightCopy.filter((element) => {
                                return (
                                    new Date(element.departure_time).getHours() > 0 &&
                                    new Date(element.departure_time).getHours() < 12
                                );
                            });
                        } else {
                            filterdFlightCopy = filterdFlightCopy.filter((element) => {
                                return new Date(element.departure_time).getHours() > 12;
                            });
                        }
                        //  Filter airline
                        finalFlights = finalFlights.filter((element) => {
                            return (
                                element.standardfare[0].airline.name.localeCompare(
                                    req.query.filterAirline
                                ) == 0
                            );
                        });
                    }
                } catch (error) {
                    console.log(error);
                    res.status(500).json({
                        error: error,
                    });
                }
                res.status(200).send({
                    code: 200,
                    message: "Search successfully",
                    results: finalFlights,
                });
            }
        } else {
            Flight.find()
                .select(
                    "_id code departure_time arrival_time departure arrival pit_stop aircraft"
                )
                .populate({
                    path: "pit_stop arrival departure",
                    select: "_id code name location",
                })
                .populate({
                    path: "aircraft",
                    select: "_id code airline seats",
                    populate: {
                        path: "airline seats",
                        select: "_id name logo type seat_number price aircraft",
                    },
                })
                .exec()
                .then((docs) => {
                    if (docs === undefined) {
                        res.status(200).json({
                            code: 200,
                            message: "Flights list is empty",
                            results: [],
                        });
                    }
                    const response = {
                        flights: docs.map((doc) => {
                            return {
                                _id: doc._id,
                                code: doc.code,
                                departure_time: doc.departure_time,
                                arrival_time: doc.arrival_time,
                                departure: doc.departure,
                                arrival: doc.arrival,
                                pit_stop: doc.pit_stop,
                                aircraft: doc.aircraft,
                            };
                        }),
                    };
                    res.status(200).json({
                        code: 200,
                        message: "Get all flights successfully",
                        results: response.flights,
                    });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({
                        error: err,
                    });
                });
        }
    },
    getFlight: (req, res) => {
        const id = req.params.id;
        Flight.findById(id)
            .select(
                "_id code departure_time arrival_time departure arrival pit_stop aircraft"
            )
            .populate({
                path: "pit_stop arrival departure",
                select: "_id code name location",
            })
            .populate({
                path: "aircraft",
                select: "_id code airline seats",
                populate: {
                    path: "airline seats",
                    select: "_id name logo type seat_number price aircraft",
                },
            })
            .exec()
            .then((doc) => {
                if (doc) {
                    res.status(200).json({
                        message: "Flight is found",
                        results: {
                            _id: doc._id,
                            code: doc.code,
                            departure_time: doc.departure_time,
                            arrival_time: doc.arrival_time,
                            departure: doc.departure,
                            arrival: doc.arrival,
                            pit_stop: doc.pit_stop,
                            aircraft: doc.aircraft,
                        },
                    });
                } else {
                    res.status(404).json({
                        error: "No valid document found for provided id",
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    error: err,
                });
            });
    },
    postFlight: async(req, res) => {
        const air = await Aircraft.findById(new ObjectId(req.body.aircraft));
        let numSeat = air.seats.length;
        const flight = new Flight({
            code: req.body.code,
            departure_time: moment.utc(
                req.body.departure_time,
                "DD-MM-YYYY HH:mm:ss"
            ),
            arrival_time: moment.utc(req.body.arrival_time, "DD-MM-YYYY HH:mm:ss"),
            departure: req.body.departure,
            arrival: req.body.arrival,
            pit_stop: req.body.pit_stop,
            aircraft: req.body.aircraft,
            seat_available: numSeat,
        });
        flight
            .save()
            .then((result) => {
                res.status(201).json({
                    code: 201,
                    message: "Flight created successfully",
                    results: {
                        _id: result._id,
                        code: result.code,
                        departure_time: result.departure_time,
                        arrival_time: result.arrival_time,
                        departure: result.departure,
                        arrival: result.arrival,
                        pit_stop: result.pit_stop,
                        aircraft: result.aircraft,
                        seat_available: result.seat_available,
                    },
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    error: err,
                });
            });
    },
    deleteFlight: (req, res) => {
        const id = req.params.id;
        Flight.findOneAndRemove({ _id: id }, { new: true, useFindAndModify: false })
            .select(
                "_id code departure_time arrival_time departure arrival pit_stop aircraft"
            )
            .populate({
                path: "pit_stop arrival departure",
                select: "_id code name location",
            })
            .populate({
                path: "aircraft",
                select: "_id code airline seats",
                populate: {
                    path: "airline seats",
                    select: "_id name logo type seat_number price aircraft",
                },
            })
            .exec()
            .then((doc) => {
                res.status(200).json({
                    message: "Flight deleted successfully",
                    results: doc,
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    error: err,
                });
            });
    },
    putFlight: (req, res) => {
        const id = req.params.id;
        // const updateOps = {};
        // for (const ops of req.body) {
        //     if (ops.propName !== "take_off" && ops.propName !== "landing") {
        //         updateOps[ops.propName] = ops.value;
        //     } else {
        //         updateOps[ops.propName] = moment.utc(ops.value, 'DD-MM-YYYY HH:mm:ss');
        //     }
        // }
        if (req.body.departure_time !== undefined) {
            req.body.departure_time = moment.utc(
                req.body.departure_time,
                "DD-MM-YYYY HH:mm:ss"
            );
        }
        if (req.body.arrival_time !== undefined) {
            req.body.arrival_time = moment.utc(
                req.body.arrival_time,
                "DD-MM-YYYY HH:mm:ss"
            );
        }
        Flight.findOneAndUpdate({ _id: id }, req.body, {
                new: true,
                useFindAndModify: false,
            })
            .select(
                "_id code departure_time arrival_time departure arrival pit_stop aircraft"
            )
            .populate({
                path: "pit_stop arrival departure",
                select: "_id code name location",
            })
            .populate({
                path: "aircraft",
                select: "_id code airline seats",
                populate: {
                    path: "airline seats",
                    select: "_id name logo type seat_number price aircraft",
                },
            })
            .exec()
            .then((doc) => {
                res.status(200).json({
                    code: 200,
                    message: "Flight updated successfully",
                    results: doc,
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    error: err,
                });
            });
    },

    // filterFlight: async (req, res, next) => {
    //   try {
    //     let flights = await Flight.find({
    //       departure_time: req.query.departure_time,
    //       arrival_time: req.query.arrival_time,
    //       departure: new ObjectId(req.query.departure),
    //       seat_available: req.query.seat_available,
    //     });
    //     const aircraft = await Aircraft.findById(
    //       new ObjectId(req.query.aircraft)
    //     );
    //     if (req.query.seat_available > aircraft.seats.length) {
    //       res.status(404).send({
    //         code:  404,
    //         message: "Not Found",
    //       });
    //     }
    //     res.send(flights);
    //   } catch (error) {
    //     console.log(error);
    //     res.status(500).json({
    //       error: error,
    //     });
    //   }
    // },
    // sortFlight: async (req, res, next) => {
    //   if (req.query.field === "departure_time") {
    //     //Sort by departure time
    //     if (req.query.sortBy === "desc") {
    //       //Sort descendent - Lately
    //       try {
    //         let flights = await Flight.find({});
    //         flights.sort((a, b) => {
    //           return new Date(b.departure_time) - new Date(a.departure_time);
    //         });
    //         res.send(flights);
    //       } catch (error) {
    //         console.log(error);
    //         res.status(500).json({
    //           error: error,
    //         });
    //       }
    //     }
    //     if (req.query.sortBy === "asc") {
    //       //Sort accendent - Early
    //       try {
    //         let flights = await Flight.find({});
    //         flights.sort((a, b) => {
    //           return new Date(a.departure_time) - new Date(b.departure_time);
    //         });
    //         res.send(flights);
    //       } catch (error) {
    //         console.log(error);
    //         res.status(500).json({
    //           error: error,
    //         });
    //       }
    //     }
    //   }
    // },
};