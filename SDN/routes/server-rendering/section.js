var express = require("express");
const sectionController = require("../../controllers/server-rendering/section");
const { authMiddlewareInView } = require("../../middlewares/auth");

const sectionRouter = express.Router();
sectionRouter.use(express.json());
sectionRouter.route("/").get(authMiddlewareInView, sectionController.findAll);
// sectionRouter.route("/:id").get(authMiddlewareInView, sectionController.getDetail);
sectionRouter.route("/").post(authMiddlewareInView, sectionController.create);
sectionRouter.route("/:id").put(authMiddlewareInView, sectionController.update);
sectionRouter
  .route("/:id")
  .delete(authMiddlewareInView, sectionController.delete);

module.exports = sectionRouter;
