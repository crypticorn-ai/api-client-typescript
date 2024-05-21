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

// Conditionally import the 'ws' package only in a Node.js environment
const WebSocketImplementation = (await import("ws")).default as unknown as typeof WebSocket;

const socketClient = createSocket({
  accessToken,
  WebSocketImplementation,
  onMessage: (data) => {
    console.log(data);
  },
});

// client.getLatestPredictions().then((res) => {
//   console.log(res);
// });

// client.queryHistoricalSwapOrders().then((res) => {
//   console.log(res);
// });

