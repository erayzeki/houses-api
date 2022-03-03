const { send } = require("express/lib/response");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");
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
  const houseId = req.params.id;
  const house = await House.findById(houseId);
  if (!house) {
    throw new NotFoundError(`No house found with id: ${houseId}`);
  }
  res.status(StatusCodes.OK).json({ house });
};

const updateHouse = async (req, res) => {
  const houseId = req.params.id;
  const house = await House.findOneAndUpdate(
    {
      _id: houseId,
    },
    req.body,
    { new: true, runValidators: true }
  );

  if (!house) {
    throw new NotFoundError(`No house found with id: ${houseId}`);
  }

  res.status(StatusCodes.OK).json({ house });
};

const deleteHouse = async (req, res) => {
  const houseId = req.params.id;
  const house = await House.findOneAndRemove({ _id: houseId });

  if (!house) {
    throw new NotFoundError(`No house found with id: ${houseId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllHouses,
  getHouse,
  createHouse,
  updateHouse,
  deleteHouse,
};
