const jwt = require('jsonwebtoken')
const config = require('../config')

// middleware to validate token (rutas protegidas)
const verifyToken = (req, res, next) => {
    const token = req.cookies.token
    if (!token) return res.redirect("/");
    try {
        const verified = jwt.verify(token, config.SECRET_TOKEN)
        req.user = verified
        next() // continuamos
    } catch (error) {
        res.redirect("/");
    }
}

module.exports = verifyToken;