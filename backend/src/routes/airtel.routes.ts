import { Router } from "express";
import { airtelCallback } from "../controllers/airtel.controller.js";

const router = Router();

router.post("/callback", airtelCallback);

export default router;
