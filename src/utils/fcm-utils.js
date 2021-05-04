const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert({
    "project_id": process.env.PROJECT_ID,
    "private_key": process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.CLIENT_EMAIL
  }),
  databaseURL: "https://test-864ca-default-rtdb.firebaseio.com"
});


function sendNotification(token, percent){
    const message = {
        notification: {
            title: "Dustbin",
            body: `Your dustbin id ${percent}% full!`,
            channel_id: "smart_dustbin",
            sound: "notification",
            priority: "high",
            android_channel_id: "smart_dustbin"
        },
    };
    const options = {
        priority: "high"
    };
    admin.messaging().sendToDevice(token, message, options).then(()=>{
        console.log("Sent notification");
    }).catch((error)=>{
        console.error(`Failed to send notification: ${error}`);
    });
}

module.exports={
    sendNotification
}