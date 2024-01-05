"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePostSchema = exports.deleteSchema = exports.createPostSchema = void 0;
var _joi = _interopRequireDefault(require("@hapi/joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createPostSchema = exports.createPostSchema = _joi.default.object().keys({
  title: _joi.default.string().required(),
  desc: _joi.default.string().required()
});
const deleteSchema = exports.deleteSchema = _joi.default.object().keys({
  postId: _joi.default.string().uuid().required()
});
const updatePostSchema = exports.updatePostSchema = _joi.default.object().keys({
  id: _joi.default.string().uuid().required(),
  title: _joi.default.string(),
  desc: _joi.default.string()
});