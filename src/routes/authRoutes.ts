import {
  login,
  register,
  forgotPassword,
  resetPassword,
  verifyUser,
  checkJwtToken
} from "$controllers/authController";
import express from "express";
import {
  validateForgotPassword,
  validateLoginRequest,
  validateRegisterRequest,
  validateResetPassword,
  validateVerifyUserRequest,
} from "$validations/authValidation";
import { checkJwt } from "$middlewares/authMiddleware";

const authRoutes = express.Router();

authRoutes.get("/verify", validateVerifyUserRequest, verifyUser);
authRoutes.get("/check-token", checkJwt, checkJwtToken);
authRoutes.post("/login", validateLoginRequest, login);
authRoutes.post(
  "/register",
  validateRegisterRequest,
  register
);
authRoutes.post("/forgot-password", validateForgotPassword, forgotPassword);
authRoutes.post("/reset-password", validateResetPassword, resetPassword);

export default authRoutes;
