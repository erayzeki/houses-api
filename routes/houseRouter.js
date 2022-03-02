const express = require("express");
const router = express.Router();

const {
  getAllHouses,
  getHouse,
  createHouse,
  updateHouse,
  deleteHouse,
} = require("../controllers/houseController");

router.route("/").post(createHouse).get(getAllHouses);
router.route("/:id").get(getHouse).delete(deleteHouse).patch(updateHouse);

module.exports = router;
