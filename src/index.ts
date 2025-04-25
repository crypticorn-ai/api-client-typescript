export * from "./api";
export * from "./types";
// https://stackoverflow.com/questions/41293108/how-to-do-re-export-with-overrides

// trade
export * from "./trade/schemas.gen";
export * from "./trade/types.gen";
// pay
import { HTTPValidationErrorSchema, ValidationErrorSchema } from "./pay";
import { HTTPValidationError, PingError, PingResponse } from "./pay/types.gen";
export * from "./pay/schemas.gen";
export * from "./pay/types.gen";
export { HTTPValidationErrorSchema, ValidationErrorSchema }; // pay
// klines
import { Exchange, MarketType, BaseResponse_HealthCheckResponse_, BaseResponse_List_str__, HealthCheckResponse, ErrorResponse } from "./klines/types.gen";
import { ExchangeSchema, MarketTypeSchema, HealthCheckResponseSchema, BaseResponse_List_str__Schema, BaseResponse_HealthCheckResponse_Schema, ErrorResponseSchema } from "./klines/schemas.gen";
export * from "./klines/schemas.gen";
export * from "./klines/types.gen";
export { ExchangeSchema, Exchange, MarketTypeSchema, MarketType, HealthCheckResponseSchema, BaseResponse_HealthCheckResponse_, BaseResponse_List_str__Schema, BaseResponse_HealthCheckResponse_Schema, BaseResponse_List_str__, HealthCheckResponse, ErrorResponse, ErrorResponseSchema }; // klines
// sentiment
import { BaseResponse_HealthCheckResponse_ as SentimentHealthCheckResponse } from "./sentiment/types.gen";
import { BaseResponse_HealthCheckResponse_Schema as SentimentHealthCheckResponseSchema } from "./sentiment/schemas.gen";
export * from "./sentiment/schemas.gen";
export * from "./sentiment/types.gen";
export { SentimentHealthCheckResponseSchema, SentimentHealthCheckResponse }; // sentiment
// metrics
import { BaseResponse_HealthCheckResponse_ as MetricsHealthCheckResponse } from "./metrics/types.gen";
import { BaseResponse_HealthCheckResponse_Schema as MetricsHealthCheckResponseSchema } from "./metrics/schemas.gen";
export * from "./metrics/schemas.gen";
export * from "./metrics/types.gen";
export { MetricsHealthCheckResponseSchema, MetricsHealthCheckResponse }; // metrics
export { HTTPValidationError, PingError, PingResponse };
export {
  isValidationError,
  type ValidationErrorData,
  type CustomErrorCode,
  type ValidationError,
  Scope,
  getDefaultJwtAdminScopes,
  getDefaultJwtScopes
} from "@crypticorn-ai/auth-service";
export * from "./hive";