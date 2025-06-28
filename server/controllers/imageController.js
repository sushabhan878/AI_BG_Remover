import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import User from "../models/UserModel.js";

// controller function to remove the background image
export const removeBgImage = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Request clerkId:", req.clerkId);
    console.log("Request file:", req.file);

    const clerkId = req.clerkId;
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

    const imagePath = req.file.path.replace(/\\/g, "/");
    console.log("Image path:", imagePath);
    console.log("CLIPDROP_API key exists:", !!process.env.CLIPDROP_API);
    console.log("CLIPDROP_API key length:", process.env.CLIPDROP_API?.length);
    console.log(
      "CLIPDROP_API key starts with:",
      process.env.CLIPDROP_API?.substring(0, 10) + "..."
    );

    // Reading the image file
    const imageFile = fs.createReadStream(imagePath);
    const formdata = new FormData();
    formdata.append("image_file", imageFile);

    console.log("Sending request to ClipDrop API...");
    console.log("FormData headers:", formdata.getHeaders());

    const response = await axios.post(
      "https://clipdrop-api.co/remove-background/v1",
      formdata,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
          ...formdata.getHeaders(),
        },
        responseType: "arraybuffer",
        timeout: 30000, // 30 second timeout
      }
    );

    console.log("ClipDrop API response status:", response.status);
    console.log("ClipDrop API response headers:", response.headers);
    console.log("ClipDrop API response data length:", response.data.length);

    const base64Image = Buffer.from(response.data, "binary").toString("base64");
    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

    console.log("Base64 image length:", base64Image.length);
    console.log("Result image data URL length:", resultImage.length);

    // Clean up uploaded file
    fs.unlink(imagePath, (err) => {
      if (err) console.log("Error deleting file:", err);
      else console.log("File deleted successfully");
    });

    await User.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });

    const responseData = {
      success: true,
      resultImg: resultImage,
      creditBalance: user.creditBalance - 1,
      message: "Background Removed",
    };

    console.log("Sending response to frontend:", {
      success: responseData.success,
      resultImgLength: responseData.resultImg.length,
      creditBalance: responseData.creditBalance,
      message: responseData.message,
    });

    res.json(responseData);
  } catch (error) {
    console.log("Error details:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
        ? Buffer.from(error.response.data).toString()
        : "No data",
      headers: error.response?.headers,
    });

    // Clean up uploaded file on error
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.log("Error deleting file on error:", err);
      });
    }

    res.json({
      success: false,
      message: error.message,
      details: error.response?.data
        ? Buffer.from(error.response.data).toString()
        : "No additional details",
    });
  }
};
