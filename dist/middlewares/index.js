"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _validators = _interopRequireDefault(require("./validators"));
var _user = require("./validators/schemas/user");
var _post = require("./validators/schemas/post");
var _authentication = require("./authentication/authentication");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = exports.default = {
  validate: _validators.default,
  loginSchema: _user.loginSchema,
  signUpSchema: _user.signUpSchema,
  deleteSchema: _post.deleteSchema,
  createPostSchema: _post.createPostSchema,
  updatePostSchema: _post.updatePostSchema,
  authentication: _authentication.authentication
};