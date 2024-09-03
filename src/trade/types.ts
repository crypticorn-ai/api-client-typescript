import type { Kucoin } from "./kucoin";
import type { BingX } from "./bingx";

export type ApiKey = {
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
  user_id: string;
};

export type TradingBot = {
  id: string;
  name: string;
  strategy_name: string;
  api_key_id: string;
  allocation: number;
  enabled: boolean;
  user_id: string;
};

export type Order = {
  api_key_id: string;
  exchange: string;
  id: string;
  order_details: Record<string, any>;
  price: number;
  status: string;
  strategy_name: string;
  timestamp: number;
  type: string;
  user_id: string;
}

export type TradingSignal = {
  symbol: string;
  buy: boolean;
  sell: boolean;
  buy_close: boolean;
  sell_close: boolean;
  buy_sl: number;
  sell_sl: number;
  interval: string;
  strategy_name: string;
  parameters: Record<string, any>;
};

export { Kucoin, BingX };
export type SwapBalanceResponse = Kucoin.SwapBalanceResponse | BingX.SwapBalanceResponse;
export type HistoricalSwapOrdersResponse = Kucoin.HistoricalSwapOrdersResponse | BingX.HistoricalSwapOrdersResponse;
export type SpotBalanceResponse = Kucoin.SpotBalanceResponse | BingX.SpotBalanceResponse;