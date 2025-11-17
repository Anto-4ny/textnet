import { Router } from "express";
import { mpesaCallback } from "../controllers/mpesa.controller.js";

const router = Router();

router.post("/callback", mpesaCallback);

export default router;
