"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressFormData = _interopRequireDefault(require("express-form-data"));
var _process = _interopRequireDefault(require("process"));
require("express-async-errors");
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _debug = _interopRequireDefault(require("debug"));
var _morgan = _interopRequireDefault(require("morgan"));
var _chalk = _interopRequireDefault(require("chalk"));
var _cors = _interopRequireDefault(require("cors"));
var _os = _interopRequireDefault(require("os"));
var _dotenv = require("dotenv");
var _v = _interopRequireDefault(require("./routes/v1"));
var _models = _interopRequireDefault(require("./database/models"));
var _http = _interopRequireDefault(require("http"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _dotenv.config)();
const log = (0, _debug.default)("dev");
const {
  PORT
} = _process.default.env;
const port = PORT || 4000;
const server = (0, _express.default)();
try {
  const options = {
    uploadDir: _os.default.tmpdir(),
    autoClean: true
  };
  server.use(_expressFormData.default.parse(options));
  server.use(_expressFormData.default.format());
  server.use(_expressFormData.default.stream());
  server.use(_expressFormData.default.union());
  server.use(_express.default.urlencoded({
    extended: true
  }));
  const whitelist = _process.default.env.whiteList.split(",");
  const corsOptions = {
    origin(origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    allowedHeaders: ["Access-Control-Allow-Origin", "Access-Control-Allow-Headers", "Content-Type"]
  };
  server.use((0, _cors.default)({}));
  server.use((0, _morgan.default)("dev"));
  server.use(_express.default.json({
    limit: "50mb"
  }));
  server.use(_express.default.urlencoded({
    extended: true
  }));
  server.get("/api/v1", (req, res) => res.status(200).json({
    message: "Welcome to audio-series"
  }));

  // Routes(app);
  server.use("/api/v1", _v.default);

  //server.get('*', (req, res) => handle(req, res));

  // Finally, check db connection then start the server...
  const {
    sequelize
  } = _models.default;
  sequelize.authenticate().then(() => {
    log("Sequelize connection was successful");
  }).catch(err => {
    log(_chalk.default.yellow(err.message));
  });
  sequelize.sync();
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready =>`, port);
  });
} catch (err) {
  console.error(err.stack);
  _process.default.exit(1);
}
const app = _http.default.createServer(server);
var _default = exports.default = app;