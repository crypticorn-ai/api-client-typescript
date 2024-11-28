import { createFuturesClient } from "./futures";
import {
  ApiKey,
  Order,
  TradingBot,
  TradingAction,
} from "./types";

export function createTradeClient(tradeRoot: string, headers: any, fetch = globalThis.fetch) {
  const postApiKey = async ({
    api_key,
    secret,
    exchange,
    label,
    passphrase,
  }: {
    api_key: string;
    secret: string;
    exchange: string;
    passphrase?: string;
    label: string;
  }) => {
    return fetch(`${tradeRoot}/api-key`, {
      method: "POST",
      headers,
      body: JSON.stringify({ api_key, secret, exchange, label, passphrase }),
      credentials: "include",
    }).then((res) => res.json()) as Promise<{ id: string }>;
  };

  const listOrders = async (symbol?: string) => {
    const params = new URLSearchParams({
      ...(symbol && { symbol: encodeURIComponent(symbol) }),
    });
    return fetch(`${tradeRoot}/orders?${params}`, { headers }).then((res) =>
      res.json()
    ) as Promise<Order[]>;
  };

  const listBots = async () => {
    return fetch(`${tradeRoot}/bots`, { headers }).then((res) =>
      res.json()
    ) as Promise<TradingBot[]>;
  };

  const createBot = async (bot: Omit<TradingBot, "id" | "user_id">) => {
    return fetch(`${tradeRoot}/bots`, {
      headers,
      method: "POST",
      body: JSON.stringify(bot),
    }).then((res) => res.json()) as Promise<{ id: string }>;
  };

  const deleteBot = async (id: string) => {
    return fetch(`${tradeRoot}/bots?id=${id}`, {
      headers,
      method: "DELETE",
    }).then((res) => res.json()) as Promise<{ deleted: number }>;
  };

  const updateBot = async (bot: Omit<TradingBot, "user_id">) => {
    return fetch(`${tradeRoot}/bots`, {
      headers,
      method: "PUT",
      body: JSON.stringify(bot),
    }).then((res) => res.json()) as Promise<{ modified: number }>;
  };

  const getApiKeys = async () => {
    return fetch(`${tradeRoot}/api-keys`, { headers }).then((res) =>
      res.json()
    ) as Promise<ApiKey[]>;
  };

  const deleteApiKey = async ({ id }: { id: string }) => {
    return fetch(`${tradeRoot}/api-key`, {
      method: "DELETE",
      headers,
      body: JSON.stringify({ id }),
    }).then((res) => res.json()) as Promise<{ deleted: number }>;
  };

  const updateApiKey = async ({
    id,
    label,
    enabled,
  }: {
    id: string;
    label: string;
    enabled: boolean;
  }) => {
    return fetch(`${tradeRoot}/api-key`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ id, label, enabled }),
    }).then((res) => res.json()) as Promise<{ modified: number }>;
  };

  const getActions = async () => {
    return fetch(`${tradeRoot}/actions`, {
      headers,
    }).then((res) => res.json()) as Promise<TradingAction[]>;
  };

  const futures = createFuturesClient(tradeRoot, headers, fetch);

  return {
    futures,
    postApiKey,
    getActions,
    listOrders,
    listBots,
    deleteBot,
    createBot,
    updateBot,
    getApiKeys,
    deleteApiKey,
    updateApiKey,
  };
}
