const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')
const message = require('../validation/messageManager')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).send({error: message.ErrorMessage('MISSING_TOKEN')})
    }

    const parts = authHeader.split(' ')

    if(!parts.length === 2) {
        return res.status(401).send({error: message.ErrorMessage('INVALID_TOKEN_FORMAT')})
    }

    const [ scheme, token ] = parts

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({error: message.ErrorMessage('INVALID_TOKEN_FORMAT')})
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({error: message.ErrorMessage('INVALID_TOKEN')})
        }

        req.userId = decoded.id
        return next()
    })
}