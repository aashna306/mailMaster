import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    // Extract token from cookies
    const token = req.cookies.token;

    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Verify token using the secret key
    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Check if the token was decoded successfully
    if (!decode) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Attach the decoded userId to req object
    req.id = decode.userId;

    // Proceed to the next middleware
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default isAuthenticated;
