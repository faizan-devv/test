const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const generatePassword = require("../utils/generateRandomPassword");

// Generate Dummy Users   =>   /api/v1/users/dummy
exports.generateDummyUsers = catchAsyncErrors(async (req, res, next) => {
  const { count } = req.body;
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomDate() {
    // aprox nr of days since 1970 untill 2000: 30years * 365 days
    var nr_days1 = 30 * 365;
    // aprox nr of days since 1950 untill 1970: 20years * 365 days
    var nr_days2 = -20 * 365;

    // milliseconds in one day
    var one_day = 1000 * 60 * 60 * 24;

    // get a random number of days passed between 1950 and 2000
    var days = getRandomInt(nr_days2, nr_days1);

    return new Date(days * one_day);
  }
  const password = generatePassword(10);
  for (var i = 1; i <= 10000; i++) {
    let result = await User.insert({
      name: "name" + i,
      birthday: getRandomDate(),
      password: password,
      email: `name${i}@test.com`,
    });
    console.log("result", result);
  }
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
