"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkInvitation = void 0;
var _Utilities = require("../helpers/Utilities");
const checkInvitation = async (req, res, next) => {
  const {
    inviteToken
  } = req.body;
  if (inviteToken) {
    try {
      const raw = (0, _Utilities.decrypt)(inviteToken);
      const decryptedData = JSON.parse((0, _Utilities.decrypt)(inviteToken));
      if (!raw || !decryptedData || !decryptedData.activationCode) {
        return (0, _Utilities.errorStat)(res, 400, 'Operation Failed. InvalidToken');
      }
      req.decryptedData = decryptedData;
    } catch (error) {
      return (0, _Utilities.errorStat)(res, 400, 'Operation Failed. InvalidToken');
    }
  }
  next();
};
exports.checkInvitation = checkInvitation;