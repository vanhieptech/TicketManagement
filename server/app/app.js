var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
var app = express();

//Middlewares
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());





require('./middlewares/locals.mdw')(app);
require('./middlewares/routes.mdw')(app);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  res.status(err.status || 500);
  res.json({
    error: err.message
  });
});

app.listen(process.env.port || 4000, () => {
  console.log(`Server running at http://localhost:4000`);
})


//Connect to mongodb
mongoose
  .connect('mongodb+srv://usermongodb:usermongopassword@ticketmanagement.kto9n.mongodb.net/ticketmanangement?retryWrites=true&w=majority',
   { useUnifiedTopology: true, useNewUrlParser: true })
  .catch(err => console.log(err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connect to db successfully')
});
module.exports = app;