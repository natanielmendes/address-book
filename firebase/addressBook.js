const db = require('../config/firebase.js')

function addToAddressBook(addressBook) {
    return db.collection('addressBook').add({
        name: addressBook.name,
        country: addressBook.country,
        city: addressBook.city,
        address: addressBook.address,
        phones: addressBook.phones
    })
}

module.exports = {
    addToAddressBook
}