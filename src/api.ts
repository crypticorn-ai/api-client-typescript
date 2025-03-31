import {
  DexProgress,
  EconomicsNewsData,
  EnvironmentType,
  Kline,
  Prediction,
  Trend,
} from "./types";
import { createClient as createAuthClient } from "@crypticorn-ai/auth-service";
import { createClient as createTokenClient } from "@crypticorn-ai/token-service/dist/client";
import { createHiveClient } from "./hive";
import { createClient as createTradeClient } from "./trade";
import { createClient as createPayClient } from "./pay";

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

const defaultVersion = "1.5";

export const createClient = ({
  accessToken = "",
  refreshToken = "",
  apiRoot,
  environment = "prod",
  version = "v1",
  host,
  ...rest
}: {
  accessToken?: string;
  refreshToken?: string;
  apiRoot?: string;
  environment?: EnvironmentType;
  version?: string;
  host?: string;
  fetch?: typeof fetch;
}): {
  auth: ReturnType<typeof createAuthClient>;
  token: ReturnType<typeof createTokenClient>;
  api: ReturnType<typeof createApiClient>;
  hive: ReturnType<typeof createHiveClient>;
  trade: ReturnType<typeof createTradeClient>;
  pay: ReturnType<typeof createPayClient>;
} => {
  if (!apiRoot) {
    const result = getHosts({
      environment,
      version,
      host,
    });
    apiRoot = result.apiRoot;
  }
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "X-Refresh-Token": refreshToken,
    Cookie: refreshToken
      ? `accessToken=${accessToken}; refreshToken=${refreshToken}`
      : `accessToken=${accessToken}`,
    "Content-Type": "application/json",
  };
  const token = createTokenClient(apiRoot + "/token", headers, rest.fetch);
  const auth = createAuthClient(apiRoot + "/auth/trpc", headers, rest.fetch);
  const api = createApiClient({
    accessToken,
    apiRoot,
    environment,
    version,
    host,
    fetch: rest.fetch,
  });
  const trade = createTradeClient(apiRoot + "/trade", headers, rest.fetch);
  const hive = createHiveClient(apiRoot + "/hive", headers, rest.fetch);
  const pay = createPayClient(apiRoot + "/pay", headers, rest.fetch);
  return {
    auth,
    token,
    api,
    hive,
    trade,
    pay,
  };
};

export const createApiClient = ({
  accessToken,
  apiRoot,
  environment = "prod",
  version = "v1",
  host,
  ...rest
}: {
  accessToken: string;
  apiRoot?: string;
  environment?: EnvironmentType;
  version?: string;
  host?: string;
  fetch?: typeof fetch;
}) => {
  const fetch = rest.fetch || globalThis.fetch;
  if (!apiRoot) {
    const result = getHosts({
      environment,
      version,
      host,
    });
    apiRoot = result.apiRoot;
  }

  const predRoot = apiRoot + "/predictions";
  const dexRoot = apiRoot + "/dex";
  const trendRoot = apiRoot + "/trends";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const getLatestPredictions = async ({
    version = defaultVersion,
    klines = 20,
  }: {
    version?: string;
    klines?: number;
  } = {}) => {
    return fetch(`${predRoot}/latest?version=${version}&klines=${klines}`, {
      headers,
    }).then((res) => res.json()) as Promise<{
      predictions: Prediction[];
      klines: Record<string, Kline[]>;
    }>;
  };

  const getPrediction = async (predictionId: string) => {
    return fetch(`${predRoot}/id/${predictionId}`, {
      headers,
    }).then((res) => res.json()) as Promise<Prediction | null>;
  };

  const getHistoricalPredictions = async ({
    symbol,
    records,
    version = defaultVersion,
  }: {
    symbol: string;
    records: number;
    version?: string;
  }) => {
    return fetch(
      `${predRoot}/symbol/${symbol}?version=${version}&limit=${records}`,
      {
        headers,
      }
    ).then((r) => r.json()) as Promise<Prediction[]>;
  };

  const getLatestTrends = async () => {
    return fetch(`${trendRoot}/`, { headers }).then((res) =>
      res.json()
    ) as Promise<Trend[]>;
  };

  const getDexProgress = async () => {
    return fetch(`${dexRoot}/progress`).then((res) =>
      res.json()
    ) as Promise<DexProgress>;
  };

  // Testing the economics news data
  const getEconomicsNewsData = async ({
    entries = 100,
    reverse = false,
  }: {
    entries?: number;
    reverse?: boolean;
  } = {}): Promise<EconomicsNewsData> => {
    const res = (await fetch(
      `${apiRoot}/miners/ec?entries=${entries}&reverse=${reverse}`,
      {
        headers,
      }
    ).then((res) => res.json())) as { data: any[] };
    // cast the data: array to the actual type
    const data = res.data.map((item) => {
      const [
        timestamp,
        country,
        event,
        currency,
        previous,
        estimate,
        actual,
        change,
        impact,
        changePercentage,
      ] = item;
      return {
        timestamp,
        country,
        event,
        currency,
        previous,
        estimate,
        actual,
        change,
        impact,
        changePercentage,
      };
    });
    return { data };
  };

  return {
    apiRoot,
    getLatestPredictions,
    getPrediction,
    getDexProgress,
    getHistoricalPredictions,
    getLatestTrends,
    getEconomicsNewsData,
  };
};
