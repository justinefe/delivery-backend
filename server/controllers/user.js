// import Sequelize from 'sequelize';
import models from "../database/models";
import helpers from "../helpers";
import { generateToken } from "../helpers/auth";

// const userRepository = new dbRepository(models.User);
const { successStat, errorStat, comparePassword } = helpers;

/**
 * / @static
 * @description Allows a user to sign in
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} object containing user data and access Token
 * @memberof UserController
 */
export const login = async (req, res) => {
  const { email, password } = req.body.validated;
  const user = await models.User.findOne({ where: { email } });

  if (!user) return errorStat(res, 401, "Incorrect Login information");

  const matchPasswords = comparePassword(password, user.password);

  if (!matchPasswords) {
    return errorStat(res, 401, "Incorrect Login information");
  }
  const token = await generateToken(
    { id: user.id, email },
    { expiresIn: 60 * 15 }
  );
  //await req.session.login(user.role, { user: user.dataValues }, res);
  const message = "Login successful";

  return successStat(res, 200, "user", {
    ...user.userResponse(),
    token,
    message
  });
};

/**
 * / @static
 * @description Allows a user to sign up
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} object containing user data and access Token
 * @memberof UserController
 */
export const signup = async (req, res) => {
  const { email } = req.body.validated;
  const isExist = await models.User.findOne({ where: { email } });

  if (isExist) return errorStat(res, 409, "User Already Exist");

  const user = await models.User.create({
    role: "user",
    ...req.body.validated
  });

  const token = await generateToken(
    { id: user.id, email },
    { expiresIn: "24h" }
  );
  const message = "Registration is successful";

  return successStat(res, 201, "user", {
    ...user.userResponse(),
    token,
    message
  });
};

export const getUser = async (req, res) => {
  const message = "UserInfo is successful";
  return successStat(res, 200, "user", {
    ...req.userInfo.dataValues,
    token: req.userInfoToken.split(" ")[0],
    message
  });
};
