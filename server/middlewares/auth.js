import jwt from "jsonwebtoken";

// Middleware function to decode jwt token to get clerk id
const authUser = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
