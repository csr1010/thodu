var router = require("express").Router();
router.use('/itinerary', require('./itinerary'));
module.exports = router;