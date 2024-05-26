import { response_bad_request } from "$utils/response.utils";
import { Request, NextFunction, Response } from "express";
import { CreateOrderRequest } from "$utils/order.utils";

export function validateCreateOrderRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { AccountID, amount, email, order_id, reffcode, status, username, }: CreateOrderRequest = req.body;

  if (!username) return response_bad_request(res, "username is required");
  if (!email) return response_bad_request(res, "email is required");
  // if (!reffcode) return response_bad_request(res, "reffcode is required");
  if (!order_id) return response_bad_request(res, "order_id is required");
  if (!amount) return response_bad_request(res, "amount is required");
  if (!status) return response_bad_request(res, "status is required");
  if (!AccountID) return response_bad_request(res, "AccountID is required");
  next();
}
