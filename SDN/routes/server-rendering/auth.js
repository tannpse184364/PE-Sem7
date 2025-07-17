const express = require("express");
const authController = require("../../controllers/server-rendering/auth");

const authRouter = express.Router();
authRouter.use(express.json());

authRouter.route("/login").get(authController.getLoginView);
authRouter.route("/login").post(authController.login);

module.exports = authRouter;
