const app = require('../config/express')
const message = require('./validation/messageManager')
const addressBook = require('../firebase/addressBook.js')
const addressBookValidation = require('./validation/addressBookValidation.js')


app.post('/address', async function(req, res) {
    try {
        addressBookValidation.isValid(req.body)
    } catch (e) {
        return res.status(400).json({error: message.ErrorMessage('INV_REQ_BODY_PARAM', e.message)})
    }    
    await addressBook.addToAddressBook(req.body)
    return res.status(200).json(req.body)
})