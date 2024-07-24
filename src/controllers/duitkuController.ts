import {
  response_internal_server_error,
  response_success,
  response_unauthorized,
} from "$utils/response.utils";
import { Request, Response } from "express";
import { createCallbackService, createInvoiceService } from "$services/duitkuService";
import { createInvoiceRequest, duitkuCallbackRequest } from "$utils/duitku.utils";

export async function createInvoice(req: Request, res: Response) {
  try {
    const invoiceData: createInvoiceRequest = req.body

    const { status, data, error } = await createInvoiceService(invoiceData);
    if (status) {
      return response_success(res, data);
    } else {
      return response_unauthorized(res, error);
    }

  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function createCallback(req: Request, res: Response) {
  try {
    const callback: duitkuCallbackRequest = req.body
    console.log("CALLBACK BODY", req.body)
    const { status, data, error } = await createCallbackService(callback);
    if (status) {
      return response_success(res, data);
    } else {
      return response_unauthorized(res, error);
    }

  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}
