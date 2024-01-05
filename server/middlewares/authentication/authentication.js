import models from "../../database/models";
import helpers from "../../helpers";

const { errorStat, verifyToken } = helpers;

export const authentication = async (req, res, next) => {
  try {
    const rawToken =
      req.headers.authorization ||
      req.headers["x-access-token"] ||
      req.query.slt;
    if (!rawToken) return errorStat(res, 401, "Access denied");
    const token = rawToken.split(" ")[1];
    const tokenObject = await verifyToken(token);

    const user = await models.User.findOne({
      where: { email: tokenObject.email }
    });
    req.userInfo = user;
    req.userInfoToken = token;
    next();
  } catch (error) {
    return errorStat(res, 400, "Invalid token");
  }
};
