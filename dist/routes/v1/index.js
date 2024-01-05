"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
require("express-async-errors");
var _user = _interopRequireDefault(require("./user"));
var _post = _interopRequireDefault(require("./post"));
var _helpers = _interopRequireDefault(require("../../helpers"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  errorStat,
  successStat
} = _helpers.default;
const router = _express.default.Router();
router.get("/logout", async (req, res) => {
  await req.session.logout(res);
  successStat(res, 200, "message", "successfully logout");
});
router.get("/logged-in", async (req, res) => {
  try {
    await req.session.isLoggedIn(req, res);
  } catch (err) {
    return errorStat(res, 401, err.message);
  }
  successStat(res, 200, "message", "logged in");
});
router.use("/user", _user.default);
router.use("/post", _post.default);
var _default = exports.default = router;