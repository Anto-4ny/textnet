import { Request, Response } from "express";
import { sendAirtelFloat } from "../services/airtel.service.js";
import { saveTransaction } from "../services/transaction.service.js";

export const mpesaCallback = async (req: Request, res: Response) => {
  const data = req.body;
  console.log("📥 M-Pesa Callback Received:", data);

  try {
    // Extract relevant info
    const amount = data.Body.stkCallback.CallbackMetadata.Item.find((i: any) => i.Name === "Amount").Value;
    const phone = data.Body.stkCallback.CallbackMetadata.Item.find((i: any) => i.Name === "PhoneNumber").Value;
    const mpesaReceipt = data.Body.stkCallback.CallbackMetadata.Item.find((i: any) => i.Name === "MpesaReceiptNumber").Value;
    const agentNumber = data.Body.stkCallback.MerchantRequestID; // You can also map session

    // Save transaction to DB
    await saveTransaction({
      agentNumber,
      phone,
      amount,
      mpesaReceipt,
      status: "paid",
    });

    // Send float to agent
    await sendAirtelFloat(agentNumber, amount);

    res.sendStatus(200);
  } catch (err) {
    console.error("M-Pesa Callback Error:", err);
    res.sendStatus(500);
  }
};

