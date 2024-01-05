/* eslint-disable no-return-assign */
import express from "express";
import "express-async-errors";
import { login, signup, getUser } from "../../controllers/user";
import middlewares from "../../middlewares";

const { validate, loginSchema, signUpSchema, authentication } = middlewares;

const userRoutes = express();

userRoutes.post("/login", validate(loginSchema), login);
userRoutes.post("/signup", validate(signUpSchema), signup);
userRoutes.get("/", authentication, getUser);

export default userRoutes;
