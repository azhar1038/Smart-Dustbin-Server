const express = require("express");
const { sendNotification } = require("../../utils/fcm-utils");

const {
    calculateFullPercent,
    minTrigger,
} = require("../../utils/dustbin-utils");

function dustbinRouter(database){
    const router = express.Router();

    router.get('/dustbin', (req, res)=>{
        res.status(200).json({"message": "dustbin"});
    });

    router.post('/dustbin', (req, res)=>{
        const uid = req.body.uid;
        const distance = req.body.distance;
        if(!uid){
            return res.status(400).json({"message": "Please provide dustbin id"});
        }
        if(!distance){
            return res.status(400).json({"message": "Please provide garbage distance"});
        }

        database.ref(uid).get().then((snapshot)=>{
            if(snapshot.exists && snapshot.val()){
                const data = snapshot.val();
                const email = data['email'];
                const oldDistance = data['distance'];
                const height = data['height'];
                var notified = data['notified'];
                const token = data['token'];

                var updates = {};

                if(!email){
                    return res.status(200).json({"message": "Ignoring request because no user is registered"});
                }
                if(Math.abs(oldDistance-distance) < minTrigger(height)){
                    return res.status(200).json({"message": "Ignoring request because of minor change in distance"});
                }
                updates['distance'] = distance;
                const newPercent = calculateFullPercent(height, distance);

                if(newPercent > 90){
                    if(!notified){
                        sendNotification(token, newPercent);
                        console.log("Sending Notification to user!!!!");
                        notified = true;
                    }
                }else if(notified){
                    notified = false;
                }
                updates['notified'] = notified;

                database.ref(uid).update(updates).then(()=>{
                    return res.status(200).json({"message": `Updated dustbin successfully. Sent Notification = ${notified}`});
                }).catch((error)=>{
                    console.error(error);
                    return res.status(500).json({"message": error});
                });

            }else{
                var newEntry = {};
                newEntry['distance'] = distance;
                newEntry['notified'] = false;
                database.ref(uid).set(newEntry).then(()=>{
                    return res.status(200).json({"message": "Created new dustbin successfully"});
                }).catch((error)=>{
                    console.error(error);
                    return res.status(500).json({"message": error});
                });
            }
        }).catch((error)=>{
            console.error(error);
            return res.status(500).json({"message": error});
        });
    })

    return router;
}

module.exports = dustbinRouter;