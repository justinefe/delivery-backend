"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = require("dotenv");
var _Utilities = require("./Utilities");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _dotenv.config)();
const secret = process.env.APP_SECRET;

/**
 * @description Generates a jwt token
 * @param {Object} payload - Details to encode in the token
 * @returns {string} Generated token
 * @memberof Auth
 */
async function generateToken(payload, expires) {
  const token = _jsonwebtoken.default.sign(payload, secret, expires);
  return token;
}

/**
 * @description Verify a jwt token
 * @param {Object} token - Token to be verified
 *  @param {function} callBack - call back method to jwt
 * @returns {Object} verified token
 * @memberof Auth
 */
async function verifyToken(token, callBack) {
  return _jsonwebtoken.default.verify(token, secret, callBack);
}