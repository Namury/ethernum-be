import { getVipRankService } from "$services/vipRankServices";
  import {
    response_bad_request,
    response_internal_server_error,
    response_success,
  } from "$utils/response.utils";
  import { Request, Response } from "express";
  
  export async function getVipRank(req: Request, res: Response): Promise<Response> {
    try {
      const { status, data, error } = await getVipRankService();
      if (status) {
        return response_success(res, data);
      } else {
        return response_bad_request(res, error);
      }
    } catch (err: unknown) {
      return response_internal_server_error(res, String(err));
    }
  }