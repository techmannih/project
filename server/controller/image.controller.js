const cloudinary = require("../config/cloudinary");
const Image = require("../models/image.model");

// Controller to upload an image
const uploadImage = async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ status: "error", message: "No image file provided" });
  }

  const userId = req.user?.id;

  if (!userId) {
    return res
      .status(401)
      .json({ status: "error", message: "User not authenticated" });
  }

  // Upload image to Cloudinary
  const stream = cloudinary.uploader.upload_stream(
    { resource_type: "image" },
    async (error, result) => {
      if (error) {
        console.error("Cloudinary upload error:", error);
        return res.status(500).json({
          status: "error",
          message: "Error uploading image to Cloudinary",
          details: error,
        });
      }

      if (!result?.secure_url) {
        return res.status(500).json({
          status: "error",
          message: "Cloudinary did not return a valid result",
        });
      }

      const newImage = new Image({
        userId: userId,
        url: result.secure_url,
        title: req.body.title || "",
        description: req.body.description || "",
      });

      try {
        await newImage.save();
        console.log("Image saved successfully:", newImage);
        return res.status(201).json({
          status: "success",
          message: "Image uploaded successfully",
          image: newImage,
        });
      } catch (saveError) {
        console.error("Error saving image metadata:", saveError);
        return res.status(500).json({
          status: "error",
          message: "Error saving image metadata",
          details: saveError,
        });
      }
    }
  );

  // End the stream with the file buffer
  stream.end(req.file.buffer);
};

const getUserImages = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({
      status: "error",
      message: "User ID is required",
    });
  }

  try {
    const images = await Image.find({ userId });
    if (!images.length) {
      return res.status(404).json({
        status: "success",
        message: "No images found for this user.",
        images: [],
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Images retrieved successfully",
      images,
    });
  } catch (error) {
    console.error("Error fetching images:", error);
    return res.status(500).json({
      status: "error",
      message: "Error fetching images",
      details: error.message,
    });
  }
};

// Controller to increment the view count of an image
const incrementViewCount = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    console.log("Incrementing view count for image:", image);

    if (!image) {
      return res
        .status(404)
        .json({ status: "error", message: "Image not found" });
    }

    const userId = req.user?.id;
    if (!userId) {
      return res
        .status(401)
        .json({ status: "error", message: "User not authenticated" });
    }

    // Check if the user is the owner of the image
    if (image.userId.toString() === userId) {
      return res.status(200).json({
        status: "success",
        message: "View count not incremented for the owner's view",
        viewCount: image.viewCount,
        image: {
          id: image._id,
          url: image.url,
          title: image.title,
          description: image.description,
          viewCount: image.viewCount,
        },
      });
    }

    // Increment the view count if the user is not the owner
    image.viewCount += 1;
    await image.save();

    return res.status(200).json({
      status: "success",
      message: "View count incremented successfully",
      viewCount: image.viewCount,
      image: {
        id: image._id,
        url: image.url,
        title: image.title,
        description: image.description,
        viewCount: image.viewCount,
      },
    });
  } catch (error) {
    console.error("Error incrementing view count:", error);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};

const fetchImageById = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res
        .status(404)
        .json({ status: "error", message: "Image not found" });
    }
    return res.status(200).json({
      status: "success",
      message: "Image fetched successfully",
      image,
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};
const fetchAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    if (!images.length) {
      return res.status(404).json({
        status: "success",
        message: "No images found.",
        images: [],
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Images retrieved successfully",
      images,
    });
  } catch (error) {
    console.error("Error fetching images:", error);
    return res.status(500).json({
      status: "error",
      message: "Error fetching images",
      details: error.message,
    });
  }
};

module.exports = {
  uploadImage,
  getUserImages,
  incrementViewCount,
  fetchImageById,
  fetchAllImages,
};
