/* eslint-disable no-return-assign */
import express from "express";
import {
  createPost,
  getAllPost,
  editPost,
  deletePost
} from "../../controllers/post";
import middlewares from "../../middlewares";

const {
  validate,
  createPostSchema,
  deleteSchema,
  updatePostSchema,
  authentication
} = middlewares;

const postRoutes = express();

postRoutes.post(
  "/create",
  validate(createPostSchema),
  authentication,
  createPost
);

postRoutes.patch(
  "/edit",
  validate(updatePostSchema),

  authentication,
  editPost
);

postRoutes.get("/", getAllPost);

postRoutes.delete(
  "/:postId",
  validate(deleteSchema),
  authentication,
  deletePost
);

export default postRoutes;
