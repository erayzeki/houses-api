const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");
const House = require("../models/House");

const createHouse = async (req, res) => {
  req.body.createdBy = req.user.userId;
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
    throw new NotFoundError(`No house found created with id: ${houseId}`);
  }
  res.status(StatusCodes.OK).json({ house });
};

const updateHouse = async (req, res) => {
  const {
    params: { id: houseId },
    user: { userId },
  } = req;

  const house = await House.findOneAndUpdate(
    {
      _id: houseId,
      createdBy: userId,
    },
    req.body,
    { new: true, runValidators: true }
  );

  if (!house) {
    throw new NotFoundError(
      `No house found created by this user with id: ${houseId}`
    );
  }

  res.status(StatusCodes.OK).json({ house });
};

const deleteHouse = async (req, res) => {
  const {
    params: { id: houseId },
    user: { userId },
  } = req;

  const house = await House.findOneAndRemove({
    _id: houseId,
    createdBy: userId,
  });

  if (!house) {
    throw new NotFoundError(
      `No house found created by this user with id: ${houseId}`
    );
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
