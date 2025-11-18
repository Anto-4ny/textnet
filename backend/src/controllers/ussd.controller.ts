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
    let { agentNumber, amount } = newSession;

    // Validate required fields
    if (!agentNumber || !amount) {
      res.send("END Invalid session data. Please try again.");
      return;
    }

    // Normalize phone number for STK Push
    let normalizedPhone = phoneNumber.replace(/^(\+|00)/, "");
    if (!normalizedPhone.startsWith("254")) {
      normalizedPhone = "254" + normalizedPhone.slice(-9);
    }

    // Override PartyA for sandbox testing
    let partyA = normalizedPhone;
    if (process.env.MPESA_ENVIRONMENT === "sandbox") {
      partyA = "254794425552"; // Sandbox test number
    }

    try {
      await initiateStkPush(
        partyA,
        Number(amount),
        agentNumber
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
