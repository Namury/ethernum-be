import {
  response_internal_server_error,
  response_success,
  response_unauthorized,
} from "$utils/response.utils";
import { Request, Response } from "express";
import { createOrderService, getOrderByUserService } from "$services/orderService";
import { CreateOrderRequest, GetOrderByUserRequest } from "$utils/order.utils";

export async function createOrder(req: Request, res: Response) {
  try {
    const orderData: CreateOrderRequest = req.body

    const { status, data, error } = await createOrderService(orderData);
    if (status) {
      return response_success(res, data);
    } else {
      return response_unauthorized(res, error);
    }

  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function getOrderByUser(req: Request, res: Response) {
  try {
    const user_id = Number(req.params.user_id);

    const userData: GetOrderByUserRequest = { AccountID: user_id }

    const { status, data, error } = await getOrderByUserService(userData);
    if (status) {
      return response_success(res, data);
    } else {
      return response_unauthorized(res, error);
    }

  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}
