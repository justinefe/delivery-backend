"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllPost = exports.editPost = exports.deletePost = exports.createPost = void 0;
var _models = _interopRequireDefault(require("../database/models"));
var _helpers = _interopRequireDefault(require("../helpers"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import Sequelize from 'sequelize';

const {
  successStat,
  errorStat
} = _helpers.default;

/**
 * / @static
 * @description Allows an admin to create a Audio
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} object the newly created audio
 * @memberof audioController
 */
const createPost = async (req, res) => {
  const {
    title
  } = req?.body?.validated;
  const isExist = await _models.default.Post.findOne({
    where: {
      title
    }
  });
  if (isExist) {
    return errorStat(res, 409, "A post with this title already exists");
  }
  await _models.default.Post.create({
    ...req.body.validated,
    ownerId: req?.userInfo?.id
  });
  const posts = await _models.default.Post.findAll({
    include: [{
      model: _models.default.User,
      as: "owner",
      attributes: ["firstName", "lastName", "id"]
    }],
    order: [["createdAt", "DESC"]]
  });
  return successStat(res, 201, "data", {
    posts
  });
};
exports.createPost = createPost;
const editPost = async (req, res) => {
  const {
    id,
    title,
    desc
  } = req?.body?.validated;
  const isExist = await _models.default.Post.findOne({
    where: {
      id
    }
  });
  if (!isExist) {
    return errorStat(res, 404, "The post does not exists");
  }
  if (isExist?.ownerId !== req?.userInfo?.id) return errorStat(res, 403, "Unauthorized to perform action");
  await _models.default.Post.update({
    title,
    desc
  }, {
    where: {
      id
    }
  });
  const posts = await _models.default.Post.findAll({
    include: [{
      model: _models.default.User,
      as: "owner",
      attributes: ["firstName", "lastName", "id"]
    }],
    order: [["createdAt", "DESC"]]
  });
  return successStat(res, 201, "data", {
    posts
  });
};
exports.editPost = editPost;
const getAllPost = async (req, res) => {
  const posts = await _models.default.Post.findAll({
    include: [{
      model: _models.default.User,
      as: "owner",
      attributes: ["firstName", "lastName", "id"]
    }],
    order: [["createdAt", "DESC"]]
  });

  //   const paginationMeta = paginate(currentPage, count, rows, pageLimit);
  return successStat(res, 200, "data", {
    posts
  });
};
exports.getAllPost = getAllPost;
const deletePost = async (req, res) => {
  const {
    postId
  } = req?.body?.validated;
  const isExist = await _models.default.Post.findOne({
    where: {
      id: postId
    }
  });
  if (!isExist) {
    return errorStat(res, 404, "The post does not exists");
  }
  if (isExist?.ownerId !== req?.userInfo?.id) return errorStat(res, 403, "Unauthorized to perform action");
  await _models.default.Post.destroy({
    where: {
      id: postId
    }
  });
  const posts = await _models.default.Post.findAll({
    include: [{
      model: _models.default.User,
      as: "owner",
      attributes: ["firstName", "lastName", "id"]
    }],
    order: [["createdAt", "DESC"]]
  });
  return successStat(res, 200, "data", {
    posts
  });
};
exports.deletePost = deletePost;