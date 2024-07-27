import { response_not_found } from "$utils/response.utils";
import { Express, Request, Response } from "express";
import authRoutes from "./authRoutes";
import rankingRoutes from "./rankingRoutes";
import orderRoutes from "./orderRoutes";
import duitkuRoutes from "./duitkuRoutes";
import dashboardRoutes from "./dashboardRoutes";

export default function routes(app: Express) {
  app.use("/auth", authRoutes);
  app.use("/ranks", rankingRoutes);
  app.use("/order", orderRoutes);
  app.use("/duitku", duitkuRoutes);
  app.use("/dashboard", dashboardRoutes);
  app.all("*", (req: Request, res: Response) => {
    return response_not_found(res);
  });
}
