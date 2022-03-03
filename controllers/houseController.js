const { StatusCodes } = require("http-status-codes");
const House = require("../models/House");

const createHouse = async (req, res) => {
  const house = await House.create(req.body);
  res.status(StatusCodes.CREATED).json({ house });
};

const getAllHouses = async (req, res) => {
  const houses = await House.find({});
  res.status(StatusCodes.OK).json({ houses, count: houses.length });
};

const getHouse = async (req, res) => {
  res.send("Get House");
};

const updateHouse = async (req, res) => {
  res.send("Update House");
};

const deleteHouse = async (req, res) => {
  res.send("Delete House");
};

module.exports = {
  getAllHouses,
  getHouse,
  createHouse,
  updateHouse,
  deleteHouse,
};
