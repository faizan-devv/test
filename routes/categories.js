const express = require("express");
const router = express.Router();

const {
  newCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoriesController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/categories").get(getCategories);

router.route("/categories/new").post(newCategory);

router
  .route("/category/:id")
  .patch(updateCategory)
  .delete(deleteCategory)
  .get(getCategoryById);

module.exports = router;
