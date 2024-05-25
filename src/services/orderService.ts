import { prisma } from "$utils/prisma.utils";
import { response } from "$utils/response.utils";
import { CreateOrderRequest, GetOrderByUserRequest } from "$utils/order.utils";

export async function createOrderService(
  order: CreateOrderRequest
): Promise<response> {
  try {
    const createdOrder = await prisma.orders.create({
      data: { ...order }
    });

    return {
      status: true,
      data: { order: createdOrder },
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

export async function getOrderByUserService(
  user: GetOrderByUserRequest
): Promise<response> {
  try {
    const orders = await prisma.orders.findMany({
      where: {
        AccountID: user.AccountID
      }
    });

    return {
      status: true,
      data: { order: orders },
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