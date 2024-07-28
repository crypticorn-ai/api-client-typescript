export namespace Kucoin {
  export type HistoricalSwapOrdersResponse = {
    code: string;
    data: {
      currentPage: number;
      pageSize: number;
      totalNum: number;
      totalPage: number;
      items: HistoricalSwap[];
    };
  };

  export type HistoricalSwap = {
    id: string;
    symbol: string;
    type: string;
    side: string;
    price: string;
    size: number;
    value: string;
    dealValue: string;
    dealSize: number;
    stp: string;
    stop: string;
    stopPriceType: string;
    stopTriggered: boolean;
    stopPrice: string;
    timeInForce: string;
    postOnly: boolean;
    hidden: boolean;
    iceberg: boolean;
    leverage: string;
    forceHold: boolean;
    closeOrder: boolean;
    visibleSize: number;
    clientOid: string;
    remark: string | null;
    tags: string;
    isActive: boolean;
    cancelExist: boolean;
    createdAt: number;
    updatedAt: number;
    endAt: number;
    orderTime: number;
    settleCurrency: string;
    filledSize: number;
    filledValue: string;
    status: string;
    reduceOnly: boolean;
  };

  export type SwapBalanceResponse = {
    code: string;
    data: {
      /** Account equity = marginBalance + Unrealised PNL */
      accountEquity: number;
      /** Unrealised profit and loss */
      unrealisedPNL: number;
      /** Margin balance = positionMargin + orderMargin + frozenFunds + availableBalance - unrealisedPNL */
      marginBalance: number;
      /** Position margin */
      positionMargin: number;
      /** Order margin */
      orderMargin: number;
      /** Frozen funds for withdrawal and out-transfer */
      frozenFunds: number;
      /** Available balance */
      availableBalance: number;
      /** Currency code */
      currency: string;
    };
  };

  export type SpotBalanceResponse = {
    code: string;
    data: {
      id: string;
      currency: string;
      type: string;
      balance: string;
      available: string;
      holds: string;
    }[];
  };
}
