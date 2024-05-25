import {
  authForgotPasswordService,
  authLoginService,
  authRegisterService,
  authResetPasswordService,
  authVerifyUserService,
} from "$services/authServices";
import {
  response_internal_server_error,
  response_success,
  response_unauthorized,
} from "$utils/response.utils";
import {
  ForgotPasswordRequest,
  RegisterRequest,
  ResetPasswordRequest,
  VerifyUserRequest
} from "$utils/auth.utils";
import { Request, Response } from "express";

export async function login(req: Request, res: Response): Promise<Response> {
  try {
    const { username, password, } = req.body;
    const { status, data, error } = await authLoginService(username, password);
    if (status) {
      return response_success(res, data);
    } else {
      return response_unauthorized(res, error);
    }
  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function register(req: Request, res: Response) {
  try {
    const userData: RegisterRequest = req.body

    const { status, data, error } = await authRegisterService(userData);
    if (status) {
      return response_success(res, data);
    } else {
      return response_unauthorized(res, error);
    }

  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function verifyUser(req: Request, res: Response) {
  try {
    const email = String(req.query.email);
    const verifyToken = String(req.query.verify_token);

    const userData: VerifyUserRequest = { email, verifyToken }

    const { status, data, error } = await authVerifyUserService(userData);
    if (status) {
      return response_success(res, data);
    } else {
      return response_unauthorized(res, error);
    }

  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function forgotPassword(req: Request, res: Response) {
  try {
    const userData: ForgotPasswordRequest = req.body

    const { status, data, error } = await authForgotPasswordService(userData);
    if (status) {
      return response_success(res, data);
    } else {
      return response_unauthorized(res, error);
    }

  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function resetPassword(req: Request, res: Response) {
  try {
    const userData: ResetPasswordRequest = req.body

    const { status, data, error } = await authResetPasswordService(userData);
    if (status) {
      return response_success(res, data);
    } else {
      return response_unauthorized(res, error);
    }

  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}
