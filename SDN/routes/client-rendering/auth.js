const express = require("express");
const authController = require("../../controllers/client-rendering/auth");

const authRouter = express.Router();
authRouter.use(express.json());

authRouter.route("/register").post(authController.register);
authRouter.route("/login").post(authController.login);

module.exports = authRouter;
