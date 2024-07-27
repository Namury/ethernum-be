import {
  response_internal_server_error,
  response_success,
  response_bad_request
} from "$utils/response.utils";
import { Request, Response } from "express";
import { getDashboardStatsService } from "$services/dashboardService";

export async function getDashboardStats(req: Request, res: Response) {
  try {
    const { status, data, error } = await getDashboardStatsService();
    if (status) {
      return response_success(res, data);
    } else {
      return response_bad_request(res, error);
    }

  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}
