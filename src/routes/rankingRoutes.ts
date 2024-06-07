import { 
    getVipRank,
    getGoldRank,
    getLikeRank,
    getPveRank,
    getPvpRank,
    getDonorRank,
} from "$controllers/rankingController";
import express from "express";

const rankingRoutes = express.Router();

rankingRoutes.get("/vip", getVipRank);
rankingRoutes.get("/gold", getGoldRank);
rankingRoutes.get("/likes", getLikeRank);
rankingRoutes.get("/pve", getPveRank);
rankingRoutes.get("/pvp", getPvpRank);
rankingRoutes.get("/donors", getDonorRank);

export default rankingRoutes;