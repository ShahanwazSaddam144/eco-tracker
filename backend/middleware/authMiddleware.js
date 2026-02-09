const jwt = require("jsonwebtoken");
const User = require("../Database/auth");

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err); 
    res.status(401).json({ message: "Invalid or expired token" });
  }
};


module.exports = {authMiddleware};
