"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _post = require("../../controllers/post");
var _middlewares = _interopRequireDefault(require("../../middlewares"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable no-return-assign */

const {
  validate,
  createPostSchema,
  deleteSchema,
  updatePostSchema,
  authentication
} = _middlewares.default;
const postRoutes = (0, _express.default)();
postRoutes.post("/create", validate(createPostSchema), authentication, _post.createPost);
postRoutes.patch("/edit", validate(updatePostSchema), authentication, _post.editPost);
postRoutes.get("/", _post.getAllPost);
postRoutes.delete("/:postId", validate(deleteSchema), authentication, _post.deletePost);
var _default = exports.default = postRoutes;