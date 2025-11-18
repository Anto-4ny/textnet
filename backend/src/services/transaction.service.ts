import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

interface Transaction {
  agentNumber: string;
  phone: string;
  amount: number;
  mpesaReceipt: string;
  status: string;
}

export const saveTransaction = async (tx: Transaction) => {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO transactions(agent_number, phone, amount, mpesa_receipt, status, created_at)
      VALUES($1, $2, $3, $4, $5, NOW())
      RETURNING *;
    `;
    const values = [tx.agentNumber, tx.phone, tx.amount, tx.mpesaReceipt, tx.status];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.error("DB Save Transaction Error:", err);
    throw err;
  } finally {
    client.release();
  }
};
