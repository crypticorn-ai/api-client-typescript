/**
 * Comprehensive error handling system defining various API error types, HTTP exceptions, and error content structures.
 */

/**
 * Type of the API error.
 */
export enum ApiErrorType {
  /** User error by people using our services */
  USER_ERROR = "user error",
  /** Re-tryable error by the exchange or network conditions */
  EXCHANGE_ERROR = "exchange error",
  /** Server error that needs a new version rollout for a fix */
  SERVER_ERROR = "server error",
  /** Error that does not need to be handled or does not affect the program or is a placeholder */
  NO_ERROR = "no error",
}

/**
 * Unique identifier of the API error.
 */
export enum ApiErrorIdentifier {
  ALLOCATION_BELOW_EXPOSURE = "allocation_below_current_exposure",
  ALLOCATION_BELOW_MINIMUM = "allocation_below_min_amount",
  ALLOCATION_LIMIT_EXCEEDED = "allocation_limit_exceeded",
  BLACK_SWAN = "black_swan",
  BOT_ALREADY_DELETED = "bot_already_deleted",
  BOT_STOPPING_COMPLETED = "bot_stopping_completed",
  BOT_STOPPING_STARTED = "bot_stopping_started",
  CANCELLED_OPEN_ORDER = "cancelled_open_order",
  CLIENT_ORDER_ID_REPEATED = "client_order_id_already_exists",
  CONTENT_TYPE_ERROR = "invalid_content_type",
  DELETE_BOT_ERROR = "delete_bot_error",
  EXCHANGE_HTTP_ERROR = "exchange_http_request_error",
  EXCHANGE_INVALID_PARAMETER = "exchange_invalid_parameter",
  EXCHANGE_INVALID_SIGNATURE = "exchange_invalid_signature",
  EXCHANGE_INVALID_TIMESTAMP = "exchange_invalid_timestamp",
  EXCHANGE_IP_RESTRICTED = "exchange_ip_address_is_not_authorized",
  EXCHANGE_KEY_ALREADY_EXISTS = "exchange_key_already_exists",
  EXCHANGE_KEY_IN_USE = "exchange_key_in_use",
  EXCHANGE_MAINTENANCE = "exchange_system_under_maintenance",
  EXCHANGE_RATE_LIMIT = "exchange_rate_limit_exceeded",
  EXCHANGE_PERMISSION_DENIED = "insufficient_permissions_spot_and_futures_required",
  EXCHANGE_SERVICE_UNAVAILABLE = "exchange_service_temporarily_unavailable",
  EXCHANGE_SYSTEM_BUSY = "exchange_system_is_busy",
  EXCHANGE_SYSTEM_CONFIG_ERROR = "exchange_system_configuration_error",
  EXCHANGE_SYSTEM_ERROR = "exchange_internal_system_error",
  EXCHANGE_USER_FROZEN = "exchange_user_account_is_frozen",
  EXPIRED_API_KEY = "api_key_expired",
  EXPIRED_BEARER = "bearer_token_expired",
  FAILED_OPEN_ORDER = "open_order_expired",
  FORBIDDEN = "forbidden",
  HEDGE_MODE_NOT_ACTIVE = "hedge_mode_not_active",
  INSUFFICIENT_BALANCE = "insufficient_balance",
  INSUFFICIENT_MARGIN = "insufficient_margin",
  INSUFFICIENT_SCOPES = "insufficient_scopes",
  INVALID_API_KEY = "invalid_api_key",
  INVALID_BEARER = "invalid_bearer",
  INVALID_DATA_REQUEST = "invalid_data",
  INVALID_DATA_RESPONSE = "invalid_data_response",
  INVALID_EXCHANGE_KEY = "invalid_exchange_key",
  INVALID_MODEL_NAME = "invalid_model_name",
  LEVERAGE_EXCEEDED = "leverage_limit_exceeded",
  LIQUIDATION_PRICE_VIOLATION = "order_violates_liquidation_price_constraints",
  MARGIN_MODE_CLASH = "margin_mode_clash",
  NAME_NOT_UNIQUE = "name_not_unique",
  NO_API_KEY = "no_api_key",
  NO_BEARER = "no_bearer",
  NO_CREDENTIALS = "no_credentials",
  NOW_API_DOWN = "now_api_down",
  OBJECT_ALREADY_EXISTS = "object_already_exists",
  OBJECT_CREATED = "object_created",
  OBJECT_DELETED = "object_deleted",
  OBJECT_LOCKED = "object_locked",
  OBJECT_NOT_FOUND = "object_not_found",
  OBJECT_UPDATED = "object_updated",
  ORDER_ALREADY_FILLED = "order_is_already_filled",
  ORDER_IN_PROCESS = "order_is_being_processed",
  ORDER_LIMIT_EXCEEDED = "order_quantity_limit_exceeded",
  ORDER_NOT_FOUND = "order_does_not_exist",
  ORDER_PRICE_INVALID = "order_price_is_invalid",
  ORDER_SIZE_TOO_LARGE = "order_size_too_large",
  ORDER_SIZE_TOO_SMALL = "order_size_too_small",
  ORPHAN_OPEN_ORDER = "orphan_open_order",
  ORPHAN_CLOSE_ORDER = "orphan_close_order",
  POSITION_LIMIT_EXCEEDED = "position_limit_exceeded",
  POSITION_NOT_FOUND = "position_does_not_exist",
  POSITION_SUSPENDED = "position_opening_temporarily_suspended",
  POST_ONLY_REJECTED = "post_only_order_would_immediately_match",
  REQUEST_SCOPE_EXCEEDED = "request_scope_limit_exceeded",
  RISK_LIMIT_EXCEEDED = "risk_limit_exceeded",
  RPC_TIMEOUT = "rpc_timeout",
  SETTLEMENT_IN_PROGRESS = "system_settlement_in_process",
  STRATEGY_DISABLED = "strategy_disabled",
  STRATEGY_LEVERAGE_MISMATCH = "strategy_leverage_mismatch",
  STRATEGY_NOT_SUPPORTING_EXCHANGE = "strategy_not_supporting_exchange",
  SUCCESS = "success",
  SYMBOL_NOT_FOUND = "symbol_does_not_exist",
  TRADING_ACTION_EXPIRED = "trading_action_expired",
  TRADING_ACTION_SKIPPED_BOT_STOPPING = "TRADING_ACTION_SKIPPED_BOT_STOPPING",
  TRADING_LOCKED = "trading_has_been_locked",
  TRADING_SUSPENDED = "trading_is_suspended",
  UNKNOWN_ERROR = "unknown_error_occurred",
  URL_NOT_FOUND = "requested_resource_not_found",
}

