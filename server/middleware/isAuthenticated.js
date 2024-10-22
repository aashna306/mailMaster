import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log('called',token)

    if (!token) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = { userId: decode.userId }; 

    next();
  } catch (error) {
    console.error("Authentication error: ", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default isAuthenticated;
