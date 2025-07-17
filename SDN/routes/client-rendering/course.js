var express = require("express");
const courseController = require("../../controllers/client-rendering/course");
const { authMiddleware } = require("../../middlewares/auth");

const courseRouter = express.Router();
courseRouter.use(express.json());
courseRouter.route("/").get(authMiddleware, courseController.findAll);
courseRouter.route("/:id").get(authMiddleware, courseController.getDetail);
courseRouter.route("/").post(authMiddleware, courseController.create);
courseRouter.route("/:id").put(authMiddleware, courseController.update);
courseRouter.route("/:id").delete(authMiddleware, courseController.delete);

module.exports = courseRouter;
