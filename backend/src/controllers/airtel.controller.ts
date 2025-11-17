import type { Request, Response } from "express";

export const airtelCallback = (req: Request, res: Response) => {
  console.log("📥 Airtel Callback Received:", req.body);
  res.sendStatus(200);
};
