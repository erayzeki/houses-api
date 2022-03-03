const express = require("express");
const router = express.Router();
const auth = require("../middleware/authentication");

const {
  getAllHouses,
  getHouse,
  createHouse,
  updateHouse,
  deleteHouse,
} = require("../controllers/houseController");

router.route("/").post(createHouse).get(getAllHouses);

router.post("/", auth, createHouse);
router.patch("/:id", auth, updateHouse);
router.delete("/:id", auth, deleteHouse);

router.route("/:id").get(getHouse);

module.exports = router;
