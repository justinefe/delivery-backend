"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authentication = void 0;
var _models = _interopRequireDefault(require("../../database/models"));
var _helpers = _interopRequireDefault(require("../../helpers"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  errorStat,
  verifyToken
} = _helpers.default;
const authentication = async (req, res, next) => {
  try {
    const rawToken = req.headers.authorization || req.headers["x-access-token"] || req.query.slt;
    if (!rawToken) return errorStat(res, 401, "Access denied");
    const token = rawToken.split(" ")[1];
    const tokenObject = await verifyToken(token);
    const user = await _models.default.User.findOne({
      where: {
        email: tokenObject.email
      }
    });
    req.userInfo = user;
    req.userInfoToken = token;
    next();
  } catch (error) {
    return errorStat(res, 400, "Invalid token");
  }
};
exports.authentication = authentication;