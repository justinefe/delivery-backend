"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLoggedIn = void 0;
var _helpers = _interopRequireDefault(require("../helpers"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  errorStat
} = _helpers.default;

/**
 * @description The isLogged in middleware
 * @param {Object} req - the req object
 *  @param {function} res - the res object
 * @returns {Object} verified token
 * @memberof Auth
 */
const isLoggedIn = async (req, res) => {
  try {
    await req.session.isLoggedIn(req, res);
  } catch (err) {
    return errorStat(res, 401, err.message);
  }
};
exports.isLoggedIn = isLoggedIn;