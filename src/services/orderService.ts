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
        where: { ReferralCode: order.reffcode },
        select: { AccountID: true }
      })

      if (findReffcode) {
        amountMultiplier = amountMultiplier + 0.05 // add 5% to amount multiplier
      }
    }

    // get user
    const user = await prisma.accounts.findUnique({
      where: {AccountName: order.username}
    })
    if(!user){
      return{
        status: false,
        data: {},
        message: "User not Found",
        error: "User not Found",
      }
    }

    order.amount = order.amount * amountMultiplier
    const createdOrder = await prisma.orders.create({
      data: { 
        amount: order.amount,
        email: order.email,
        order_id: order.order_id,
        reffcode: order.reffcode,
        status: order.status,
        username: user.AccountName,
        AccountID: user.AccountID,
       }
    });

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
    const orders = await prisma.orders.findMany({
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