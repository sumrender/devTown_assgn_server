const Like = require("../models/likeModel");
const Photo = require("../models/photoModel");

async function createLike(req, res, next) {
  try {
    const photoId = req.params.id;

    const photo = await Photo.findById(photoId);
    if (!photo) {
      res.status(404);
      throw new Error("Photo not found");
    }
    const like = await Like.create({
      author: req.user._id,
    });
    photo.likes.push(like);
    await photo.save();

    res.status(201).json(like);
  } catch (error) {
    next(error);
  }
}

async function deleteLike(req, res, next) {
  try {
    const id = req.params.id;
    const like = await Like.findOneAndDelete({ _id: id, author: req.user._id });
    if (!like) {
      res.status(404);
      throw new Error("Like not found");
    }
    const photo = await Photo.findOneAndUpdate(
      { likes: like._id },
      { $pull: { like: like._id } },
      { new: true }
    );
    if (!photo) {
      res.status(404);
      throw new Error("Photo not found");
    }

    res.status(200).json({
      success: true,
      message: "Likes removed successfully",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { createLike, deleteLike };
