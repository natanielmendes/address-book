const test = require('tape')
const request = require('supertest')
const app = require('../config/express')
let token

require('../api/controllers/auth')
require('../api/controllers/addressBookManager')

test('Setup DB', async function (setup) {
    console.log('Data created to this Test Cases')
    setup.end()
})

test('Register User', function(assert) {
    const json = {
        "email": "nataniel@test.com",
        "password": "test"
    }
    request(app)
    .post('/register/')
    .send(json)
    .expect(200)
    .end(function (err, res) {
        token = res.body.token
        assert.end()
    })
})

test('Authenticate User', function(assert) {
    const json = {
        "email": "nataniel@test.com",
        "password": "test"
    }
    request(app)
    .post('/authenticate/')
    .send(json)
    .expect(200)
    .end(function (err, res) {
        token = res.body.token
        assert.end()
    })
})


test('AddressBook::Successful add', function(assert) {
    const jsonAddressBook = {
        "name": "STRV",
        "country": "Tchéquia",
        "city": "Praha 8-Karlín",
        "address": "Rua6 Rohanské nábř. 678/23, 186 00",
        "phones": ["+55 (11) 00000-1000", "+55 (11) 01000-0001"]
    }
    request(app)
    .post('/address/')
    .set('Authorization', 'Bearer ' + token)
    .send(jsonAddressBook)
    .expect(200)
    .end(function (err, res) {
        const expectedMessage = jsonAddressBook
        const returnedMessage = res.body

        assert.error(err, 'Error not expected')
        assert.same(returnedMessage, expectedMessage, 'Added to address book sucessfully')
        assert.end()
    })
})

test('AddressBook::Send add request as array', function(assert) {
    const jsonAddressBook = [{
        "name": "STRV",
        "address": "Rua6 Rohanské nábř. 678/23, 186 00 Praha 8-Karlín, Tchéquia",
        "city": "Testing for address",
        "address": "Testing for address",
        "phones": ["+55 (11) 00000-1000", "+55 (11) 01000-0001"]
    }]
    request(app)
    .post('/address/')
    .set('Authorization', 'Bearer ' + token)
    .send(jsonAddressBook)
    .expect(400)
    .end(function (err, res) {
        const expectedMessage = {
            "error": "Invalid request body parameter: instance is not of a type(s) object"
        }
        const returnedMessage = res.body

        assert.error(err, 'Error expected')
        assert.same(returnedMessage, expectedMessage, 'Not an object error is thrown')
        assert.end()
    })
})

test('AddressBook::Add country missing', function(assert) {
    const jsonAddressBook = {
        "name": "STRV",
        "address": "Rua6 Rohanské nábř. 678/23, 186 00 Praha 8-Karlín, Tchéquia",
        "city": "Testing for address",
        "address": "Testing for address",
        "phones": ["+55 (11) 00000-1000", "+55 (11) 01000-0001"]
    }
    request(app)
    .post('/address/')
    .set('Authorization', 'Bearer ' + token)
    .send(jsonAddressBook)
    .expect(400)
    .end(function (err, res) {
        const expectedMessage = {
            "error": "Invalid request body parameter: Parameter country is required"
        }
        const returnedMessage = res.body

        assert.error(err, 'Error expected')
        assert.same(returnedMessage, expectedMessage, 'Country missing error is thrown')
        assert.end()
    })
})

test('AddressBook::Add country and phones missing', function(assert) {
    const jsonAddressBook = {
        "name": "STRV",
        "address": "Rua6 Rohanské nábř. 678/23, 186 00 Praha 8-Karlín, Tchéquia",
        "city": "Testing for address",
        "address": "Testing for address"
    }
    request(app)
    .post('/address/')
    .set('Authorization', 'Bearer ' + token)
    .send(jsonAddressBook)
    .expect(400)
    .end(function (err, res) {
        const expectedMessage = {
            "error": "Invalid request body parameter: Parameter country is required;Parameter phones is required"
        }
        const returnedMessage = res.body

        assert.error(err, 'Error expected')
        assert.same(returnedMessage, expectedMessage, 'Country and phones missing error is thrown')
        assert.end()
    })
})

test('Clear Up DB', async function (clearup) {
    console.log('All data created to this Test Cases were dropped.')
    clearup.end()
})
  
test.onFinish(() => process.exit(0))