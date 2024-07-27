import { response_bad_request, response_conflict } from "$utils/response.utils";
import { Request, NextFunction, Response } from "express";
import { CreateOrderRequest } from "$utils/order.utils";
import { prisma } from "$utils/prisma.utils";

export async function validateCreateOrderRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { amount, email, order_id, reffcode, username, }: CreateOrderRequest = req.body;

  if (!username) return response_bad_request(res, "username is required");
  if (!email) return response_bad_request(res, "email is required");
  // if (!reffcode) return response_bad_request(res, "reffcode is required");
  if (!order_id) return response_bad_request(res, "order_id is required");
  if (order_id) {
    // if (Number.isNaN(Number(order_id))) return response_bad_request(res, "order id must be a number");
    const checkOrderId = await prisma.orders.findUnique({
      where: {
        order_id: order_id
      }
    })

    if (checkOrderId) {
      return response_conflict(res, 'order ID already exist')
    }
  }
  if (!amount) return response_bad_request(res, "amount is required");
  next();
}
