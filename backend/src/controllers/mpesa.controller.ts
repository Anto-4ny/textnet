import type { Request, Response } from "express";

export const mpesaCallback = (req: Request, res: Response) => {
  console.log("📥 M-Pesa Callback Received:", req.body);
  res.sendStatus(200);
};
