
/**
 * @swagger
 * /users/signup:
 *    post:
 *     tags: ["User"]
 *     description: Create new user
 *     parameters:
 *        - in: "body"
 *          name: name
 *          description: String (more than 8 charaters)
 *        - in: "body"
 *          name: phone
 *          description: String
 *        - in: "body"
 *          name: email
 *          description: String
 *        - in: "body"
 *          name: dob
 *          description: String
 *        - in: "body"
 *          name: gender
 *          description: String
 *        - in: "body"
 *          name: password
 *          description: String
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

 
/**
 * @swagger
 * paths: 
 *   /users/login:
 *    post:
 *     tags: ["User"]
 *     description: Login with account
 *     parameters:
 *        - in: "body"
 *          name: email
 *          description: String
 *        - in: "body"
 *          name: password
 *          description: String
 *     responses:
 *        '200':
 *          description: A successfull response
 *        'sucess':
 *          description: Boolean
 *        'data':
 *          description: Object
 *        'msg':
 *          description: String
 */
