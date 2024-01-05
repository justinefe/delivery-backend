import Joi from "@hapi/joi";

export const createPostSchema = Joi.object().keys({
  title: Joi.string().required(),
  desc: Joi.string().required()
});
export const deleteSchema = Joi.object().keys({
  postId: Joi.string()
    .uuid()
    .required()
});

export const updatePostSchema = Joi.object().keys({
  id: Joi.string()
    .uuid()
    .required(),
  title: Joi.string(),
  desc: Joi.string()
});
