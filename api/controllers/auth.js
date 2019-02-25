const app = require('../../config/express')
const message = require('../validation/messageManager')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400 // 1 day
    })
}

app.post('/register', async (req, res) => {

    const email = req.body.email
    
    try {
        if (await User.findOne({ email: email })) {
            return res.status(400).send({error: message.ErrorMessage('USER_ALREADY_EXISTS')})
        }

        const user = await User.create(req.body)

        user.password = undefined

        return res.send({ 
            user, 
            token : generateToken({ id: user.id })
        })
    } catch (e) {
        return res.status(400).send({error: message.ErrorMessage('USER_REGISTRATION_FAILED')})
    }
})

app.post('/authenticate', async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return res.status(400).send({error: message.ErrorMessage('USER_NOT_FOUND')})
    }

    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).send({ error: message.ErrorMessage('INVALID_PASSWORD')})
    }

    user.password = undefined

    res.send({ 
        user, 
        token : generateToken({ id: user.id })
    })
})