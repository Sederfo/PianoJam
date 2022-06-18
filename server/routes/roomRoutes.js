const {generateRoomId} = require("../controllers/roomsController")
const router = require("express").Router()

router.get("/roomId", generateRoomId)


module.exports = router;