export namespace BingX {
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

  export type SwapBalanceResponse = {
    code: number;
    msg: string;
    data: {
      balance: SwapBalance;
    };
  };

  export type SwapBalance = {
    userId: string;
    asset: string;
    balance: string;
    equity: string;
    unrealizedProfit: string;
    realisedProfit: string;
    availableMargin: string;
    usedMargin: string;
    freezedMargin: string;
    shortUid: string;
  };

  export type SpotBalanceResponse = {
    code: number;
    msg: string;
    debugMsg: string;
    data: {
      balances: {
        asset: string;
        free: string;
        locked: string;
      }[];
    };
  };
}
