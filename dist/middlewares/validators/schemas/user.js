"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUpSchema = exports.loginSchema = void 0;
var _joi = _interopRequireDefault(require("@hapi/joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const signUpSchema = exports.signUpSchema = _joi.default.object().keys({
  firstName: _joi.default.string().regex(/^[a-zA-Z ,.'-]+$/).trim().required(),
  lastName: _joi.default.string().regex(/^[a-zA-Z ,.'-]+$/).trim().required(),
  email: _joi.default.string().email().required().lowercase().trim(),
  password: _joi.default.string().min(8).required()
});
const loginSchema = exports.loginSchema = _joi.default.object({
  email: _joi.default.string().trim().lowercase().required(),
  password: _joi.default.string().min(8).required()
});