var admin = require("firebase-admin")
require('dotenv').config()
let serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://strv-firestore.firebaseio.com"
  })
  
const db = admin.firestore()

module.exports = db