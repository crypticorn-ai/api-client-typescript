export enum Exchange {
    /** Supported exchanges for trading */
    KUCOIN = "kucoin",
    BINGX = "bingx",
  }
  
  export enum InternalExchange {
    /** All exchanges we are using, including public (Exchange) */
    KUCOIN = "kucoin",
    BINGX = "bingx",
    BINANCE = "binance",
    BYBIT = "bybit",
    HYPERLIQUID = "hyperliquid",
    BITGET = "bitget",
  }
  
  export enum MarketType {
    /** Market types */
    SPOT = "spot",
    FUTURES = "futures",
  }