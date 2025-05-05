/** Supported exchanges for trading */
export enum Exchange {
  KUCOIN = "kucoin",
  BINGX = "bingx",
}

/** All exchanges we are using, including public (Exchange) */
export enum InternalExchange {
  KUCOIN = "kucoin",
  BINGX = "bingx",
  BINANCE = "binance",
  BYBIT = "bybit",
  HYPERLIQUID = "hyperliquid",
  BITGET = "bitget",
}

/** Market types */
export enum MarketType {
  SPOT = "spot",
  FUTURES = "futures",
}
