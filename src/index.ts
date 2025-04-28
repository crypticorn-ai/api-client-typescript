export * from "./api";
export * from "./types";
// https://stackoverflow.com/questions/41293108/how-to-do-re-export-with-overrides

// common 
export * from "./common/enums";
export * from "./common/exceptions";
export * from "./common/errors";


// trade
export * from "./trade/schemas.gen";
export * from "./trade/types.gen";
// pay
import { HTTPValidationErrorSchema, ValidationErrorSchema } from "./pay";
import { HTTPValidationError, PingError, PingResponse } from "./pay/types.gen";
export * from "./pay/schemas.gen";
export * from "./pay/types.gen";
export { HTTPValidationErrorSchema, ValidationErrorSchema }; // pay
// sentiment
export * from "./sentiment/schemas.gen";
export * from "./sentiment/types.gen";
// metrics
import { ApiErrorIdentifierSchema, ApiErrorLevelSchema, ApiErrorTypeSchema, MarketTypeSchema } from "./metrics/schemas.gen";
import { ApiErrorIdentifier, ApiErrorLevel, ApiErrorType, MarketType } from "./metrics/types.gen";
export * from "./metrics/schemas.gen";
export * from "./metrics/types.gen";
export { ApiErrorIdentifierSchema, ApiErrorLevelSchema, ApiErrorTypeSchema, MarketTypeSchema, ApiErrorIdentifier, ApiErrorLevel, ApiErrorType, MarketType }; // metrics
// klines
import { ApiErrorIdentifierSchema as KlinesApiErrorIdentifierSchema, ApiErrorLevelSchema as KlinesApiErrorLevelSchema, ApiErrorTypeSchema as KlinesApiErrorTypeSchema, MarketTypeSchema as KlinesMarketTypeSchema } from "./klines/schemas.gen";
import { ApiErrorIdentifier as KlinesApiErrorIdentifier, ApiErrorLevel as KlinesApiErrorLevel, ApiErrorType as KlinesApiErrorType, MarketType as KlinesMarketType } from "./klines/types.gen";
export * from "./klines/schemas.gen";
export * from "./klines/types.gen";
export { KlinesApiErrorIdentifierSchema, KlinesApiErrorLevelSchema, KlinesApiErrorTypeSchema, KlinesMarketTypeSchema, KlinesApiErrorIdentifier, KlinesApiErrorLevel, KlinesApiErrorType, KlinesMarketType }; // klines

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