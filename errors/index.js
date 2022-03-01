const HousesAPIError = require("./houses-api");
const BadRequestError = require("./bad-request");
const NotFoundError = require("./not-found");
const UnauthenticatedError = require("./unauthenticated");

module.exports = {
  HousesAPIError,
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
};
