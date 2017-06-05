var router = require("express").Router();
var mongoUtil = require('../../config/mongodbUtil');
var assert = require("assert");


router.post('/add', function(req, res, next) {
    var db = mongoUtil.getDb();
    var itineraryCollection = db.collection("itinerary");
    itineraryCollection.insertOne(req.body)
        .then(function(err, result) {
            return res.json({
                data: "success"
            });
        })
});

router.post('/get', function(req, res, next) {
    var db = mongoUtil.getDb();
    console.log(req.body.stop)
    var itineraryCollection = db.collection("itinerary");
    var cursor = itineraryCollection.find({
        stops: req.body.stop 
    });
    cursor.toArray(function(err,result){
        console.log(result);
        return res.json({
            data:result
        })
    });
});

module.exports = router;
