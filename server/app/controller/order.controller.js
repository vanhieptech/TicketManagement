const Order = require('../models/order');
const mongoose = require('mongoose');

module.exports = {
  getOrders: (req, res) => {
    Order
      .find()
      .select('_id code status flight user tickets passengers payment')
      .exec()
      .then(docs => {
        const response = {
          code: 200,
          message: 'Get orders successfully',
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
  getOrder: (req, res) => {
    const id = req.params.id;
    Order
      .findById(id)
      .select('_id code status flight user tickets passengers payment')
      .exec()
      .then(doc => {
        if (doc) {
          res.status(200).json({
            code: 200,
            message: 'Get order successfully',
            results:doc});
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
  postOrder: (req, res) => {
    const order = new Order({
      _id: new mongoose.Types.ObjectId(),
      code: req.body.code,
      status: req.body.status,
      flight: req.body.flight,
      user: req.body.user,
      passengers: req.body.passengers
    });
    order.save().then(result => {
      res.status(201).json({
        code: 201,
        message: "Order created successfully",
        results: {
          _id: result._id,
          code: result.code,
          status: result.status,
          flight: result.flight,
          user: result.user,
          passengers: result.passengers
        },
      })
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });

  },
  deleteOrder: (req, res) => {
    const id = req.params.id;
    Order
      .findOneAndRemove({ _id: id }, { new: true, useFindAndModify: false })
      .select('_id code status flight user tickets passengers payment')
      .then(doc => {
        res.status(200).json({
          code: 200,
          message: 'Order deleted successfully',
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
  putOrder: (req, res) => {
    const id = req.params.id;
    Order.findOneAndUpdate({ _id: id }, req.body, { new: true, useFindAndModify: false })
      .select('_id code status flight user tickets passengers payment')
      .exec()
      .then(doc => {
        res.status(200).json({
          code: 200,
          message: 'Order updated successfully',
          results: doc,
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