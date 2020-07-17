module.exports = function (app) {
    app.use('/', require('../routes/home.route'));
    app.use('/api/users', require('../routes/users.route'));
    // app.use('/api/ticket', require('../routes/ticket.route'));
    app.use('/api/flight', require('../routes/flight.route'));
    app.use('/api/airport', require('../routes/airport.route'));
    app.use('/api/airline', require('../routes/airline.route'));
    app.use('/api/seat', require('../routes/seat.route'));
    app.use('/api/aircraft', require('../routes/aircraft.route'));
};