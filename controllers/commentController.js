const Comment = require("../models/commentModel");
const Photo = require("../models/photoModel");

async function createComment(req, res, next) {
  try {
    const photoId = req.params.id;
    const { text } = req.body;

    if (!text) {
      res.status(400);
      throw new Error("Comment cannot be empty");
    }
    const photo = await Photo.findById(photoId);
    if (!photo) {
      res.status(404);
      throw new Error("Photo not found");
    }
    let comment = await Comment.create({
      text,
      author: req.user._id,
    });
    photo.comments.push(comment);
    await photo.save();

    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
}

async function updateComment(req, res, next) {
  try {
    const id = req.params.id;
    const { text } = req.body;

    const comment = await Comment.findOneAndUpdate(
      {
        _id: id,
        author: req.user._id,
      },
      { text },
      { new: true }
    );
    if (!comment) {
      res.status(404);
      throw new Error("Comment not found");
    }

    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
}

async function deleteComment(req, res, next) {
  try {
    const id = req.params.id;
    const comment = await Comment.findOneAndDelete({
      _id: id,
      author: req.user._id,
    });
    if (!comment) {
      res.status(404);
      throw new Error("Comment not found");
    }
    const photo = await Photo.findOneAndUpdate(
      { comments: comment._id },
      { $pull: { comments: comment._id } },
      { new: true }
    );
    if (!photo) {
      res.status(404);
      throw new Error("Photo not found");
    }

    res.status(200).json({
      success: true,
      message: "comment deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { createComment, updateComment, deleteComment };
