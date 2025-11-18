import { useState } from "react";
import axios from "axios";

export default function App() {
  const [agentNumber, setAgentNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async () => {
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await axios.post("/api/airtel/buy-float", {
        agentNumber,
        phone,
        amount: Number(amount),
      });

      setStatus({ type: "success", message: response.data.message });
    } catch (err) {
      setStatus({
        type: "error",
        message: err.response?.data?.error || "Something went wrong.",
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md backdrop-blur-xl border border-gray-100">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/textnet-logo.png"
            alt="Textnet Logo"
            className="h-16 w-auto drop-shadow-lg"
          />
        </div>

        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-2">
          Buy Airtel Float
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Fast • Secure • M-Pesa Integrated
        </p>

        {/* Input Fields */}
        <div className="space-y-5">
          <input
            type="text"
            placeholder="Airtel Agent Number"
            className="w-full p-3 border rounded-xl focus:ring-4 focus:ring-blue-200"
            value={agentNumber}
            onChange={(e) => setAgentNumber(e.target.value)}
          />

          <input
            type="text"
            placeholder="M-Pesa Phone Number"
            className="w-full p-3 border rounded-xl focus:ring-4 focus:ring-green-200"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="number"
            placeholder="Amount to Buy"
            className="w-full p-3 border rounded-xl focus:ring-4 focus:ring-blue-200"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-7 w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-xl text-lg font-semibold shadow-xl hover:opacity-90 active:scale-95 transition"
        >
          {loading ? "Processing..." : "Purchase Float"}
        </button>

        {/* Status Message */}
        {status.message && (
          <div
            className={`mt-5 p-3 text-center rounded-xl font-medium ${
              status.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
}
