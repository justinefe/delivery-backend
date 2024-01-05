"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
require("express-async-errors");
var _user = require("../../controllers/user");
var _middlewares = _interopRequireDefault(require("../../middlewares"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable no-return-assign */

const {
  validate,
  loginSchema,
  signUpSchema,
  authentication
} = _middlewares.default;
const userRoutes = (0, _express.default)();
userRoutes.post("/login", validate(loginSchema), _user.login);
userRoutes.post("/signup", validate(signUpSchema), _user.signup);
userRoutes.get("/", authentication, _user.getUser);
var _default = exports.default = userRoutes;