import { Request, Response } from "express";
import { handleUssdMenu } from "../services/ussd.service.js";
import { initiateStkPush } from "../services/mpesa.service.js";

const sessionStore: { [key: string]: any } = {};

export const handleUssd = async (req: Request, res: Response) => {
  const { sessionId, phoneNumber, text } = req.body;

  const session = sessionStore[sessionId] || { stage: "" };

  const { response, session: newSession } = handleUssdMenu(text, session);

  // Check if ready to process payment
  if (newSession.stage === "process") {
    const { agentNumber, amount } = newSession;

    // Ensure safe values
    if (!agentNumber || !amount) {
      res.send("END Invalid session data. Please try again.");
      return;
    }

    try {
      await initiateStkPush(
        phoneNumber,
        Number(amount),     // FIX: convert to number
        agentNumber         // FIX: guaranteed string
      );

      res.send("END Please check your phone to complete M-Pesa payment.");
      return;
    } catch (error: any) {
  console.error("STK Push Error:", error.response?.data || error.message);
  res.send("END Failed to initiate payment. Try again later.");
  return;
}
  }

  // Save session
  sessionStore[sessionId] = newSession;

  res.set("Content-Type", "text/plain");
  res.send(response);
};