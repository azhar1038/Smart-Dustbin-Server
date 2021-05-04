const firebase = require("firebase");
const dotenv = require("dotenv");

dotenv.config();

var firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: `${process.env.PROJECT_ID}.firebaseapp.com`,
    projectId: process.env.PROJECT_ID,
    storageBucket: `${process.env.PROJECT_ID}.appspot.com`,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);
let database = firebase.database();

module.exports={
    database
}