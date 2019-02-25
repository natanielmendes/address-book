# Address Book
REST API to manage address book using NodeJS and Firestore

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
node v8.11.2 or higher
```

### Installing

A step by step series of examples that tell you how to get a development env running

Go to the root directory

```
npm install
```

Create .env file in root directory containing the following key-value pairs

```
SERVICE_ACCOUNT_KEY=[Firebase Access Key]
PORT=[Chosen port to run nodejs server]
MONGO_URI=[Mongo server address. note: don't forget to add /AddressBook collection, like: mongodb://(address)/AddressBook]
```

Run the project
```
npm start
```

## Running the tests

The tests were designed to create user (when it's not present) and authenticate test user using 'Authorization: Bearer [token]' on following test API calls. To run them execute the following command:
```
npm test
```

If everything goes as smooth as expected you should see the following output:

- Creating test user and saving token on local machine
```
Register User

Authenticate User
```

Test cases for address book validation
```
AddressBook::Successful add
  ✔ Error not expected
  ✔ Added to address book sucessfully

AddressBook::Send add request as array

  ✔ Error expected
  ✔ Not an object error is thrown

AddressBook::Add country missing

  ✔ Error expected
  ✔ Country missing error is thrown

AddressBook::Add country and phones missing

  ✔ Error expected
  ✔ Country and phones missing error is thrown

```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [koogn](https://github.com/ruzicka/koogn) - Useful library to validate JS objects just by example, not schema
* [jwt-url](http://jwt.io) - JSON Web Token
* [firebase-url](https://firebase.com) - Firebase/Firestore

## Authors

* **Nataniel Carvalho** - (https://github.com/natanielmendes)
