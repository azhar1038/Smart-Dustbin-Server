const admin = require("firebase-admin");
const dotenv = require("dotenv");

const {database} = require("./firebase-utils");

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
            body: `Your dustbin is ${percent}% full!`,
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

function sendToCollectors(name, address, percent){
    database.ref(`collectors`).get().then( snapshot =>{
        if(snapshot.exists && snapshot.val()){
            const tokens = [];
            const data = snapshot.val();
            for (const key in data) {
                tokens.push(data[key]['token']);
            }
            const message = {
                notification: {
                    title: `${name}'s dustbin ${percent}% full`,
                    body: address,
                    channel_id: "smart_dustbin_collector",
                    sound: "notification",
                    priority: "high",
                    android_channel_id: "smart_dustbin_collector"
                },
            };
            const options = {
                priority: "high"
            };
            admin.messaging().sendToDevice(tokens, message, options).then(()=>{
                console.log("Sent notifications to collectors");
            }).catch((error)=>{
                console.error("Failed to send to collectors", error);
            });
        }
    });
}

module.exports={
    sendNotification,
    sendToCollectors,
}