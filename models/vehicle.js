const mongoose = require("mongoose");
const Category = require("./categories");
const pagination = require("mongoose-paginate-v2");

const vehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Vehicle name"],
    trim: true,
    maxLength: [25, "Product name cannot exceed 25 characters"],
  },
  regNo: {
    type: String,
    required: [true, "Please enter Registration  Number"],
  },
  category: {
    type: String,
    required: [true, "Please select category"],
    validate: async (v) => {
      return !!(await Category.findOne({ name: v }));
    },
  },
  yearOfManufacture: {
    type: Number,
  },
  //required: [true, "Please enter Year of Manufacturing"],
  color: {
    type: String,
    required: [true, "Please enter color"],
  },
  ownerName: {
    type: String,
    maxlength: [30, "Enter Owner Name of the Vehicle"],
    required: [true, "Enter Owner Name of the Vehicle"],
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
});

vehicleSchema.plugin(pagination);
module.exports = mongoose.model("Vehicle", vehicleSchema);
