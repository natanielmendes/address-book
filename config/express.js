const express = require('express')
const message = require('../api/validation/messageManager')
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError)
        return res.status(400).json({error: message.ErrorMessage('INVALID_SYNTAX')})
})
app.listen('3000', function() {
    console.log('App listening on port 3000!')
})

module.exports = app