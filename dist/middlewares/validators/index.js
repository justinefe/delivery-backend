"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _helpers = _interopRequireDefault(require("../../helpers"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  validateJoi
} = _helpers.default;

/**
 * @method validateUser
 * @description Validates user details on login
 * @param {object} schema - The Request Object
 *@param {function} cb - Optional object for transformation
 * @param {object} req - The Request Object
 * @param {object} res - The Response Object
 * @param {function} next - The next function to point to the next middleware
 * @returns {function} validate() - An execucted validate function
 */
var _default = (schema, cb = () => {}) => (req, res, next) => {
  cb(req);
  return validateJoi({
    ...req.body,
    ...req.query,
    ...req.params
  }, schema, req, res, next);
};
exports.default = _default;