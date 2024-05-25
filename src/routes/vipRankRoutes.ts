import { getVipRank } from "$controllers/vipRankController";
import express from "express";

const vipRankRoutes = express.Router();

vipRankRoutes.get("/", getVipRank);

export default vipRankRoutes;