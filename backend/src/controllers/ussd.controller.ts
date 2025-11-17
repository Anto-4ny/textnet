import type{ Request, Response } from "express";

export const handleUssd = (req: Request, res: Response) => {
  res.send("CON Welcome to our Float System");
};
