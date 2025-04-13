export * from "./api";
export * from "./types";
// https://stackoverflow.com/questions/41293108/how-to-do-re-export-with-overrides
import { HTTPValidationErrorSchema, ValidationErrorSchema } from "./pay";
import { HTTPValidationError, PingError, PingResponse } from "./pay/types.gen";
import { Exchange } from "./klines/types.gen";
import { ExchangeSchema } from "./klines/schemas.gen";
export * from "./trade/schemas.gen";
export * from "./trade/types.gen";
export * from "./pay/schemas.gen";
export * from "./pay/types.gen";
export * from "./klines/schemas.gen";
export * from "./klines/types.gen";
export { HTTPValidationErrorSchema, ValidationErrorSchema };
export { ExchangeSchema, Exchange };
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