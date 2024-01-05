"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comparePassword = comparePassword;
exports.hashPassword = hashPassword;
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * @static
 * @description Allows a user to sign up
 * @param {String} password - Password to be hashed
 * @returns {String} Encrypted password
 * @memberof Helper
 */
function hashPassword(password) {
  return _bcryptjs.default.hash(password, 6);
}

/**
 * @static
 * @description Allows a user to sign up
 * @param {String} password - Request object
 * @param {String} hashed - Response object
 * @returns {Boolean} Returns true if the password is correct
 * @memberof Helper
 */
function comparePassword(password, hashed) {
  return _bcryptjs.default.compare(password, hashed);
}