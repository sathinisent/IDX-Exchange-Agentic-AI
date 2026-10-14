import { testConnection } from "../src/db/mysql";

async function run() {
  try {
    const result = await testConnection();
    console.log("Database connection successful:", result);
  } catch (error) {
    console.error("Database connection failed:");
    console.error(error);
  }
}

run();
