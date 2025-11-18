interface UssdSession {
  stage: string;
  agentNumber?: string;
  amount?: number;
}

export const handleUssdMenu = (text: string, session: UssdSession) => {
  // Normalize empty string
  text = text.trim();

  // Split input by *
  const textArray = text === "" ? [] : text.split("*");

  // Initial request
  if (textArray.length === 0) {
    return {
      response: "CON Welcome to Airtel Float System\nEnter your Airtel Agent Number:",
      session: { stage: "agentNumber" },
    };
  }

  // Enter Agent Number
  if (session.stage === "agentNumber" || textArray.length === 1) {
    const agentNumber = textArray[0].trim();

    if (!agentNumber || isNaN(Number(agentNumber))) {
      return {
        response: "CON Invalid agent number. Please enter a valid Airtel Agent Number:",
        session: { stage: "agentNumber" },
      };
    }

    return {
      response: "CON Enter amount to buy float (KSH):",
      session: { stage: "amount", agentNumber },
    };
  }

  // Enter Amount
  if (session.stage === "amount" || textArray.length === 2) {
    const agentNumber = textArray[0].trim();
    const amount = Number(textArray[1].trim());

    if (!amount || amount <= 0) {
      return {
        response: "CON Invalid amount. Please enter a valid amount (KSH):",
        session: { stage: "amount", agentNumber },
      };
    }

    return {
      response: "CON Processing your request...",
      session: { stage: "process", agentNumber, amount },
    };
  }

  return { response: "END Invalid input. Try again.", session };
};
