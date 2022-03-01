const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const User = require("../models/User");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: { name: user.name },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // email and password check
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  // check if user email exist on database
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  // check if password is correct
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  // return user name and token
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: { name: user.name },
    token,
  });
};

module.exports = {
  register,
  login,
};
