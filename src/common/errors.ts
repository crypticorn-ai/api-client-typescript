export enum ApiErrorType {
  /** The error type */
  USER_ERROR = "user error",
  EXCHANGE_ERROR = "exchange error",
  SERVER_ERROR = "server error",
  NO_ERROR = "no error",
}

// we may not need this, but it's here for now
export enum ApiErrorIdentifier {
  ALLOCATION_BELOW_EXPOSURE = "allocation_below_current_exposure",
  ALLOCATION_BELOW_MINIMUM = "allocation_below_min_amount",
  ALPHANUMERIC_CHARACTERS_ONLY = "alphanumeric_characters_only",
  BLACK_SWAN = "black_swan",
  BOT_ALREADY_DELETED = "bot_already_deleted",
  BOT_DISABLED = "bot_disabled",
  BOT_STOPPING_COMPLETED = "bot_stopping_completed",
  CLIENT_ORDER_ID_REPEATED = "client_order_id_already_exists",
  CONTENT_TYPE_ERROR = "invalid_content_type",
  DELETE_BOT_ERROR = "delete_bot_error",
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
  FORBIDDEN = "forbidden",
  HEDGE_MODE_NOT_ACTIVE = "hedge_mode_not_active",
  HTTP_ERROR = "http_request_error",
  INSUFFICIENT_BALANCE = "insufficient_balance",
  INSUFFICIENT_MARGIN = "insufficient_margin",
  INSUFFICIENT_SCOPES = "insufficient_scopes",
  INVALID_API_KEY = "invalid_api_key",
  INVALID_BEARER = "invalid_bearer",
  INVALID_DATA_REQUEST = "invalid_data",
  INVALID_DATA_RESPONSE = "invalid_data_response",
  INVALID_EXCHANGE_KEY = "invalid_exchange_key",
  INVALID_MARGIN_MODE = "invalid_margin_mode",
  INVALID_PARAMETER = "invalid_parameter_provided",
  LEVERAGE_EXCEEDED = "leverage_limit_exceeded",
  LIQUIDATION_PRICE_VIOLATION = "order_violates_liquidation_price_constraints",
  NO_CREDENTIALS = "no_credentials",
  NOW_API_DOWN = "now_api_down",
  OBJECT_NOT_FOUND = "object_not_found",
  OBJECT_ALREADY_EXISTS = "object_already_exists",
  ORDER_ALREADY_FILLED = "order_is_already_filled",
  ORDER_IN_PROCESS = "order_is_being_processed",
  ORDER_LIMIT_EXCEEDED = "order_quantity_limit_exceeded",
  ORDER_NOT_FOUND = "order_does_not_exist",
  ORDER_PRICE_INVALID = "order_price_is_invalid",
  ORDER_SIZE_TOO_LARGE = "order_size_too_large",
  ORDER_SIZE_TOO_SMALL = "order_size_too_small",
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
  TRADING_ACTION_SKIPPED = "trading_action_skipped",
  TRADING_LOCKED = "trading_has_been_locked",
  TRADING_SUSPENDED = "trading_is_suspended",
  UNKNOWN_ERROR = "unknown_error_occurred",
  URL_NOT_FOUND = "requested_resource_not_found",
}

export enum ApiErrorLevel {
  ERROR = "error",
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
}

export class ApiError {
  constructor(
    public identifier: ApiErrorIdentifier,
    public type: ApiErrorType,
    public level: ApiErrorLevel
  ) {}

