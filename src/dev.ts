// test against dev

import { createClient, createSocket } from ".";
import dotenv from "dotenv";
import txData from "./tx.json";

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
    console.log(key);
    for (const hash of txData[key]) {
      try {
        console.log(`${key}:${hash}`);
        await client.token.transactions.post.mutate({
          token: key as any,
          hash,
        });
        console.log("done");
      } catch (e) {
        console.log("error");
        console.log(e);
      }
    }
    console.log("done all");
  }
}

export async function runTests() {
  client.api.getApiKeys().then((res) => {
    console.log(res);
  });

  client.api.getLatestPredictions().then((res) => {
    console.log(res);
  });

  client.api.queryHistoricalSwapOrders().then((res) => {
    console.log(res);
  });

  client.api.getLatestTrends().then((res) => {
    console.log(res);
  });

  const result = await client.api.postApiKey({
    api_key: "test",
    secret: "test",
    exchange: "bingx",
    label: "test",
  });
}

const result = await client.api.getLatestPredictions();

console.log("done", result);
