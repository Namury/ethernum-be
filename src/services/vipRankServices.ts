import { prisma } from "$utils/prisma.utils";
import { response } from "$utils/response.utils";

export async function getVipRankService(): Promise<response> {
  try {
    const vipRanks = await prisma.vipRank.findMany();

    return {
      status: true,
      data: vipRanks,
      message: "Get Vip Ranks Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Get Vip Ranks Failed",
      error: String(err),
    };
  }
}
