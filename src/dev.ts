// test against dev

import { createClient } from ".";
import dotenv from "dotenv";

dotenv.config();

const accessToken = process.env.ACCESS_TOKEN_DEV as string;

const client = createClient({
  environment: "dev",
  accessToken,
});

client.getApiKeys().then((res) => {
  console.log(res);
});
