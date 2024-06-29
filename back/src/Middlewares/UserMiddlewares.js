const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function isLoggedIn(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach the decoded payload to the request object
    next();
  } catch (error) {
    console.log(token, error);
    return res.status(400).json({ message: "Invalid token." });
  }
}

function isAdmin(req, res, next) {
  if (!req.user || req.user.type !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
}

function isAdminOrOwner(req, res, next) {
  const userId = req.params.id || req.body.id; // Assumes user ID is passed as a URL parameter or in the body

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.user.type === "admin" || req.user.id === userId) {
    return next();
  } else {
    return res
      .status(403)
      .json({ message: "Access denied. Admins only or owner only." });
  }
}



module.exports = { isLoggedIn, isAdmin, isAdminOrOwner };