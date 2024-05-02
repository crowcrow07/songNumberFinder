import { pool } from "./config";

export const insertDbExecuteQuery = async (query: string, arrParams: any) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(query, arrParams);
    return rows;
  } catch (err) {
    console.error("Error insertDbExecuteQuery", err);
    throw err;
  } finally {
    conn.release();
  }
};

export const searchDbExecuteQuery = async (query: string) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(query);
    return rows;
  } catch (err) {
    console.error("Error searchDbExecuteQuery", err);
    throw err;
  } finally {
    conn.release();
  }
};
