const express = require("express");
const router = express.Router();

const {
  newVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} = require("../controllers/vehicleController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/vehicles").get(getVehicles);

router.route("/vehicle/new").post(newVehicle);

router
  .route("/vehicle/:id")
  .patch(updateVehicle)
  .delete(deleteVehicle)
  .get(getVehicleById);

module.exports = router;
