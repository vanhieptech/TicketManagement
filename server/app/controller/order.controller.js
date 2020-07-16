var express = require("express");
const User = require("../models/user");
const Flight = require('../models/flight');
const Ticket = require('../models/ticket');
const payment = require('../models/payment');
module.exports = {
    sendOrder: (req, res, next) => {
      res.send('Type: POST');
    }
}