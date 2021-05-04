const express = require("express");

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

        const data = {};
        data[uid] = distance;

        database.ref("dustbins").set(data, err=>{
            if(err){
                console.error("Error: ", err);
                return res.status(500).json({"message": err});
            }else{
                console.log("Success");
                return res.status(200).json({"message": "Success"});
            }
        });
    })

    return router;
}

module.exports = dustbinRouter;