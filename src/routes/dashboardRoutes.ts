import { getDashboardStats } from "$controllers/dashboardController";
// import { validateCreateInvoiceRequest, validateCreateCallbackRequest } from "$validations/duitkuValidation";
import express from "express";

const dashboardRoutes = express.Router();

dashboardRoutes.get("/stats", getDashboardStats);

export default dashboardRoutes;