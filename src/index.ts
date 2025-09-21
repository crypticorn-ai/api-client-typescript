// Main client exports
export { AsyncClient } from "./api";

// Export types that users might need
export * from "./types";
// trade
import * as TradeSchemas from "./trade/schemas.gen";
import * as TradeTypes from "./trade/types.gen";
export { TradeTypes, TradeSchemas };
// pay
import * as PaySchemas from "./pay/schemas.gen";
import * as PayTypes from "./pay/types.gen";
export { PayTypes, PaySchemas };
// sentiment
import * as SentimentSchemas from "./sentiment/schemas.gen";
import * as SentimentTypes from "./sentiment/types.gen";
export { SentimentSchemas, SentimentTypes };
// metrics
import * as MetricsSchemas from "./metrics/schemas.gen";
import * as MetricsTypes from "./metrics/types.gen";
export { MetricsSchemas, MetricsTypes };
// klines
import * as KlinesSchemas from "./klines/schemas.gen";
import * as KlinesTypes from "./klines/types.gen";
export { KlinesSchemas, KlinesTypes };
// hive
import * as HiveSchemas from "./hive/schemas.gen";
import * as HiveTypes from "./hive/types.gen";
export { HiveSchemas, HiveTypes };
// auth
import * as AuthSchemas from "@crypticorn-ai/auth-service";
import * as AuthTypes from "@crypticorn-ai/auth-service";
export { AuthSchemas, AuthTypes };
// dex
import * as DexSchemas from "./dex/schemas.gen";
import * as DexTypes from "./dex/types.gen";
export { DexSchemas, DexTypes };
// notification
import * as NotificationSchemas from "./notification/schemas.gen";
import * as NotificationTypes from "./notification/types.gen";
export { NotificationSchemas, NotificationTypes };