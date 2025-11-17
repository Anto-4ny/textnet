import axios from "axios";
import dotenv from "dotenv";
import { getMpesaToken } from "../config/mpesa.js";

dotenv.config();

export const initiateStkPush = async (phone: string, amount: number, accountRef: string) => {
  const token = await getMpesaToken();

  const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

  const timestamp = new Date()
    .toISOString()
    .replace(/[-:T.Z]/g, "")
    .slice(0, 14);

  const shortcode = process.env.MPESA_SHORTCODE!;
  const passkey = process.env.MPESA_PASSKEY!;

  const password = Buffer.from(shortcode + passkey + timestamp).toString("base64");

  const payload = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phone,
    PartyB: shortcode,
    PhoneNumber: phone,
    CallBackURL: process.env.MPESA_CALLBACK_URL,
    AccountReference: accountRef,
    TransactionDesc: "Airtel Float Purchase",
  };

  const response = await axios.post(url, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
