import { prisma } from "$utils/prisma.utils";
import { response } from "$utils/response.utils";
import axios from "axios";
import { SHA256 } from "crypto-js";
import {
  createInvoiceRequest,
  duitkuCallbackRequest,
  duitkuConfig,
  duitkuInvoiceRequest,
  duitkuInvoiceResponse
} from "$utils/duitku.utils";
import { createOrderService } from "./orderService";

export async function createInvoiceService(
  invoice: createInvoiceRequest,
): Promise<response> {
  try {
    const timeStampJakarta = String(new Date().getTime())
    const duitkuSignature = String(SHA256(duitkuConfig.merchantCode + timeStampJakarta + duitkuConfig.apiKey))
    const duitkuCreateInvoiceHeader = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-duitku-signature': duitkuSignature,
      'x-duitku-timestamp': Number(timeStampJakarta),
      'x-duitku-merchantcode': duitkuConfig.merchantCode
    }

    const order = await createOrderService(invoice)
    if(!order.status){
      console.log(order)
      return {
        status: false,
        data: {},
        message: "error create order",
        error: String(order.error),
      };
    }

    const duitkuInvoiceRequest: duitkuInvoiceRequest = {
      email: invoice.email,
      merchantUserInfo: String(invoice.username),
      paymentAmount: Number(invoice.amount),
      productDetails: `Top Up ${invoice.username}`,
      callbackUrl: duitkuConfig.callbackUrl,
      merchantOrderId: String(invoice.order_id),
      returnUrl: duitkuConfig.returnUrl,
      customerDetail: {
        email: invoice.email,
        firstName: invoice.username
      }
    }

    const duitkuResponse = await axios.post(duitkuConfig.createInvoiceURL, duitkuInvoiceRequest, {
      headers: {
        ...duitkuCreateInvoiceHeader
      }
    })

    return {
      status: true,
      data: duitkuResponse.data,
      message: "create invoice Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "create invoice Failed",
      error: String(err),
    };
  }
}

export async function createCallbackService(
  callback: duitkuCallbackRequest
): Promise<response> {
  try {
    const createdPayment = await prisma.duitkuPayment.create({
      data: { ...callback }
    });

    if (callback.resultCode == "00"){
      const updateOrderStatus = await prisma.duitkuOrders.update({
        where: {
          order_id: callback.merchantOrderId
        }, data: {
          status: "Paid"
        }
      })
      if(!updateOrderStatus){
        return {
          status: false,
          data: {},
          message: "Duitku Callback Failed",
          error: "Error Update Order",
        }; 
      }

      const user = await prisma.accounts.findUnique({
        where: {AccountName: callback.merchantUserId}
      })
      if(!user){
        return {
          status: false,
          data: {},
          message: "Failed udpate vipranking: user not found",
          error: "Failed udpate vipranking: user not found",
        } 
      }

      interface vipRanksResponse {
        username: String
        point: Number
      }
      
      const currentVipRanks:vipRanksResponse = await prisma.$queryRaw`
        SELECT * FROM dnmembership.dbo.VIPRANK V WHERE V.username  == ${user.AccountName}
      `

      var updateVipRankings = 0
      if(!currentVipRanks){
        updateVipRankings = await prisma.$executeRaw`
        INSERT INTO dnmembership.dbo.VIPRANK (username, point) values (${user.AccountName}, ${callback.amount})
      `
      }else {
        updateVipRankings = await prisma.$executeRaw`
        UPDATE dnmembership.dbo.VIPRANK SET point=${currentVipRanks.point + callback.amount} WHERE username =${user.AccountName} 
      `
      }
  
      if(!updateVipRankings){
        return {
          status: false,
          data: {},
          message: "Failed udpate vipranking",
          error: "Failed udpate vipranking",
        }
      }
    }

    return {
      status: true,
      data: { createdPayment },
      message: "Duitku Callback Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Duitku Callback Failed",
      error: String(err),
    };
  }
}