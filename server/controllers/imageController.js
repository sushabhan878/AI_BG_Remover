import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import User from "../models/UserModel.js";

// controller function to remove the background image
export const removeBgImage = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
