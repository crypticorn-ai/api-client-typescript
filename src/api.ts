import { ApiKeysResponse, DexProgress, EnvironmentType, HistoricalSwapOrdersResponse, Prediction } from "./types";
import { createClient as createAuthService } from "@crypticorn-ai/auth-service";
import { createClient as createTokenService } from "@crypticorn-ai/token-service/dist/client";

export const environments: Record<EnvironmentType, string> = {
  // local development
  local: "localhost",
  // development
  dev: "api.crypticorn.dev",
  // production
  prod: "api.crypticorn.com",
};

export function getHosts({
  environment,
  host = environments[environment],
  version,
}: {
  environment: EnvironmentType;
  host?: string;
  version?: string;
}) {
  let apiRoot = `https://${host}/${version}`;
  let wsRoot = `wss://${host}/${version}/ws`;

  if (host.includes("localhost")) {
    apiRoot = `http://${host}/${version}`;
    wsRoot = `ws://${host}/${version}/ws`;
  }

  return { apiRoot, wsRoot };
}

export async function createSocket({
  accessToken,
  wsRoot,
  environment = "prod",
  version = "v1",
  host,
  onMessage,
  WebSocketImplementation = WebSocket,
}: {
  accessToken: string;
  wsRoot?: string;
  environment?: EnvironmentType;
  version?: string;
  host?: string;
  onMessage: (data: Prediction) => void;
  WebSocketImplementation?: typeof WebSocket;
}) {
  if (!wsRoot) {
    const result = getHosts({
      environment,
      version,
      host,
    });
    wsRoot = result.wsRoot;
  }
  const websocket = new WebSocketImplementation(wsRoot) as WebSocket;

  websocket.onopen = () => {
    // Order is important
    websocket.send(JSON.stringify({ type: "auth", token: accessToken }));
    // websocket.send(JSON.stringify({ type: 'auth', api_key: "" }));
    websocket.send(JSON.stringify({ type: "subscribe", topic: "predictions" }));
  };

  websocket.onmessage = (event) => {
    try {
      const decoded = JSON.parse(event.data);
      if (decoded.type === "message" && decoded.topic === "predictions") {
        onMessage(decoded.data);
      } else if (decoded.type === "auth") {
        // ignore
        // console.log(decoded);
      }
    } catch (e) {
      console.error("Error parsing message", e);
    }
  };

  websocket.onerror = (event) => {
    console.error("WebSocket error:", event);
  };

  websocket.onclose = (event) => {
    console.log("WebSocket connection closed:", event);
  };
}

export type ApiClient = ReturnType<typeof createClient>;
export type SocketClient = ReturnType<typeof createSocket>;

export const createClient = ({
  accessToken,
  refreshToken,
  apiRoot,
  environment = "prod",
  version = "v1",
  host,
}: {
  accessToken: string;
  refreshToken: string;
  apiRoot?: string;
  environment?: EnvironmentType;
  version?: string;
  host?: string;
}): {
  auth: ReturnType<typeof createAuthService>;
  token: ReturnType<typeof createTokenService>;
  api: ReturnType<typeof createApiService>;
} => {
  if (!apiRoot) {
    const result = getHosts({
      environment,
      version,
      host,
    });
    apiRoot = result.apiRoot;
  }
  const token = createTokenService(apiRoot + "/token", {
    cookie: `accessToken=${accessToken};`,
  });
  const auth = createAuthService(apiRoot + "/auth", {
    // avoid trailing semicolon
    cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
  });
  const api = createApiService({ accessToken, apiRoot, environment, version, host });
  return {
    auth,
    token,
    api,
  };
};

export const createApiService = ({
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

  const tradeRoot = apiRoot + "/trade";
  const predRoot = apiRoot + "/predictions";
  const dexRoot = apiRoot + "/dex";

  const auth = createAuthService(apiRoot + "/auth");
  const token = createTokenService(apiRoot + "/token");

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
    return fetch(`${tradeRoot}/api-key`, {
      method: "POST",
      headers,
      body: JSON.stringify({ api_key, secret, exchange, label }),
      credentials: "include",
    }).then((res) => res.json()) as Promise<{ status: string }>;
  };

  const getBalances = async () => {
    return fetch(`${tradeRoot}/balances`, { headers }).then((res) =>
      res.json()
    ) as Promise<unknown>;
  };

  const queryHistoricalSwapOrders = async () => {
    return fetch(`${tradeRoot}/historical-swap-orders`, { headers }).then(
      (res) => res.json()
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
    return fetch(`${tradeRoot}/place-swap-order`, {
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
      `${tradeRoot}/cancel-swap-order?orderId=${orderId}&symbol=${symbol}`,
      {
        method: "DELETE",
        headers,
      }
    ).then((res) => res.json()) as Promise<unknown>;
  };

  const getApiKeys = async () => {
    return fetch(`${tradeRoot}/api-keys`, { headers }).then((res) =>
      res.json()
    ) as Promise<ApiKeysResponse>;
  };

  const deleteApiKey = async ({ id }: { id: string }) => {
    return fetch(`${tradeRoot}/api-key`, {
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
    return fetch(`${tradeRoot}/api-key`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ id, label, enabled }),
    }).then((res) => res.json()) as Promise<{ status: string }>;
  };

  const getLatestPredictions = async ({
    version = 2,
    klines = 20,
  }: {
    version?: number;
    klines?: number;
  } = {}) => {
    return fetch(`${predRoot}/latest?version=${version}&klines=${klines}`, {
      headers,
    }).then((res) => res.json()) as Promise<Prediction[]>;
  };

  const getPrediction = async (predictionId: string) => {
    return fetch(`${predRoot}/id/${predictionId}`, {
      headers,
    }).then((res) => res.json()) as Promise<Prediction | null>;
  };

  const getHistoricalPredictions = async ({
    symbol,
    records,
    version = 2,
  }: {
    symbol: string;
    records: number;
    version?: number;
  }) => {
    return fetch(
      `${predRoot}/symbol/${symbol}?version=${version}&limit=${records}`,
      {
        headers,
      }
    ).then((r) => r.json()) as Promise<Prediction[]>;
  };

  const getDexProgress = async () => {
    return fetch(`${dexRoot}/progress`).then((res) =>
      res.json()
    ) as Promise<DexProgress>;
  };

  return {
    apiRoot,
    postApiKey,
    getBalances,
    queryHistoricalSwapOrders,
    placeOrder,
    cancelOrder,
    getApiKeys,
    deleteApiKey,
    updateApiKey,
    getLatestPredictions,
    getPrediction,
    getDexProgress,
    getHistoricalPredictions,
  };
};
