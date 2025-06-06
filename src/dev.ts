// test against dev

import { createClient, createSocket } from ".";
import dotenv from "dotenv";
import txData from "./tx.json";

dotenv.config();

const accessToken = process.env.ACCESS_TOKEN_DEV as string;

const client = createClient({
  environment: "local",
  accessToken,
});

const globalFetch = global.fetch;
global.fetch = async (url, options) => {
  console.log(url);
  return globalFetch(url, options);
};

/**
 * Create a websocket client
 */
export async function createWebSocket() {
  // Conditionally import the 'ws' package only in a Node.js environment
  const WebSocketImplementation = (await import("ws"))
    .default as unknown as typeof WebSocket;

  const socketClient = createSocket({
    accessToken,
    WebSocketImplementation,
    onMessage: (data) => {
      console.log(data);
    },
  });
}

/**
 * Run backfill for all tokens
 */
export async function runBackfill() {
  for (const key of Object.keys(txData)) {
    for (const hash of txData[key]) {
      try {
        await client.token.transactions.post.mutate({
          token: key as any,
          hash,
        });
        console.log(`${key}:${hash}`);
        console.log("done");
      } catch (e) {
        // console.log("error");
        const err = e as Error;
        if (err.message.toLowerCase().includes("already exists")) {
          // console.log("already exists");
        } else if (err.message.toLowerCase().includes("not found")) {
          console.log(`${key}:${hash}`);
          console.log("not found");
        } else {
          console.log(`${key}:${hash}`);
          console.log(e);
        }
      }
    }
    console.log("done all");
  }


// export async function runTests() {
//   client.api.getApiKeys().then((res) => {
//     console.log(res);
//   });

//   client.api.getLatestPredictions().then((res) => {
//     console.log(res);
//   });

//   client.api.queryHistoricalFuturesOrders().then((res) => {
//     console.log(res);
//   });

//   client.api.getLatestTrends().then((res) => {
//     console.log(res);
//   });

//   const result = await client.api.postApiKey({
//     api_key: "test",
//     secret: "test",
//     exchange: "bingx",
//     label: "test",
//   });
// }

// const result = await client.hive.getAccountInfo();

// console.log("done", result);

// runBackfill();

// await client.token.transactions.post.mutate({
//   token: "bnb",
//   hash: "0x0f17559b80b6b9992399039d4d37986dd78d203995f6f688cd81e5f5d1743e65",
// });
