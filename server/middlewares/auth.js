import jwt from "jsonwebtoken";

// Middleware function to decode jwt token to get clerk id
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "Not authorized. Login again.",
      });
    }
    const token_decode = jwt.decode(token);
    if (!token_decode?.clerkId) {
      return res.json({
        success: false,
        message: "Invalid token payload",
      });
    }
    req.clerkId = token_decode.clerkId;
    next();
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
