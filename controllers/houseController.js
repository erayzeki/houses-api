const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");
const House = require("../models/House");

const createHouse = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const house = await House.create(req.body);
  res.status(StatusCodes.CREATED).json({ house });
};

const getAllHouses = async (req, res) => {
  const { town, room, bathroom, balcony, furniture, numericFilters } =
    req.query;

  const queryObject = {};

  if (town) {
    queryObject.town =
      town.charAt(0).toUpperCase() + town.slice(1).toLowerCase();
  }

  if (room) {
    queryObject.room = room.split(" ").join("+");
  }

  if (bathroom) {
    queryObject.bathroom = bathroom;
  }

  if (balcony) {
    queryObject.balcony =
      balcony.charAt(0).toUpperCase() + balcony.slice(1).toLowerCase();
  }

  if (furniture) {
    queryObject.furniture =
      furniture.charAt(0).toUpperCase() + furniture.slice(1).toLowerCase();
  }

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["rent", "area"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  console.log(queryObject);
  const houses = await House.find(queryObject);
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
