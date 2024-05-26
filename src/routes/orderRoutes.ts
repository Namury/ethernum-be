import { createOrder, getOrderByUser } from "$controllers/orderController";
import { validateCreateOrderRequest } from "$validations/orderValidation";
import express from "express";

const orderRoutes = express.Router();

orderRoutes.get("/:user_id", getOrderByUser);
orderRoutes.post("/", validateCreateOrderRequest, createOrder);

export default orderRoutes;