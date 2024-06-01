export type { AuthContext, User, ValidationError } from "@crypticorn-ai/auth-service";

export type Prediction = {
  action: string;
  symbol: string;
  base_price: number;
  course_change: number;
  timestamp: number;
  id: number;
  version: string;
  p10: number[];
  p30: number[];
  p50: number[];
  p70: number[];
  p90: number[];
};

export type DexProgress = {
  status: string;
  data: {
    "Eth Tokens": number;
    "Base Tokens": number;
    "Solana Tokens": number;
  };
};

export type ApiKeysResponse = {
  id: string;
  api_key: {
    value: string;
    nonce: string;
    tag: string;
  };
  exchange: string;
  label: string;
  secret: {
    value: string;
    nonce: string;
    tag: string;
  };
  created_at: number;
  enabled: boolean;
}[];

export type HistoricalSwapOrdersResponse = {
  code: number;
  msg: string;
  data: {
    orders: HistoricalSwap[];
  };
};

export type HistoricalSwap = {
  symbol: string;
  orderId: number;
  side: string;
  positionSide: string;
  type: string;
  origQty: string;
  price: string;
  executedQty: string;
  avgPrice: string;
  cumQuote: string;
  stopPrice: string;
  profit: string;
  commission: string;
  status: string;
  time: number;
  updateTime: number;
  clientOrderId: string;
  leverage: string;
  takeProfit: {
    type: string;
    quantity: number;
    stopPrice: number;
    price: number;
    workingType: string;
  };
  stopLoss: {
    type: string;
    quantity: number;
    stopPrice: number;
    price: number;
    workingType: string;
  };
  advanceAttr: number;
  positionID: number;
  takeProfitEntrustPrice: number;
  stopLossEntrustPrice: number;
  orderType: string;
  workingType: string;
  onlyOnePosition: boolean;
  reduceOnly: boolean;
  stopGuaranteed: string;
  triggerOrderId: number;
};

export type EnvironmentType = "local" | "dev" | "prod";
