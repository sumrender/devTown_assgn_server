const Photo = require("../models/photoModel");
const Comment = require("../models/commentModel");
const Like = require("../models/likeModel");
async function createPhoto(req, res, next) {
  try {
    const { url, caption } = req.body;
    if (!url) {
      res.status(400);
      throw new Error("Img URL not found");
    }
    const photo = await Photo.create({ url, caption, author: req.user._id });
    res.status(201).json({
      success: true,
      photo,
      message: "Photo created successfully",
    });
  } catch (error) {
    next(error);
  }
}
async function getAllPhotos(req, res, next) {
  try {
    const photos = await Photo.find();
    res.status(200).json(photos);
  } catch (error) {
    next(error);
  }
}
async function getPhotoById(req, res, next) {
  try {
    const photo = await Photo.findOne({ _id: req.params.id })
      .populate({
        path: "author",
        select: "name",
      })
      .populate({
        path: "likes comments",
        // sort: { createdAt: -1 },
        populate: { path: "author", select: "name" },
      });
    if (!photo) {
      res.status(404);
      throw new Error("Photo not found");
    }

    res.status(200).json(photo);
  } catch (error) {
    next(error);
  }
}
async function updatePhoto(req, res, next) {
  const id = req.params.id;
  const { url, caption } = req.body;

  try {
    const newData = { };
    if(url) newData.url = url;
    if (caption) newData.caption = caption;
    const photo = await Photo.findOneAndUpdate(
      {
        _id: id,
        author: req.user._id,
      },
      newData,
      { new: true }
    );
    if (!photo) {
      res.status(404);
      throw new Error("Photo not found");
    }

    res.status(200).json(photo);
  } catch (error) {
    next(error);
  }
}
async function deletePhoto(req, res, next) {
  const id = req.params.id;

  try {
    const photo = await Photo.findOne({ _id: id, author: req.user._id });
    if (!photo) {
      res.status(404);
      throw new Error("Photo not found");
    }
    // Get an array of comment and like IDs
    const commentIds = photo.comments.map((comment) => comment._id);
    const likeIds = photo.likes.map((like) => like._id);
    // Delete all comments and likes associated with the tweet
    await Comment.deleteMany({ _id: { $in: commentIds } });
    await Like.deleteMany({ _id: { $in: likeIds } });
    await Photo.deleteOne({ _id: id });
    res.status(200).json({
      success: true,
      message: "Photo deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createPhoto,
  getAllPhotos,
  getPhotoById,
  updatePhoto,
  deletePhoto,
};
