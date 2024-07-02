import { createInvoice, createCallback } from "$controllers/duitkuController";
// import { validateCreateInvoiceRequest, validateCreateCallbackRequest } from "$validations/duitkuValidation";
import express from "express";

const duitkuRoutes = express.Router();

duitkuRoutes.post("/invoice", createInvoice);
duitkuRoutes.post("/callback", createCallback);

export default duitkuRoutes;