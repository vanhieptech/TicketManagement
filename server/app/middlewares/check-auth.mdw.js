const jwt = require('jsonwebtoken')

module.exports = {
    checkCustomer: (req, res, next) => {
        try {
            const token = req.headers.authorization;
            const user = jwt.verify(token, process.env.JWT_KEY);
            req.user = user;
            next();
        } catch (err) {
            res.status(500).json({
                message: 'Access denied'
            })
        }
    }
}