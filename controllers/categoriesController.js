const Category = require("../models/categories");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");

// Create new category   =>   /api/v1/categories/new
exports.newCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.create(req.body);
  res.status(201).json({
    success: true,
    category,
  });
});

//Get all Categories => /api/v1/categories
exports.getCategories = catchAsyncErrors(async (req, res, next) => {
  let { limit, page } = req.query;
  !limit ? (limit = 5) : null;
  !page ? (page = 1) : null;
  Category.paginate({}, { page: page, limit: limit })
    .then((categories) => {
      res.status(200).json({
        success: true,
        categories,
      });
    })
    .catch((err) => {
      next(err);
    });
});

// Get Single Category   =>   /api/v1/category/:id
exports.getCategoryById = catchAsyncErrors(async (req, res, next) => {
  let category = await Category.findById(req.params.id);
  res.status(200).json({
    success: true,
    category,
  });
});

// Update Category   =>   /api/v1/category/:id
exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  let category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler("category not found", 404));
  }

  category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    category,
  });
});

// Delete Category   =>   /api/v1/categories/:id
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler("category not found", 404));
  }

  await category.remove();

  res.status(200).json({
    success: true,
    message: "category has been deleted.",
  });
});
