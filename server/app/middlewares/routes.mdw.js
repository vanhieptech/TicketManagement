module.exports = function (app) {
    app.use('/', require('../routes/home.route'));
    app.use('/api/users', require('../routes/users.route'));
    // app.use('/api/ticket', require('../routes/ticket.route'));
    app.use('/api/flight', require('../routes/flight.route'));
    app.use('/api/airport', require('../routes/airport.route'));
    app.use('/api/airline', require('../routes/airline.route'));
    app.use('/api/seat', require('../routes/seat.route'));
    app.use('/api/aircraft', require('../routes/aircraft.route'));
    app.use('/api/order',require('../routes/order.route'));
    app.use('/api/faq',require('../routes/faq.route'));
    app.use('/api/feedback',require('../routes/feedback.route'));
    app.use('/api/payment',require('../routes/feedback.route'));
    app.use('/api/regulation',require('../routes/regulation.route'));
};