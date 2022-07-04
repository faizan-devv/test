const mongoose = require("mongoose");
const pagination = require("mongoose-paginate-v2");

const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter category name"],
    trim: true,
    maxLength: [25, "Category name cannot exceed 25 characters"],
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
});
categoriesSchema.plugin(pagination);
module.exports = mongoose.model("Categories", categoriesSchema);
