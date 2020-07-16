/**
 * @swagger
 * /order:
 *    post:
 *     tags: ["Order"]
 *     description: Send an order
 *     parameters:
 *        - in: "body"
 *          name: code
 *          description: Number
 *        - in: "body"
 *          name: total
 *          description: Number
 *        - in: "body"
 *          name: status
 *          description: String
 *        - in: "body"
 *          name: user
 *          description: String (user Id)
 *        - in: "body"
 *          name: flight
 *          description: String (flight Id)
 *        - in: "body"
 *          name: tickets
 *          description: Object Array
 *        - in: "body"
 *          name: payment
 *          description: String (payment Id)
 *     responses:
 *        '201':
 *          description: A successfull response
 *        'sucess':
 *          description: Boolean
 *        'data':
 *          description: Object
 *        'msg':
 *          description: String
 */