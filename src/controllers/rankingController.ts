import {
  getVipRankService,
  getGoldRankService,
  getLikeRankService,
  getPveRankService,
  getPvpRankService,
  getDonorRankService,
} from "$services/rankingServices";
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

export async function getGoldRank(req: Request, res: Response): Promise<Response> {
  try {
    const { status, data, error } = await getGoldRankService();
    if (status) {
      return response_success(res, data);
    } else {
      return response_bad_request(res, error);
    }
  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function getLikeRank(req: Request, res: Response): Promise<Response> {
  try {
    const { status, data, error } = await getLikeRankService();
    if (status) {
      return response_success(res, data);
    } else {
      return response_bad_request(res, error);
    }
  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function getPveRank(req: Request, res: Response): Promise<Response> {
  try {
    const mapId = req.query.mapId ? Number(req.query.mapId): null
    const { status, data, error } = await getPveRankService(mapId);
    if (status) {
      return response_success(res, data);
    } else {
      return response_bad_request(res, error);
    }
  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function getPvpRank(req: Request, res: Response): Promise<Response> {
  try {
    const { status, data, error } = await getPvpRankService();
    if (status) {
      return response_success(res, data);
    } else {
      return response_bad_request(res, error);
    }
  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function getDonorRank(req: Request, res: Response): Promise<Response> {
  try {
    const { status, data, error } = await getDonorRankService();
    if (status) {
      return response_success(res, data);
    } else {
      return response_bad_request(res, error);
    }
  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}





