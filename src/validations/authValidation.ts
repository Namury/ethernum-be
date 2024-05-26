import { response_bad_request, response_conflict, response_not_found } from "$utils/response.utils";
import { Request, NextFunction, Response } from "express";
import { prisma } from "$utils/prisma.utils";
import { ForgotPasswordRequest, ResetPasswordRequest, VerifyUserRequest } from "$utils/auth.utils";

function validateEmail(email: string): boolean {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function validateLoginRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, password } = req.body;

  if (!username) return response_bad_request(res, "Username/Email is required");
  if (!password) return response_bad_request(res, "Password is required");
  next();
}

export async function validateRegisterRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, email, password } = req.body;

  if (!username) return response_bad_request(res, "Username is required");
  if (username) {
    const checkUsername = await prisma.accounts.findUnique({
      where: {
        AccountName: username
      }
    })

    if (checkUsername) {
      return response_conflict(res, 'Username already exist')
    }
  }
  if (email) {
    if (!validateEmail(email))
      return response_bad_request(res, "Email provided is not a correct form");

    // const splittedEmail = checkEmail.email.split("@")[0]
    // const splittedInputEmail = email.split("@")[0]
    // const filteredEmail = splittedEmail.replace(".", "")
    // const filteredInputEmail = email.replace(".", "")

    const regexSaltedEmail = /^.*\+\d.*$/
    if (regexSaltedEmail.test(email)) return response_bad_request(res, "Email contains illegal symbol");

    const checkEmail = await prisma.accounts.findUnique({
      where: {
        email
      }, select: { email: true }
    })

    if (checkEmail) {
      return response_conflict(res, 'Email already exist')
    }
  }
  if (!password) return response_bad_request(res, "Password is required");
  next();
}

export function validateVerifyUserRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const email = String(req.query.email);
  const verifyToken = String(req.query.verify_token);
  
  const userData: VerifyUserRequest = { email, verifyToken }

  if (!userData.email) return response_bad_request(res, "Email is required");
  if (!userData.verifyToken) return response_bad_request(res, "Verify Token is required");
  next();
}

export function validateForgotPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email }: ForgotPasswordRequest = req.body;

  if (!email) return response_bad_request(res, "Email is required");
  next();
}

export function validateResetPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password, resetToken }: ResetPasswordRequest = req.body;

  if (!email) return response_bad_request(res, "Email is required");
  if (!password) return response_bad_request(res, "Password is required");
  if (!resetToken) return response_bad_request(res, "Reset Token is required");
  next();
}