  static ALLOCATION_BELOW_EXPOSURE = new ApiError(
    ApiErrorIdentifier.ALLOCATION_BELOW_EXPOSURE,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static ALLOCATION_BELOW_MINIMUM = new ApiError(
    ApiErrorIdentifier.ALLOCATION_BELOW_MINIMUM,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static ALPHANUMERIC_CHARACTERS_ONLY = new ApiError(
    ApiErrorIdentifier.ALPHANUMERIC_CHARACTERS_ONLY,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static BLACK_SWAN = new ApiError(
    ApiErrorIdentifier.BLACK_SWAN,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.INFO
  );

  static BOT_ALREADY_DELETED = new ApiError(
    ApiErrorIdentifier.BOT_ALREADY_DELETED,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static BOT_DISABLED = new ApiError(
    ApiErrorIdentifier.BOT_DISABLED,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.WARNING
  );

  static BOT_STOPPING_COMPLETED = new ApiError(
    ApiErrorIdentifier.BOT_STOPPING_COMPLETED,
    ApiErrorType.NO_ERROR,
    ApiErrorLevel.INFO
  );

  static CLIENT_ORDER_ID_REPEATED = new ApiError(
    ApiErrorIdentifier.CLIENT_ORDER_ID_REPEATED,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static CONTENT_TYPE_ERROR = new ApiError(
    ApiErrorIdentifier.CONTENT_TYPE_ERROR,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static DELETE_BOT_ERROR = new ApiError(
    ApiErrorIdentifier.DELETE_BOT_ERROR,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static EXCHANGE_INVALID_SIGNATURE = new ApiError(
    ApiErrorIdentifier.EXCHANGE_INVALID_SIGNATURE,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static EXCHANGE_INVALID_TIMESTAMP = new ApiError(
    ApiErrorIdentifier.EXCHANGE_INVALID_TIMESTAMP,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static EXCHANGE_IP_RESTRICTED = new ApiError(
    ApiErrorIdentifier.EXCHANGE_IP_RESTRICTED,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static EXCHANGE_KEY_ALREADY_EXISTS = new ApiError(
    ApiErrorIdentifier.EXCHANGE_KEY_ALREADY_EXISTS,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static EXCHANGE_KEY_IN_USE = new ApiError(
    ApiErrorIdentifier.EXCHANGE_KEY_IN_USE,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static EXCHANGE_MAINTENANCE = new ApiError(
    ApiErrorIdentifier.EXCHANGE_MAINTENANCE,
    ApiErrorType.EXCHANGE_ERROR,
    ApiErrorLevel.ERROR
  );

  static EXCHANGE_RATE_LIMIT = new ApiError(
    ApiErrorIdentifier.EXCHANGE_RATE_LIMIT,
    ApiErrorType.EXCHANGE_ERROR,
    ApiErrorLevel.ERROR
  );

  static EXCHANGE_PERMISSION_DENIED = new ApiError(
    ApiErrorIdentifier.EXCHANGE_PERMISSION_DENIED,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static EXCHANGE_SERVICE_UNAVAILABLE = new ApiError(
    ApiErrorIdentifier.EXCHANGE_SERVICE_UNAVAILABLE,
    ApiErrorType.EXCHANGE_ERROR,
    ApiErrorLevel.ERROR
  );

  static EXCHANGE_SYSTEM_BUSY = new ApiError(
    ApiErrorIdentifier.EXCHANGE_SYSTEM_BUSY,
    ApiErrorType.EXCHANGE_ERROR,
    ApiErrorLevel.ERROR
  );

  static EXCHANGE_SYSTEM_CONFIG_ERROR = new ApiError(
    ApiErrorIdentifier.EXCHANGE_SYSTEM_CONFIG_ERROR,
    ApiErrorType.EXCHANGE_ERROR,
    ApiErrorLevel.ERROR
  );

  static EXCHANGE_SYSTEM_ERROR = new ApiError(
    ApiErrorIdentifier.EXCHANGE_SYSTEM_ERROR,
    ApiErrorType.EXCHANGE_ERROR,
    ApiErrorLevel.ERROR
  );

  static EXCHANGE_USER_FROZEN = new ApiError(
    ApiErrorIdentifier.EXCHANGE_USER_FROZEN,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static EXPIRED_API_KEY = new ApiError(
    ApiErrorIdentifier.EXPIRED_API_KEY,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static EXPIRED_BEARER = new ApiError(
    ApiErrorIdentifier.EXPIRED_BEARER,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static FORBIDDEN = new ApiError(
    ApiErrorIdentifier.FORBIDDEN,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static HEDGE_MODE_NOT_ACTIVE = new ApiError(
    ApiErrorIdentifier.HEDGE_MODE_NOT_ACTIVE,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static HTTP_ERROR = new ApiError(
    ApiErrorIdentifier.HTTP_ERROR,
    ApiErrorType.EXCHANGE_ERROR,
    ApiErrorLevel.ERROR
  );

  static INSUFFICIENT_BALANCE = new ApiError(
    ApiErrorIdentifier.INSUFFICIENT_BALANCE,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static INSUFFICIENT_MARGIN = new ApiError(
    ApiErrorIdentifier.INSUFFICIENT_MARGIN,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static INSUFFICIENT_SCOPES = new ApiError(
    ApiErrorIdentifier.INSUFFICIENT_SCOPES,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static INVALID_API_KEY = new ApiError(
    ApiErrorIdentifier.INVALID_API_KEY,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static INVALID_BEARER = new ApiError(
    ApiErrorIdentifier.INVALID_BEARER,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static INVALID_DATA_REQUEST = new ApiError(
    ApiErrorIdentifier.INVALID_DATA_REQUEST,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static INVALID_DATA_RESPONSE = new ApiError(
    ApiErrorIdentifier.INVALID_DATA_RESPONSE,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static INVALID_EXCHANGE_KEY = new ApiError(
    ApiErrorIdentifier.INVALID_EXCHANGE_KEY,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static INVALID_MARGIN_MODE = new ApiError(
    ApiErrorIdentifier.INVALID_MARGIN_MODE,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static INVALID_PARAMETER = new ApiError(
    ApiErrorIdentifier.INVALID_PARAMETER,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static LEVERAGE_EXCEEDED = new ApiError(
    ApiErrorIdentifier.LEVERAGE_EXCEEDED,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static LIQUIDATION_PRICE_VIOLATION = new ApiError(
    ApiErrorIdentifier.LIQUIDATION_PRICE_VIOLATION,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static NO_CREDENTIALS = new ApiError(
    ApiErrorIdentifier.NO_CREDENTIALS,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static NOW_API_DOWN = new ApiError(
    ApiErrorIdentifier.NOW_API_DOWN,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static OBJECT_NOT_FOUND = new ApiError(
    ApiErrorIdentifier.OBJECT_NOT_FOUND,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static OBJECT_ALREADY_EXISTS = new ApiError(
    ApiErrorIdentifier.OBJECT_ALREADY_EXISTS,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static ORDER_ALREADY_FILLED = new ApiError(
    ApiErrorIdentifier.ORDER_ALREADY_FILLED,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.INFO
  );

  static ORDER_IN_PROCESS = new ApiError(
    ApiErrorIdentifier.ORDER_IN_PROCESS,
    ApiErrorType.NO_ERROR,
    ApiErrorLevel.INFO
  );

  static ORDER_LIMIT_EXCEEDED = new ApiError(
    ApiErrorIdentifier.ORDER_LIMIT_EXCEEDED,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static ORDER_NOT_FOUND = new ApiError(
    ApiErrorIdentifier.ORDER_NOT_FOUND,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static ORDER_PRICE_INVALID = new ApiError(
    ApiErrorIdentifier.ORDER_PRICE_INVALID,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static ORDER_SIZE_TOO_LARGE = new ApiError(
    ApiErrorIdentifier.ORDER_SIZE_TOO_LARGE,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.WARNING
  );

  static ORDER_SIZE_TOO_SMALL = new ApiError(
    ApiErrorIdentifier.ORDER_SIZE_TOO_SMALL,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.WARNING
  );

  static POSITION_LIMIT_EXCEEDED = new ApiError(
    ApiErrorIdentifier.POSITION_LIMIT_EXCEEDED,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static POSITION_NOT_FOUND = new ApiError(
    ApiErrorIdentifier.POSITION_NOT_FOUND,
    ApiErrorType.NO_ERROR,
    ApiErrorLevel.INFO
  );

  static POSITION_SUSPENDED = new ApiError(
    ApiErrorIdentifier.POSITION_SUSPENDED,
    ApiErrorType.EXCHANGE_ERROR,
    ApiErrorLevel.ERROR
  );

  static POST_ONLY_REJECTED = new ApiError(
    ApiErrorIdentifier.POST_ONLY_REJECTED,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static REQUEST_SCOPE_EXCEEDED = new ApiError(
    ApiErrorIdentifier.REQUEST_SCOPE_EXCEEDED,
    ApiErrorType.EXCHANGE_ERROR,
    ApiErrorLevel.ERROR
  );

  static RISK_LIMIT_EXCEEDED = new ApiError(
    ApiErrorIdentifier.RISK_LIMIT_EXCEEDED,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static RPC_TIMEOUT = new ApiError(
    ApiErrorIdentifier.RPC_TIMEOUT,
    ApiErrorType.EXCHANGE_ERROR,
    ApiErrorLevel.ERROR
  );

  static SETTLEMENT_IN_PROGRESS = new ApiError(
    ApiErrorIdentifier.SETTLEMENT_IN_PROGRESS,
    ApiErrorType.EXCHANGE_ERROR,
    ApiErrorLevel.ERROR
  );

  static STRATEGY_DISABLED = new ApiError(
    ApiErrorIdentifier.STRATEGY_DISABLED,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static STRATEGY_LEVERAGE_MISMATCH = new ApiError(
    ApiErrorIdentifier.STRATEGY_LEVERAGE_MISMATCH,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static STRATEGY_NOT_SUPPORTING_EXCHANGE = new ApiError(
    ApiErrorIdentifier.STRATEGY_NOT_SUPPORTING_EXCHANGE,
    ApiErrorType.USER_ERROR,
    ApiErrorLevel.ERROR
  );

  static SUCCESS = new ApiError(
    ApiErrorIdentifier.SUCCESS,
    ApiErrorType.NO_ERROR,
    ApiErrorLevel.SUCCESS
  );

  static SYMBOL_NOT_FOUND = new ApiError(
    ApiErrorIdentifier.SYMBOL_NOT_FOUND,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static TRADING_ACTION_EXPIRED = new ApiError(
    ApiErrorIdentifier.TRADING_ACTION_EXPIRED,
    ApiErrorType.NO_ERROR,
    ApiErrorLevel.INFO
  );

  static TRADING_ACTION_SKIPPED = new ApiError(
    ApiErrorIdentifier.TRADING_ACTION_SKIPPED,
    ApiErrorType.NO_ERROR,
    ApiErrorLevel.INFO
  );

  static TRADING_LOCKED = new ApiError(
    ApiErrorIdentifier.TRADING_LOCKED,
    ApiErrorType.EXCHANGE_ERROR,
    ApiErrorLevel.ERROR
  );

  static TRADING_SUSPENDED = new ApiError(
    ApiErrorIdentifier.TRADING_SUSPENDED,
    ApiErrorType.EXCHANGE_ERROR,
    ApiErrorLevel.ERROR
  );

  static URL_NOT_FOUND = new ApiError(
    ApiErrorIdentifier.URL_NOT_FOUND,
    ApiErrorType.SERVER_ERROR,
    ApiErrorLevel.ERROR
  );

  static UNKNOWN_ERROR = new ApiError(
    ApiErrorIdentifier.UNKNOWN_ERROR,
    ApiErrorType.EXCHANGE_ERROR,
    ApiErrorLevel.ERROR
  );

  get statusCode(): number {
    return HttpStatusMapper.getStatusCode(this);
  }
}

export class HttpStatusMapper {
  private static mapping: Map<ApiError, number> = new Map([
    [ApiError.EXPIRED_BEARER, 401],
    [ApiError.INVALID_BEARER, 401],
    [ApiError.EXPIRED_API_KEY, 401],
    [ApiError.INVALID_API_KEY, 401],
    [ApiError.NO_CREDENTIALS, 401],
    [ApiError.INSUFFICIENT_SCOPES, 403],
    [ApiError.EXCHANGE_PERMISSION_DENIED, 403],
    [ApiError.EXCHANGE_USER_FROZEN, 403],
    [ApiError.TRADING_LOCKED, 403],
    [ApiError.FORBIDDEN, 403],
    [ApiError.URL_NOT_FOUND, 404],
    [ApiError.OBJECT_NOT_FOUND, 404],
    [ApiError.ORDER_NOT_FOUND, 404],
    [ApiError.POSITION_NOT_FOUND, 404],
    [ApiError.SYMBOL_NOT_FOUND, 404],
    [ApiError.CLIENT_ORDER_ID_REPEATED, 409],
    [ApiError.OBJECT_ALREADY_EXISTS, 409],
    [ApiError.EXCHANGE_KEY_ALREADY_EXISTS, 409],
    [ApiError.BOT_ALREADY_DELETED, 409],
    [ApiError.CONTENT_TYPE_ERROR, 415],
    [ApiError.INVALID_DATA_REQUEST, 422],
    [ApiError.INVALID_DATA_RESPONSE, 422],
    [ApiError.EXCHANGE_RATE_LIMIT, 429],
    [ApiError.REQUEST_SCOPE_EXCEEDED, 429],
    [ApiError.UNKNOWN_ERROR, 500],
    [ApiError.EXCHANGE_SYSTEM_ERROR, 500],
    [ApiError.NOW_API_DOWN, 500],
    [ApiError.RPC_TIMEOUT, 500],
    [ApiError.EXCHANGE_SERVICE_UNAVAILABLE, 503],
    [ApiError.EXCHANGE_MAINTENANCE, 503],
    [ApiError.EXCHANGE_SYSTEM_BUSY, 503],
    [ApiError.SETTLEMENT_IN_PROGRESS, 503],
    [ApiError.POSITION_SUSPENDED, 503],
    [ApiError.TRADING_SUSPENDED, 503],
    [ApiError.ALPHANUMERIC_CHARACTERS_ONLY, 400],
    [ApiError.ALLOCATION_BELOW_EXPOSURE, 400],
    [ApiError.ALLOCATION_BELOW_MINIMUM, 400],
    [ApiError.BLACK_SWAN, 400],
    [ApiError.BOT_DISABLED, 400],
    [ApiError.DELETE_BOT_ERROR, 400],
    [ApiError.EXCHANGE_INVALID_SIGNATURE, 400],
    [ApiError.EXCHANGE_INVALID_TIMESTAMP, 400],
    [ApiError.EXCHANGE_IP_RESTRICTED, 400],
    [ApiError.EXCHANGE_KEY_IN_USE, 400],
    [ApiError.EXCHANGE_SYSTEM_CONFIG_ERROR, 400],
    [ApiError.HEDGE_MODE_NOT_ACTIVE, 400],
    [ApiError.HTTP_ERROR, 400],
    [ApiError.INSUFFICIENT_BALANCE, 400],
    [ApiError.INSUFFICIENT_MARGIN, 400],
    [ApiError.INVALID_EXCHANGE_KEY, 400],
    [ApiError.INVALID_MARGIN_MODE, 400],
    [ApiError.INVALID_PARAMETER, 400],
    [ApiError.LEVERAGE_EXCEEDED, 400],
    [ApiError.LIQUIDATION_PRICE_VIOLATION, 400],
    [ApiError.ORDER_ALREADY_FILLED, 400],
    [ApiError.ORDER_IN_PROCESS, 400],
    [ApiError.ORDER_LIMIT_EXCEEDED, 400],
    [ApiError.ORDER_PRICE_INVALID, 400],
    [ApiError.ORDER_SIZE_TOO_LARGE, 400],
    [ApiError.ORDER_SIZE_TOO_SMALL, 400],
    [ApiError.POSITION_LIMIT_EXCEEDED, 400],
    [ApiError.POST_ONLY_REJECTED, 400],
    [ApiError.RISK_LIMIT_EXCEEDED, 400],
    [ApiError.STRATEGY_DISABLED, 400],
    [ApiError.STRATEGY_LEVERAGE_MISMATCH, 400],
    [ApiError.STRATEGY_NOT_SUPPORTING_EXCHANGE, 400],
    [ApiError.TRADING_ACTION_EXPIRED, 400],
    [ApiError.TRADING_ACTION_SKIPPED, 400],
    [ApiError.SUCCESS, 200],
    [ApiError.BOT_STOPPING_COMPLETED, 200],
  ]);

  static getStatusCode(error: ApiError): number {
    return this.mapping.get(error) || 500;
  }
}
