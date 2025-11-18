import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const sendAirtelFloat = async (agentNumber: string, amount: number) => {
  try {
    const response = await axios.post(
      process.env.AIRTEL_FLOAT_URL!,
      {
        agentNumber,
        amount,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Api-Key": process.env.AIRTEL_API_KEY!,
        },
      }
    );

    console.log("✅ Airtel Float Sent:", response.data);
    return response.data;
  } catch (err: unknown) {
    // Type guard to check if error is AxiosError
    if (axios.isAxiosError(err)) {
      console.error("❌ Airtel Float Error:", err.response?.data || err.message);
    } else if (err instanceof Error) {
      console.error("❌ Airtel Float Error:", err.message);
    } else {
      console.error("❌ Airtel Float Unknown Error:", err);
    }
    throw err;
  }
};

