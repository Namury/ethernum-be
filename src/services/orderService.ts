import { prisma } from "$utils/prisma.utils";
import { response } from "$utils/response.utils";
import { CreateOrderRequest, GetOrderByUserRequest } from "$utils/order.utils";

export async function createOrderService(
  order: CreateOrderRequest
): Promise<response> {
  try {
    let amountMultiplier = 1;

    //check current top up event
    const today = new Date();

    const findTopUpEvent = await prisma.topUpEvent.findFirst({
      where: {
        AND: [
          { dateStart: { lte: today } },
          { dateEnd: { gte: today } }
        ]
      }
    })

    if (findTopUpEvent) {
      amountMultiplier = amountMultiplier + (findTopUpEvent.bonusPercent / 100) //add multiplier percentage
    }

    //check reffcode
    if (order.reffcode) {
      const findReffcode = await prisma.accounts.findFirst({
        where: {
          AND: {
            ReferralCode: order.reffcode,
            AccountName: { not: order.username }
          }
        },
        select: { AccountID: true }
      })

      if (findReffcode) {
        amountMultiplier = amountMultiplier + 0.05 // add 5% to amount multiplier
      }else {
        return {
          status: false,
          data: {},
          message: "Reffcode not Found",
          error: "Reffcode not Found",
        }
      }
    }

    // get user
    const user = await prisma.accounts.findUnique({
      where: { AccountName: order.username }
    })
    if (!user) {
      return {
        status: false,
        data: {},
        message: "User not Found",
        error: "User not Found",
      }
    }

    const multipliedAmount = order.amount * amountMultiplier
    const createdOrder = await prisma.duitkuOrders.create({
      data: {
        amount: multipliedAmount,
        email: order.email,
        order_id: order.order_id,
        reffcode: order.reffcode,
        status: "Payment Pending",
        username: user.AccountName,
        AccountID: user.AccountID,
      }
    });
    if(!createdOrder){
      return {
        status: false,
        data: {},
        message: "Failed Create Order",
        error: "Failed Create Order",
      }
    }

    return {
      status: true,
      data: { order: createdOrder },
      message: "Create Order Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Create Order Failed",
      error: String(err),
    };
  }
}

export async function getOrderByUserService(
  user: GetOrderByUserRequest
): Promise<response> {
  try {
    const orders = await prisma.duitkuOrders.findMany({
      where: {
        AccountID: user.AccountID
      }, include: {
        DuitkuPayment: true
      }
    });

    return {
      status: true,
      data: { order: orders },
      message: "Get Order by User ID Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Get Order by User ID Failed",
      error: String(err),
    };
  }
}