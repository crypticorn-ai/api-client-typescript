// test against dev

import { createClient, createSocket } from ".";
import dotenv from "dotenv";

dotenv.config();

const accessToken = process.env.ACCESS_TOKEN_DEV as string;

const client = createClient({
  environment: "dev",
  accessToken,
});

const globalFetch = global.fetch;
global.fetch = async (url, options) => {
  console.log(url);
  return globalFetch(url, options);
};

console.log("client", client);

// client.getApiKeys().then((res) => {
//   console.log(res);
// });

// const socketClient = createSocket({
//   accessToken,
//   onMessage: (data) => {
//     console.log(data);
//   },
// });

// client.getLatestPredictions().then((res) => {
//   console.log(res);
// });

// client.queryHistoricalSwapOrders().then((res) => {
//   console.log(res);
// });

