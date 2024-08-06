import {
  ApiKey,
  Order,
  TradingBot,
  SwapBalanceResponse,
  HistoricalSwapOrdersResponse,
  TradingSignal,
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

  const listOrders = async () => {
    return fetch(`${tradeRoot}/orders`, { headers }).then((res) =>
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

  const getSignals = async () => {
    return fetch(`${tradeRoot}/signals`, {
      headers,
    }).then((res) => res.json()) as Promise<TradingSignal[]>;
  };

  // exchange client endpoints
  const getSwapBalance = async (key: string) => {
    return fetch(`${tradeRoot}/swap/balance?key=${key}`, {
      headers,
    }).then((res) => res.json()) as Promise<SwapBalanceResponse>;
  };

  const getSwapLedger = async (key: string) => {
    return fetch(`${tradeRoot}/swap/ledger?key=${key}`, {
      headers,
    }).then((res) => res.json()) as Promise<unknown>;
  };

  const getSpotBalance = async (key: string) => {
    return fetch(`${tradeRoot}/spot/balance?key=${key}`, {
      headers,
    }).then((res) => res.json()) as Promise<unknown>;
  };

  const queryHistoricalSwapOrders = async (key: string) => {
    return fetch(`${tradeRoot}/swap/historical-orders?key=${key}`, {
      headers,
    }).then((res) => res.json()) as Promise<HistoricalSwapOrdersResponse>;
  };

  const placeOrder = async ({
    key,
    positionSide,
    quantity,
    side,
    symbol,
    type,
  }: {
    key: string;
    positionSide: string;
    quantity: number;
    side: string;
    symbol: string;
    type: string;
  }) => {
    return fetch(`${tradeRoot}/swap/place-order?key=${key}`, {
      method: "POST",
      headers,
      body: JSON.stringify({ positionSide, quantity, side, symbol, type }),
    }).then((res) => res.json()) as Promise<unknown>;
  };

  const cancelOrder = async ({
    key,
    orderId,
    symbol,
  }: {
    key: string;
    orderId: number;
    symbol: string;
  }) => {
    return fetch(
      `${tradeRoot}/swap/cancel-order?key=${key}&orderId=${orderId}&symbol=${symbol}`,
      {
        method: "DELETE",
        headers,
      }
    ).then((res) => res.json()) as Promise<unknown>;
  };

  return {
    postApiKey,
    getSwapBalance,
    getSpotBalance,
    queryHistoricalSwapOrders,
    placeOrder,
    cancelOrder,
    getSwapLedger,
    getSignals,
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
