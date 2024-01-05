"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TEST_DATABASE_URL = exports.PORT = exports.NODE_ENV = exports.ENCRYPTION_SECRET = exports.DATABASE_URL = exports.CLOUDINARY_NAME = exports.CLOUDINARY_API_SECRET = exports.CLOUDINARY_API_KEY = exports.AWS_SECRET_ACCESS_KEY = exports.AWS_REGION = exports.AWS_BUCKET_NAME = exports.AWS_ACCESS_KEY_ID = exports.API_SECRET = exports.API_KEY = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const {
  PORT,
  NODE_ENV,
  DATABASE_URL,
  TEST_DATABASE_URL,
  API_SECRET,
  API_KEY,
  ENCRYPTION_SECRET,
  AWS_SECRET_ACCESS_KEY,
  AWS_ACCESS_KEY_ID,
  AWS_REGION,
  AWS_BUCKET_NAME,
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET
} = process.env;
exports.CLOUDINARY_API_SECRET = CLOUDINARY_API_SECRET;
exports.CLOUDINARY_API_KEY = CLOUDINARY_API_KEY;
exports.CLOUDINARY_NAME = CLOUDINARY_NAME;
exports.AWS_BUCKET_NAME = AWS_BUCKET_NAME;
exports.AWS_REGION = AWS_REGION;
exports.AWS_ACCESS_KEY_ID = AWS_ACCESS_KEY_ID;
exports.AWS_SECRET_ACCESS_KEY = AWS_SECRET_ACCESS_KEY;
exports.ENCRYPTION_SECRET = ENCRYPTION_SECRET;
exports.API_KEY = API_KEY;
exports.API_SECRET = API_SECRET;
exports.TEST_DATABASE_URL = TEST_DATABASE_URL;
exports.DATABASE_URL = DATABASE_URL;
exports.NODE_ENV = NODE_ENV;
exports.PORT = PORT;