/**
 * Level of the API error.
 */
export enum ApiErrorLevel {
  ERROR = "error",
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
}

/**
 * Crypticorn API error enumeration.
 */
export class ApiError {
  constructor(
    public readonly identifier: ApiErrorIdentifier,
    public readonly type: ApiErrorType,
    public readonly level: ApiErrorLevel
  ) {}

  // Allocation Errors
  static readonly ALLOCATION_BELOW_EXPOSURE = new ApiError(
    ApiErrorIdentifier.ALLOCATION_BELOW_EXPOSURE,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly ALLOCATION_BELOW_MINIMUM = new ApiError(
    ApiErrorIdentifier.ALLOCATION_BELOW_MINIMUM,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly ALLOCATION_LIMIT_EXCEEDED = new ApiError(
    ApiErrorIdentifier.ALLOCATION_LIMIT_EXCEEDED,
    ApiErrorType.NO_ERROR,
    ApiErrorLevel.INFO
  );

  // Bot Related Errors
  static readonly BLACK_SWAN = new ApiError(
    ApiErrorIdentifier.BLACK_SWAN,
    ApiErrorType.EXCHANGE_ERROR,
    ApiErrorLevel.INFO
  );

  static readonly BOT_ALREADY_DELETED = new ApiError(
    ApiErrorIdentifier.BOT_ALREADY_DELETED,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.INFO
  );

  static readonly BOT_STOPPING_COMPLETED = new ApiError(
    ApiErrorIdentifier.BOT_STOPPING_COMPLETED,
    ApiErrorType.NO_ERROR,
    ApiErrorLevel.SUCCESS
  );

  static readonly BOT_STOPPING_STARTED = new ApiError(
    ApiErrorIdentifier.BOT_STOPPING_STARTED,
    ApiErrorType.NO_ERROR,
    ApiErrorLevel.SUCCESS
  );

  // Order Related Errors
  static readonly CANCELLED_OPEN_ORDER = new ApiError(
    ApiErrorIdentifier.CANCELLED_OPEN_ORDER,
    ApiErrorType.NO_ERROR,
    ApiErrorLevel.INFO
  );

  static readonly CLIENT_ORDER_ID_REPEATED = new ApiError(
    ApiErrorIdentifier.CLIENT_ORDER_ID_REPEATED,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly CONTENT_TYPE_ERROR = new ApiError(
    ApiErrorIdentifier.CONTENT_TYPE_ERROR,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly DELETE_BOT_ERROR = new ApiError(
    ApiErrorIdentifier.DELETE_BOT_ERROR,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  // Exchange Related Errors
  static readonly EXCHANGE_HTTP_ERROR = new ApiError(
    ApiErrorIdentifier.EXCHANGE_HTTP_ERROR,
    ApiErrorType.EXCHANGE_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly EXCHANGE_INVALID_SIGNATURE = new ApiError(
    ApiErrorIdentifier.EXCHANGE_INVALID_SIGNATURE,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly EXCHANGE_INVALID_TIMESTAMP = new ApiError(
    ApiErrorIdentifier.EXCHANGE_INVALID_TIMESTAMP,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly EXCHANGE_IP_RESTRICTED = new ApiError(
    ApiErrorIdentifier.EXCHANGE_IP_RESTRICTED,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly EXCHANGE_KEY_ALREADY_EXISTS = new ApiError(
    ApiErrorIdentifier.EXCHANGE_KEY_ALREADY_EXISTS,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly EXCHANGE_KEY_IN_USE = new ApiError(
    ApiErrorIdentifier.EXCHANGE_KEY_IN_USE,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly EXCHANGE_MAINTENANCE = new ApiError(
    ApiErrorIdentifier.EXCHANGE_MAINTENANCE,
    ApiErrorType.EXCHANGE_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly EXCHANGE_RATE_LIMIT = new ApiError(
    ApiErrorIdentifier.EXCHANGE_RATE_LIMIT,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly EXCHANGE_PERMISSION_DENIED = new ApiError(
    ApiErrorIdentifier.EXCHANGE_PERMISSION_DENIED,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly EXCHANGE_SERVICE_UNAVAILABLE = new ApiError(
    ApiErrorIdentifier.EXCHANGE_SERVICE_UNAVAILABLE,
    ApiErrorType.EXCHANGE_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly EXCHANGE_SYSTEM_BUSY = new ApiError(
    ApiErrorIdentifier.EXCHANGE_SYSTEM_BUSY,
    ApiErrorType.EXCHANGE_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly EXCHANGE_SYSTEM_CONFIG_ERROR = new ApiError(
    ApiErrorIdentifier.EXCHANGE_SYSTEM_CONFIG_ERROR,
    ApiErrorType.EXCHANGE_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly EXCHANGE_SYSTEM_ERROR = new ApiError(
    ApiErrorIdentifier.EXCHANGE_SYSTEM_ERROR,
    ApiErrorType.EXCHANGE_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly EXCHANGE_USER_FROZEN = new ApiError(
    ApiErrorIdentifier.EXCHANGE_USER_FROZEN,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  // Authentication Errors
  static readonly EXPIRED_API_KEY = new ApiError(
    ApiErrorIdentifier.EXPIRED_API_KEY,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly EXPIRED_BEARER = new ApiError(
    ApiErrorIdentifier.EXPIRED_BEARER,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly FAILED_OPEN_ORDER = new ApiError(
    ApiErrorIdentifier.FAILED_OPEN_ORDER,
    ApiErrorType.NO_ERROR,
    ApiErrorLevel.INFO
  );

  static readonly FORBIDDEN = new ApiError(
    ApiErrorIdentifier.FORBIDDEN,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly HEDGE_MODE_NOT_ACTIVE = new ApiError(
    ApiErrorIdentifier.HEDGE_MODE_NOT_ACTIVE,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  // Balance and Margin Errors
  static readonly INSUFFICIENT_BALANCE = new ApiError(
    ApiErrorIdentifier.INSUFFICIENT_BALANCE,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly INSUFFICIENT_MARGIN = new ApiError(
    ApiErrorIdentifier.INSUFFICIENT_MARGIN,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly INSUFFICIENT_SCOPES = new ApiError(
    ApiErrorIdentifier.INSUFFICIENT_SCOPES,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  // Validation Errors
  static readonly INVALID_API_KEY = new ApiError(
    ApiErrorIdentifier.INVALID_API_KEY,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly INVALID_BEARER = new ApiError(
    ApiErrorIdentifier.INVALID_BEARER,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly INVALID_DATA_REQUEST = new ApiError(
    ApiErrorIdentifier.INVALID_DATA_REQUEST,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly INVALID_DATA_RESPONSE = new ApiError(
    ApiErrorIdentifier.INVALID_DATA_RESPONSE,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly INVALID_EXCHANGE_KEY = new ApiError(
    ApiErrorIdentifier.INVALID_EXCHANGE_KEY,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly INVALID_MODEL_NAME = new ApiError(
    ApiErrorIdentifier.INVALID_MODEL_NAME,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly EXCHANGE_INVALID_PARAMETER = new ApiError(
    ApiErrorIdentifier.EXCHANGE_INVALID_PARAMETER,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  // Trading Related Errors
  static readonly LEVERAGE_EXCEEDED = new ApiError(
    ApiErrorIdentifier.LEVERAGE_EXCEEDED,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly LIQUIDATION_PRICE_VIOLATION = new ApiError(
    ApiErrorIdentifier.LIQUIDATION_PRICE_VIOLATION,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly MARGIN_MODE_CLASH = new ApiError(
    ApiErrorIdentifier.MARGIN_MODE_CLASH,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly NAME_NOT_UNIQUE = new ApiError(
    ApiErrorIdentifier.NAME_NOT_UNIQUE,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  // Authentication Errors
  static readonly NO_API_KEY = new ApiError(
    ApiErrorIdentifier.NO_API_KEY,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly NO_BEARER = new ApiError(
    ApiErrorIdentifier.NO_BEARER,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly NO_CREDENTIALS = new ApiError(
    ApiErrorIdentifier.NO_CREDENTIALS,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly NOW_API_DOWN = new ApiError(
    ApiErrorIdentifier.NOW_API_DOWN,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  // Object Related Errors
  static readonly OBJECT_ALREADY_EXISTS = new ApiError(
    ApiErrorIdentifier.OBJECT_ALREADY_EXISTS,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly OBJECT_CREATED = new ApiError(
    ApiErrorIdentifier.OBJECT_CREATED,
    ApiErrorType.NO_ERROR,
    ApiErrorLevel.SUCCESS
  );

  static readonly OBJECT_DELETED = new ApiError(
    ApiErrorIdentifier.OBJECT_DELETED,
    ApiErrorType.NO_ERROR,
    ApiErrorLevel.SUCCESS
  );

  static readonly OBJECT_LOCKED = new ApiError(
    ApiErrorIdentifier.OBJECT_LOCKED,
    ApiErrorType.NO_ERROR,
    ApiErrorLevel.INFO
  );

  static readonly OBJECT_NOT_FOUND = new ApiError(
    ApiErrorIdentifier.OBJECT_NOT_FOUND,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly OBJECT_UPDATED = new ApiError(
    ApiErrorIdentifier.OBJECT_UPDATED,
    ApiErrorType.NO_ERROR,
    ApiErrorLevel.SUCCESS
  );

  // Order Related Errors
  static readonly ORDER_ALREADY_FILLED = new ApiError(
    ApiErrorIdentifier.ORDER_ALREADY_FILLED,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.INFO
  );

  static readonly ORDER_IN_PROCESS = new ApiError(
    ApiErrorIdentifier.ORDER_IN_PROCESS,
    ApiErrorType.NO_ERROR,
    ApiErrorLevel.INFO
  );

  static readonly ORDER_LIMIT_EXCEEDED = new ApiError(
    ApiErrorIdentifier.ORDER_LIMIT_EXCEEDED,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly ORDER_NOT_FOUND = new ApiError(
    ApiErrorIdentifier.ORDER_NOT_FOUND,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly ORDER_PRICE_INVALID = new ApiError(
    ApiErrorIdentifier.ORDER_PRICE_INVALID,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly ORDER_SIZE_TOO_LARGE = new ApiError(
    ApiErrorIdentifier.ORDER_SIZE_TOO_LARGE,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.WARNING
  );

  static readonly ORDER_SIZE_TOO_SMALL = new ApiError(
    ApiErrorIdentifier.ORDER_SIZE_TOO_SMALL,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.WARNING
  );

  static readonly ORPHAN_OPEN_ORDER = new ApiError(
    ApiErrorIdentifier.ORPHAN_OPEN_ORDER,
    ApiErrorType.NO_ERROR,
    ApiErrorLevel.WARNING
  );

  static readonly ORPHAN_CLOSE_ORDER = new ApiError(
    ApiErrorIdentifier.ORPHAN_CLOSE_ORDER,
    ApiErrorType.NO_ERROR,
    ApiErrorLevel.WARNING
  );

  // Position Related Errors
  static readonly POSITION_LIMIT_EXCEEDED = new ApiError(
    ApiErrorIdentifier.POSITION_LIMIT_EXCEEDED,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly POSITION_NOT_FOUND = new ApiError(
    ApiErrorIdentifier.POSITION_NOT_FOUND,
    ApiErrorType.NO_ERROR,
    ApiErrorLevel.WARNING
  );

  static readonly POSITION_SUSPENDED = new ApiError(
    ApiErrorIdentifier.POSITION_SUSPENDED,
    ApiErrorType.EXCHANGE_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly POST_ONLY_REJECTED = new ApiError(
    ApiErrorIdentifier.POST_ONLY_REJECTED,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  // Rate Limit Errors
  static readonly REQUEST_SCOPE_EXCEEDED = new ApiError(
    ApiErrorIdentifier.REQUEST_SCOPE_EXCEEDED,
    ApiErrorType.EXCHANGE_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly RISK_LIMIT_EXCEEDED = new ApiError(
    ApiErrorIdentifier.RISK_LIMIT_EXCEEDED,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly RPC_TIMEOUT = new ApiError(
    ApiErrorIdentifier.RPC_TIMEOUT,
    ApiErrorType.EXCHANGE_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly SETTLEMENT_IN_PROGRESS = new ApiError(
    ApiErrorIdentifier.SETTLEMENT_IN_PROGRESS,
    ApiErrorType.EXCHANGE_ERROR,
    ApiErrorLevel.ERROR
  );

  // Strategy Related Errors
  static readonly STRATEGY_DISABLED = new ApiError(
    ApiErrorIdentifier.STRATEGY_DISABLED,
    ApiErrorType.NO_ERROR,
    ApiErrorLevel.WARNING
  );
  
  static readonly STRATEGY_LEVERAGE_MISMATCH = new ApiError(
    ApiErrorIdentifier.STRATEGY_LEVERAGE_MISMATCH,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );
  static readonly STRATEGY_NOT_SUPPORTING_EXCHANGE = new ApiError(
    ApiErrorIdentifier.STRATEGY_NOT_SUPPORTING_EXCHANGE,
    ApiErrorType.NO_ERROR,
    ApiErrorLevel.WARNING
  );


  // Success and Not Found Errors
  static readonly SUCCESS = new ApiError(
    ApiErrorIdentifier.SUCCESS,
    ApiErrorType.NO_ERROR,
    ApiErrorLevel.SUCCESS
  );

  static readonly SYMBOL_NOT_FOUND = new ApiError(
    ApiErrorIdentifier.SYMBOL_NOT_FOUND,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  // Trading Action Errors
  static readonly TRADING_ACTION_EXPIRED = new ApiError(
    ApiErrorIdentifier.TRADING_ACTION_EXPIRED,
    ApiErrorType.NO_ERROR,
    ApiErrorLevel.INFO
  );

  static readonly TRADING_ACTION_SKIPPED_BOT_STOPPING = new ApiError(
    ApiErrorIdentifier.TRADING_ACTION_SKIPPED_BOT_STOPPING,
    ApiErrorType.NO_ERROR,
    ApiErrorLevel.INFO
  );

  static readonly TRADING_LOCKED = new ApiError(
    ApiErrorIdentifier.TRADING_LOCKED,
    ApiErrorType.EXCHANGE_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly TRADING_SUSPENDED = new ApiError(
    ApiErrorIdentifier.TRADING_SUSPENDED,
    ApiErrorType.EXCHANGE_ERROR,
    ApiErrorLevel.ERROR
  );

  // Unknown and URL Errors
  static readonly UNKNOWN_ERROR = new ApiError(
    ApiErrorIdentifier.UNKNOWN_ERROR,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static readonly URL_NOT_FOUND = new ApiError(
    ApiErrorIdentifier.URL_NOT_FOUND,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static getApiError(identifier: ApiErrorIdentifier): ApiError {
    const error = (ApiError as any)[
      Object.keys(ApiError).find((key) => {
        const val = (ApiError as any)[key];
        return val instanceof ApiError && val.identifier === identifier;
      })!
    ];
    if (!error) {
      console.error(`Unknown error identifier: ${identifier}`);
      return ApiError.UNKNOWN_ERROR;
    }
    return error;
  }
}
