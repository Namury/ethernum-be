import { parseBigIntJson } from "$utils/common.utils";
import { prisma } from "$utils/prisma.utils";
import { response } from "$utils/response.utils";

export async function getVipRankService(): Promise<response> {
  try {
    interface vipRanksResponse {
      username: String
      point: Number
    }
    
    const vipRanks:vipRanksResponse = await prisma.$queryRaw`
      SELECT * FROM dnmembership.dbo.VIPRANK ORDER BY point DESC
    `
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

export async function getGoldRankService(): Promise<response> {
  try {
    interface goldRanksResponse {
      CharacterName: String,
      Coin: Number,
      WarehouseCoin: Number,
      TotalCoin: Number
    }

    const goldRanks: goldRanksResponse[] =
      await prisma.$queryRaw`
        SELECT C.CharacterName, CS.Coin, CS.WarehouseCoin
        FROM DNWorld.dbo.CharacterStatus CS
        JOIN DNWorld.dbo.Characters C ON CS.CharacterID = C.CharacterID
        WHERE C.AccountLevelCode  != 99
        ORDER BY CS.Coin DESC, CS.WarehouseCoin DESC
      `;

    const goldRanksJson: goldRanksResponse[] = parseBigIntJson(goldRanks);

    const processedGoldRanking = goldRanksJson.map(goldRank => {
      const totalCoin = Number(goldRank.Coin)+Number(goldRank.WarehouseCoin)
      if(totalCoin > 250000){
        goldRank.TotalCoin =totalCoin
        return goldRank
      }
    }).filter(x => x !== undefined).sort((a,b)=> Number(b?.TotalCoin) - Number(a?.TotalCoin))

    return {
      status: true,
      data: {
        ranking: processedGoldRanking, 
        totalGoldCirulation: processedGoldRanking.map(i=>Number(i?.TotalCoin)).reduce((a,b)=>a+b)
      },
      message: "Get Gold Ranks Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Get Gold Ranks Failed",
      error: String(err),
    };
  }
}

export async function getLikeRankService(): Promise<response> {
  try {
    interface likeRanksResponse {
      CharacterName: String
      LikeCount: Number
    }
    const likeRanks: likeRanksResponse = await prisma.$queryRaw`
      SELECT TOP 100 C.CharacterName, CS.LikeCount
      FROM DNWorld.dbo.CharacterStatus CS
      JOIN DNWorld.dbo.Characters C ON CS.CharacterID = C.CharacterID
      WHERE C.AccountLevelCode != 99 AND CS.LikeCount >= 100
      ORDER BY CS.LikeCount DESC
    `;

    return {
      status: true,
      data: likeRanks,
      message: "Get Like Ranks Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Get Like Ranks Failed",
      error: String(err),
    };
  }
}

export async function getPveRankService(mapId: Number | null): Promise<response> {
  try {
    interface pveRanksResponse {
      TotalRank: Number
      CharacterName: String
      GuildName: String
      DifficultyStep: Number
      ClearTime: Date
    }

    let pveRanks: pveRanksResponse
    if (mapId === null) {
      pveRanks = await prisma.$queryRaw`
        SELECT TotalRank, CharacterName, GuildName, (DifficultyStep-DifficultyCode) as DifficultyStep, ClearTime 
        FROM DNWorld.dbo.PVERanking 
      `;
    } else {
      pveRanks = await prisma.$queryRaw`
        SELECT TotalRank, CharacterName, GuildName, (DifficultyStep-DifficultyCode) as DifficultyStep, ClearTime 
        FROM DNWorld.dbo.PVERanking.MapID P
        WHERE P.MapID = ${mapId}
      `
    }

    return {
      status: true,
      data: pveRanks,
      message: "Get PVE Ranks Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Get PVE Ranks Failed",
      error: String(err),
    };
  }
}

export async function getPvpRankService(): Promise<response> {
  try {
    interface pvpRanksResponse {
      CharacterName: String
      GuildName: String
      PVPExp: Number
      Kill: Number
      Death: Number
    }

    const pvpRanks: pvpRanksResponse = await prisma.$queryRaw`
      SELECT CharacterName, GuildName, PVPExp, [Kill], Death
      FROM DNWorld.dbo.PVPRanking
      ORDER BY PVPExp DESC, [Kill] DESC, Death ASC
      OFFSET 0 ROWS FETCH NEXT 100 ROWS ONLY
    `;

    return {
      status: true,
      data: pvpRanks,
      message: "Get PVP Ranks Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Get PVP Ranks Failed",
      error: String(err),
    };
  }
}

export async function getDonorRankService(): Promise<response> {
  try {
    interface donorRanksResponse {
      DonorName: String,
      TotalAmount: Number
    }
    const donorRanks: donorRanksResponse = await prisma.$queryRaw`
      SELECT DonorName, SUM(CAST(REPLACE(DonationAmount, '$', '') AS DECIMAL(10,2))) AS TotalAmount
      FROM Donors
      GROUP BY DonorName
      ORDER BY TotalAmount DESC
    `;
    return {
      status: true,
      data: donorRanks,
      message: "Get Donor Ranks Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Get Donor Ranks Failed",
      error: String(err),
    };
  }
}






