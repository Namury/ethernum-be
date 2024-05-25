import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { response_unauthorized } from "$utils/response.utils";

export function checkJwt(req: Request, res: Response, next: NextFunction) {
  const authHeader = <string>req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  let jwtPayload;

  try {
    jwtPayload = (
      jwt.verify(token, process.env.JWT_SECRET_TOKEN?.toString() || "")
    );
    res.locals.jwtPayload = jwtPayload;
  } catch (err: unknown) {
    return response_unauthorized(res, <string>err);
  }

  next();
}

