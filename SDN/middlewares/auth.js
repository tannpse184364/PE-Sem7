const jwt = require("jsonwebtoken");
const Member = require("../models/member");

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await Member.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

const authMiddlewareInView = async (req, res, next) => {
  if (!req.session.user) {
    req.session.message = "Please log in to continue.";
    return res.redirect("/view/auth/login");
  }
  next();
};
module.exports = { authMiddleware, authMiddlewareInView };
