const express = require("express");
const {
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  deleteBlogController,
  getBlogByIdController,
  userBlogController,
} = require("../controller/blogControllers");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

//img storage path

cloudinary.config({
  cloud_name: "didyxuyd5",
  api_key: "594739467483977",
  api_secret: "CiUCXuI6hXWOE238Gp8MgcrW058",
});

//storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "devtown",
  },
});

// img filter
const isFile = (req, file, callback) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jfif" ||
    file.mimetype === "video/mp4"
  ) {
    callback(null, true);
  } else {
    callback(new Error("Only image and videos are allowed"));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: isFile,
});

//Routes

//GET || all blogs
router.get("/all-blogs", getAllBlogsController);

//POST || create a blog
router.post("/create-blog", upload.single("image"), createBlogController);

//PUT || update blog
router.put("/update-blog/:id", upload.single("image"), updateBlogController);

//GET || single blog detail
router.get("/get-blog/:id", upload.single("image"), getBlogByIdController);

//Delete || delete a blog
router.delete("/delete-blog/:id", deleteBlogController);

//GET || user blogs
router.get("/user-blog/:id", userBlogController);

module.exports = router;
