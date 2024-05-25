import { prisma } from "$utils/prisma.utils";
import md5 from "md5";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { response } from "$utils/response.utils";
import { emailRegex, ForgotPasswordRequest, LoginResponse, RegisterRequest, ResetPasswordRequest, UserToken, VerifyUserRequest } from "$utils/auth.utils";
import { sendMail } from "$utils/mail.utils";
import { emailResetPassword, emailVerify } from "$utils/mailTemplate.utils";

function createToken(user: UserToken) {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email
    },
    process.env.JWT_SECRET_TOKEN?.toString() || "",
    {
      expiresIn: "24h",
    }
  );
  return token;
}

export async function authLoginService(
  username: string,
  password: string
): Promise<response> {
  try {
    let condition: object;
    condition = { AccountName: username };
    if (emailRegex.test(username)) {
      condition = { email: username };
    }

    const user = await prisma.accounts.findUnique({
      where: condition
    });

    if (!user) throw new Error("Username/Password Salah");

    if (!user.EmailVerified) throw new Error("User is not verified");

    if (user && (md5(password) === user.QQ3462895993)) {
      const token = createToken({
        email: user.email,
        id: user.AccountID,
        username: user.AccountName,
      });
      const userDetails: LoginResponse = {
        token: token,
        name: user.name,
        email: user.email,
        username: user.AccountName
      };

      return {
        status: true,
        message: "Login Success",
        data: userDetails,
      };
    } else {
      throw new Error("Username/Password Salah");
    }
  } catch (err: unknown) {
    return {
      status: false,
      message: "Login Failed",
      data: {},
      error: String(err),
    };
  }
}

export async function authRegisterService(
  user: RegisterRequest
): Promise<response> {
  try {
    const selectedUserField = {
      AccountId: true,
      email: true,
      name: true,
      AccountName: true
    };
    user.password = md5(user.password);

    const verificationToken = Math.random().toString(16).substring(0, 16)
    const createdUser = await prisma.accounts.create({
      data: {
        email: user.email,
        name: user.username,
        AccountName: user.username,
        QQ3462895993: user.password,
        VerificationToken: verificationToken,
        VerificationTokenExpiresAt: new Date(new Date().setDate(new Date().getDate() + 3)) // 3days

      },
      select: selectedUserField,
    });

    const verifyUrl = `${process.env.BASE_URL?.toString()}auth/verify?email=${createdUser.email}&verify_token=${verificationToken}`
    const html = emailVerify(verifyUrl)
    const subject = 'Email Verification'
    await sendMail(html, createdUser.email, subject);

    return {
      status: true,
      data: { user: createdUser },
      message: "Register Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Register Failed",
      error: String(err),
    };
  }
}

export async function authVerifyUserService(
  verifyRequest: VerifyUserRequest
): Promise<response> {
  try {
    const selectedUserField = {
      AccountId: true,
      email: true,
      name: true,
      AccountName: true
    };

    const user = await prisma.accounts.findUnique({
      where: { email: verifyRequest.email }
    })

    if (!user) {
      throw new Error("User not found");
    }
    const updatedUser = await prisma.accounts.update({
      where: {
        AccountID: user.AccountID
      },
      data: {
        EmailVerified: true
      },
      select: selectedUserField,
    });

    const token = createToken({
      email: updatedUser.email,
      id: updatedUser.AccountId,
      username: updatedUser.AccountName,
    });

    return {
      status: true,
      data: { user: updatedUser, token },
      message: "Verify User Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Verify User Failed",
      error: String(err),
    };
  }
}

export async function authForgotPasswordService(
  forgotPasswordRequest: ForgotPasswordRequest
) {
  try {
    const user = await prisma.accounts.findUnique({
      where: { email: forgotPasswordRequest.email }
    })

    if (!user) {
      throw new Error("User not found");
    }

    const resetToken = Math.random().toString(16).substring(0, 16)
    const updatedUser = await prisma.accounts.update({
      where: {
        AccountID: user.AccountID
      },
      data: {
        PasswordResetRequestedAt: new Date(),
        PasswordResetRequested: 1,
        ResetToken: resetToken,
        ResetTokenExpiresAt: new Date(new Date().setDate(new Date().getDate() + 1)) //tomorrow
      }
    });

    const verifyUrl = `${process.env.BASE_URL_FE?.toString()}forgot?reset_token=${resetToken}`
    const html = emailResetPassword(verifyUrl)
    const subject = 'Reset Password Notification'
    await sendMail(html, updatedUser.email, subject);


    return {
      status: true,
      data: {},
      message: "Forgot Password User Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Forgot Password User Failed",
      error: String(err),
    };
  }
}

export async function authResetPasswordService(
  resetPasswordRequest: ResetPasswordRequest
) {
  try {
    const selectedUserField = {
      AccountId: true,
      email: true,
      name: true,
      AccountName: true
    };


    const user = await prisma.accounts.findUnique({
      where: { email: resetPasswordRequest.email }
    })

    if (!user) {
      throw new Error("User not found");
    }

    if (user.ResetToken != resetPasswordRequest.resetToken) {
      throw new Error("Invalid Reset Token")
    }

    const updatedUser = await prisma.accounts.update({
      where: {
        AccountID: user.AccountID
      },
      data: {
        QQ3462895993: md5(resetPasswordRequest.password)
      },
      select: selectedUserField,
    });

    const token = createToken({
      email: updatedUser.email,
      id: user.AccountID,
      username: updatedUser.AccountName,
    });

    return {
      status: true,
      data: { user: updatedUser, token },
      message: "Reset User Password Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Reset User Password Failed",
      error: String(err),
    };
  }
}