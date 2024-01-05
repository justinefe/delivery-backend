// import Sequelize from 'sequelize';
import models from "../database/models";
import helpers from "../helpers";

const { successStat, errorStat } = helpers;

/**
 * / @static
 * @description Allows an admin to create a Audio
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} object the newly created audio
 * @memberof audioController
 */
export const createPost = async (req, res) => {
  const { title } = req?.body?.validated;

  const isExist = await models.Post.findOne({ where: { title } });

  if (isExist) {
    return errorStat(res, 409, "A post with this title already exists");
  }

  await models.Post.create({
    ...req.body.validated,
    ownerId: req?.userInfo?.id
  });
  const posts = await models.Post.findAll({
    include: [
      {
        model: models.User,
        as: "owner",
        attributes: ["firstName", "lastName", "id"]
      }
    ],
    order: [["createdAt", "DESC"]]
  });
  return successStat(res, 201, "data", { posts });
};

export const editPost = async (req, res) => {
  const { id, title, desc } = req?.body?.validated;
  const isExist = await models.Post.findOne({ where: { id } });
  if (!isExist) {
    return errorStat(res, 404, "The post does not exists");
  }
  if (isExist?.ownerId !== req?.userInfo?.id)
    return errorStat(res, 403, "Unauthorized to perform action");
  await models.Post.update(
    { title, desc },
    {
      where: {
        id
      }
    }
  );
  const posts = await models.Post.findAll({
    include: [
      {
        model: models.User,
        as: "owner",
        attributes: ["firstName", "lastName", "id"]
      }
    ],
    order: [["createdAt", "DESC"]]
  });
  return successStat(res, 201, "data", { posts });
};

export const getAllPost = async (req, res) => {
  const posts = await models.Post.findAll({
    include: [
      {
        model: models.User,
        as: "owner",
        attributes: ["firstName", "lastName", "id"]
      }
    ],
    order: [["createdAt", "DESC"]]
  });

  //   const paginationMeta = paginate(currentPage, count, rows, pageLimit);
  return successStat(res, 200, "data", {
    posts
  });
};

export const deletePost = async (req, res) => {
  const { postId } = req?.body?.validated;

  const isExist = await models.Post.findOne({ where: { id: postId } });

  if (!isExist) {
    return errorStat(res, 404, "The post does not exists");
  }
  if (isExist?.ownerId !== req?.userInfo?.id)
    return errorStat(res, 403, "Unauthorized to perform action");
  await models.Post.destroy({
    where: { id: postId }
  });
  const posts = await models.Post.findAll({
    include: [
      {
        model: models.User,
        as: "owner",
        attributes: ["firstName", "lastName", "id"]
      }
    ],
    order: [["createdAt", "DESC"]]
  });
  return successStat(res, 200, "data", { posts });
};
