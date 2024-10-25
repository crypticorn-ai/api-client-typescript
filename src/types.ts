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

export type Trend = {
  version: string;
  timestamp: number;
  timestamps: number[];
  positive_prob: number[];
  id: number;
  symbol: string;
}

export type Kline = [
  number, // open time
  number, // open
  number, // high
  number, // low
  number, // close
  number // volume
];

export type DexProgress = {
  status: string;
  data: {
    "Eth Tokens": number;
    "Base Tokens": number;
    "Solana Tokens": number;
  };
};

export type EconomicsNewsData = {
  data: {
    timestamp: number;
    country: string | null;
    event: string | null;
    currency: string | null;
    previous: number | null;
    estimate: number | null;
    actual: number | null;
    change: number | null;
    impact: string | null;
    changePercentage: number | null;
  }[]
};

export type EnvironmentType = "local" | "dev" | "prod";
