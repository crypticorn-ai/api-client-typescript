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

export type HistoricalSwapOrdersResponse = {
  code: number;
  msg: string;
  data: {
    orders: HistoricalSwap[];
  };
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
