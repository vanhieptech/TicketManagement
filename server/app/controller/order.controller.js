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
          count: docs.length,
          orders: docs
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
        message: "Order created successfully",
        createdOrder: {
          _id: result._id,
          code: result.code,
          status: result.status,
          flight: result.flight,
          user: result.user,
          passengers: result.passengers
        },
        request: {
          type: 'GET',
          url: 'http://localhost:4000/api/order/' + result._id,
        }
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
          message: 'Order deleted successfully',
          deletedOrder: doc,
          request: {
            type: 'POST',
            url: 'http://localhost:4000/api/order',
            body: {
              permission: 'String',
              user: 'ObjectId'
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
  putOrder: (req, res) => {
    const id = req.params.id;
    Order.findOneAndUpdate({ _id: id }, req.body, { new: true, useFindAndModify: false })
      .select('_id code status flight user tickets passengers payment')
      .exec()
      .then(doc => {
        res.status(200).json({
          message: 'Order updated successfully',
          updatedOrder: doc,
          request: {
            type: 'GET',
            url: 'http://localhost:4000/api/order/' + doc._id
          }
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