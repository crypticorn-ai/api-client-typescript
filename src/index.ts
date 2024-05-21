import { EnvironmentType, getHosts } from "./config";
import { ApiKeysResponse, HistoricalSwapOrdersResponse } from "./types";
import { createSocket } from "./ws";

export { EnvironmentType } from "./config";
export * from "./types";
export type ApiClient = ReturnType<typeof createClient>;
export type SocketClient = ReturnType<typeof createSocket>;

const createClient = ({
  accessToken,
  apiRoot,
  environment = "prod",
  version = "v1",
  host,
}: {
  accessToken: string;
  apiRoot?: string;
  environment?: EnvironmentType;
  version?: string;
  host?: string;
}) => {
  if (!apiRoot) {
    const result = getHosts({
      environment,
      version,
      host,
    });
    apiRoot = result.apiRoot;
  }

  // AI trading bot client
  let root = apiRoot + "/trade";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const postApiKey = async ({
    api_key,
    secret,
    exchange,
    label,
  }: {
    api_key: string;
    secret: string;
    exchange: string;
    label: string;
  }) => {
    return fetch(`${root}/api-key`, {
      method: "POST",
      headers,
      body: JSON.stringify({ api_key, secret, exchange, label }),
      credentials: "include",
    }).then((res) => res.json()) as Promise<{ status: string }>;
  };

  const getBalances = async () => {
    return fetch(`${root}/balances`, { headers }).then((res) =>
      res.json()
    ) as Promise<unknown>;
  };

  const queryHistoricalSwapOrders = async () => {
    return fetch(`${root}/historical-swap-orders`, { headers }).then((res) =>
      res.json()
    ) as Promise<HistoricalSwapOrdersResponse>;
  };

  const placeOrder = async ({
    positionSide,
    quantity,
    side,
    symbol,
    type,
  }: {
    positionSide: string;
    quantity: number;
    side: string;
    symbol: string;
    type: string;
  }) => {
    return fetch(`${root}/place-swap-order`, {
      method: "POST",
      headers,
      body: JSON.stringify({ positionSide, quantity, side, symbol, type }),
    }).then((res) => res.json()) as Promise<unknown>;
  };

  const cancelOrder = async ({
    orderId,
    symbol,
  }: {
    orderId: number;
    symbol: string;
  }) => {
    return fetch(
      `${root}/cancel-swap-order?orderId=${orderId}&symbol=${symbol}`,
      {
        method: "DELETE",
        headers,
      }
    ).then((res) => res.json()) as Promise<unknown>;
  };

  const getApiKeys = async () => {
    return fetch(`${root}/api-keys`, { headers }).then((res) =>
      res.json()
    ) as Promise<ApiKeysResponse>;
  };

  const deleteApiKey = async ({ id }: { id: string }) => {
    return fetch(`${root}/api-key`, {
      method: "DELETE",
      headers,
      body: JSON.stringify({ id }),
    }).then((res) => res.json()) as Promise<{ status: string }>;
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
    return fetch(`${root}/api-key`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ id, label, enabled }),
    }).then((res) => res.json()) as Promise<{ status: string }>;
  };

  return {
    postApiKey,
    getBalances,
    queryHistoricalSwapOrders,
    placeOrder,
    cancelOrder,
    getApiKeys,
    deleteApiKey,
    updateApiKey,
  };
};

export { createClient, createSocket };
