const validator = require('koogn').createValidator()

function isValid(addressBookObj) {
    const isValidBookAddress = validator.throwIfNotValid(getAddressBookValidFormat())
    return isValidBookAddress(addressBookObj)
}

function getAddressBookValidFormat() {
    return {
        name: 'Example for name',
        country: 'Example for country',
        city: 'Example for city',
        address: 'Example for address',
        phones: ['+55 (11) 00000-0000', '+55 (11) 00000-0001']
    }
}

module.exports = {
    isValid
}