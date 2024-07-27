import { prisma } from "$utils/prisma.utils";
import { response } from "$utils/response.utils";

export async function getDashboardStatsService(): Promise<response> {
  try {
    const accountRegistered = await prisma.accounts.count()
    const onlinePlayers = await prisma.dNAuth.count({ where: { CertifyingStep: 2 } })
    const characterCreated = await prisma.characters.count()

    return {
      status: true,
      data: {
        accounts_registered: accountRegistered,
        online_players: onlinePlayers,
        character_created: characterCreated
      },
      message: "Get dashboard stats Success",
    }
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Get dashboard stats Failed",
      error: String(err),
    };
  }
}