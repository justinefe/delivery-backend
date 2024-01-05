import validate from "./validators";
import { loginSchema, signUpSchema } from "./validators/schemas/user";

import {
  createPostSchema,
  updatePostSchema,
  deleteSchema
} from "./validators/schemas/post";
import { authentication } from "./authentication/authentication";

export default {
  validate,
  loginSchema,
  signUpSchema,
  deleteSchema,
  createPostSchema,
  updatePostSchema,
  authentication
};
