import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import User from "../models/UserModel.js";

// controller function to remove the background image
export const removeBgImage = async (req, res) => {
  try {
    const { clerkId } = req.body;
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    if (user.creditBalance === 0) {
      return res.json({
        Success: false,
        message: "You don't have sufficient balance",
        creditBalance: user.creditBalance,
      });
    }
    const imagePath = req.file.path;
    // Reading the image file
    const imageFile = fs.createReadStream(imagePath);
    const formdata = new FormData();
    formdata.append("image_file", imageFile);

    const { data } = await axios.post(
      "https://clipdrop-api.co/replace-background/v1",
      formdata,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = Buffer.form(data, "binary").toString("base64");
    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

    await User.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });
    res.json({
      success: true,
      resultImage,
      creditBalance: user.creditBalance - 1,
      message: "Background Removed",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
