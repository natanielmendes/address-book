var admin = require("firebase-admin")
let serviceAccount = process.env.SERVICE_ACCOUNT_KEY

admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(serviceAccount)),
    databaseURL: "https://strv-firestore.firebaseio.com"
  });
  
const db = admin.firestore()

module.exports = db