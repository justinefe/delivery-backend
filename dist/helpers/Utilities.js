"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorStat = errorStat;
exports.successStat = successStat;
exports.validateJoi = validateJoi;
/**
 * @Module UserController
 * @description Controlls all the user based activity
 */
/**
 * @static
 * @description Returns message based on the status
 * @param {Object} res - Response object
 * @param {Number} status - Appropraite error status
 * @param {String} error - The appropriate error message
 * @returns {Object} res object to report approprate error
 * @memberof Utilites
 */
function errorStat(res, status, error) {
  return res.status(status).json({
    status,
    error
  });
}

/**
 * @static
 * @description Returns message based on the status
 * @param {Object} res - Response object
 * @param {integer} status - status code to be sent
 * @param {String} key - the output data key
 * @param {Object} value - the output data values
 * @returns {Object} res object to report the appropraite message
 * @memberof Utilities
 */
function successStat(res, status, key, value) {
  return res.status(status).json({
    status,
    [key]: value
  });
}

/**
 * @static
 * @description Returns message based on the status
 * @param {Object} res - Response object
 * @param {Object} req - Request object
 * @param {Object} object - object to be validated
 * @param {Object} schema - The schema object
 * @param {Functon} next - The next function
 * @returns {Object} res object to report the appropraite message
 * @memberof Utilities
 */

function validateJoi(object, schema, req, res, next) {
  const {
    error,
    value
  } = schema.validate(object, {
    abortEarly: false
  });
  if (error) {
    return errorStat(res, 400, error.details.map(detail => {
      const message = detail.message.replace(/"/gi, "");
      return message;
    }));
  }
  req.body.validated = value;
  return next();
}