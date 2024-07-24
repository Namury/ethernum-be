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
      throw new Error("Failed create order")
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