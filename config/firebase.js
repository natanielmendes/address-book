var admin = require("firebase-admin");
let serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://strv-firestore.firebaseio.com"
  });
  
const db = admin.firestore()

module.exports = db