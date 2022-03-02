const { StatusCodes } = require("http-status-codes");
const House = require("../models/House");

const getAllHouses = async (req, res) => {
  res.send("Get All Houses");
};

const getHouse = async (req, res) => {
  res.send("Get House");
};

const createHouse = async (req, res) => {
  res.send("Create House");
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
