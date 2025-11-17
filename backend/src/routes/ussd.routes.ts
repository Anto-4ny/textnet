import { Router } from "express";
import { handleUssd } from "../controllers/ussd.controller.js";

const router = Router();

router.post("/", handleUssd);

export default router;
