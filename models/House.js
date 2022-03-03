const mongoose = require("mongoose");

const HouseSchema = new mongoose.Schema({
  town: {
    type: String,
    required: [true, "Please provide a town"],
    minlength: 3,
    maxlength: 30,
  },
  rent: {
    type: Number,
    required: [true, "Please provide a rent"],
    min: 1,
  },
  area: {
    type: Number,
    required: [true, "Please provide area"],
    min: 1,
  },
  room: {
    type: String,
    required: [true, "Please provide the number of rooms in the house"],
  },
  bathroom: {
    type: Number,
    default: 1,
    min: 1,
  },
  age: {
    type: String,
    enum: [
      "0 (New)",
      "1",
      "11-15",
      "16-20",
      "2",
      "21 or more",
      "3",
      "4",
      "5-10",
    ],
    required: [true, "Please provide the age of the building"],
  },
  balcony: {
    type: String,
    enum: ["Yes", "No"],
    default: "No",
  },
  furniture: {
    type: String,
    enum: ["Yes", "No"],
    default: "No",
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide a user"],
  },
});

module.exports = mongoose.model("House", HouseSchema);
