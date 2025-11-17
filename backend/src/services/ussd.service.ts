interface UssdSession {
  stage: string;
  agentNumber?: string;
  amount?: number;
}

export const handleUssdMenu = (text: string, session: UssdSession) => {
  // Split input by *
  const textArray = text.split("*");

  if (text === "") {
    // Initial request
    return {
      response: "CON Welcome to Airtel Float System\nEnter your Airtel Agent Number:",
      session: { stage: "agentNumber" },
    };
  }

  if (session.stage === "agentNumber" || textArray.length === 1) {
    return {
      response: "CON Enter amount to buy float (KSH):",
      session: { stage: "amount", agentNumber: textArray[0] },
    };
  }

  if (session.stage === "amount" || textArray.length === 2) {
    return {
      response: "CON Processing your request...",
      session: { stage: "process", agentNumber: textArray[0], amount: Number(textArray[1]) },
    };
  }

  return { response: "END Invalid input. Try again.", session };
};
