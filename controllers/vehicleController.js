const Vehicle = require("../models/vehicle");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");

// Create new vehicle   =>   /api/v1/vehicle/new
exports.newVehicle = catchAsyncErrors(async (req, res, next) => {
  const vehicle = await Vehicle.create(req.body);
  res.status(200).json({
    success: true,
    vehicle,
  });
});

//Get all Vehicles => /api/v1/vehicles
exports.getVehicles = catchAsyncErrors(async (req, res, next) => {
  let { limit, page } = req.query;
  !limit ? (limit = 5) : null;
  !page ? (page = 1) : null;
  Vehicle.paginate({}, { page: page, limit: limit })
    .then((vehicles) => {
      res.status(200).json({
        success: true,
        vehicles,
      });
    })
    .catch((err) => {
      next(err);
    });
});

// Get Single Vehicle   =>   /api/v1/vehicle/:id
exports.getVehicleById = catchAsyncErrors(async (req, res, next) => {
  let vehicle = await Vehicle.findById(req.params.id);
  res.status(200).json({
    success: true,
    vehicle,
  });
});

// Update Vehicle   =>   /api/v1/vehicle/:id
exports.updateVehicle = catchAsyncErrors(async (req, res, next) => {
  let vehicle = await Vehicle.findById(req.params.id);

  if (!vehicle) {
    return next(new ErrorHandler("vehicle not found", 404));
  }

  vehicle = await Vehicle.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      regNo: req.body.regNo,
      category: req.body.category,
      yearOfManufacture: req.body.yearOfManufacture,
      color: req.body.color,
      ownerName: req.body.ownerName,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    vehicle,
  });
});

// Delete Vehicle   =>   /api/v1/vehicle/:id
exports.deleteVehicle = catchAsyncErrors(async (req, res, next) => {
  const vehicle = await Vehicle.findById(req.params.id);

  if (!vehicle) {
    return next(new ErrorHandler("vehicle not found", 404));
  }

  await vehicle.remove();

  res.status(200).json({
    success: true,
    message: "vehicle has been deleted.",
  });
});
