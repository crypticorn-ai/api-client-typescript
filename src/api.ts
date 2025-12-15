import { createClient as createAuthClient } from './auth';
import { createClient as createHiveClient } from './hive';
import { createClient as createTradeClient } from './trade';
import { createClient as createPayClient } from './pay';
import { createClient as createMetricsClient } from './metrics';
import { createClient as createDexClient } from './dex';
import { createClient as createNotificationClient } from './notification';
import { createClient as createIndicatorClient } from './indicator';

// Internal types
type ServiceName =
  | 'hive'
  | 'trade'
  | 'pay'
  | 'metrics'
  | 'auth'
  | 'dex'
  | 'notification'
  | 'indicator';

/**
 * Configuration options for the Crypticorn API client.
 *
 * @interface ClientConfig
 */
interface ClientConfig {
  /**
   * API key for authenticating with the Crypticorn API.
   * Used for programmatic access and server-to-server communication.
   */
  apiKey?: string;

  /**
   * JSON Web Token (JWT) access token for user authentication.
   * This should be a valid JWT token obtained from the authentication service.
   */
  jwt?: string;

  /**
   * Refresh token for obtaining new access tokens when the current JWT expires.
   * Used in conjunction with the JWT for automatic token refresh.
   */
  refreshToken?: string;

  /**
   * Base URL for the Crypticorn API.
   * Defaults to 'https://api.crypticorn.com' if not specified.
   *
   * @default 'https://api.crypticorn.com'
   */
  baseUrl?: string;

  /**
   * Custom fetch implementation to use for HTTP requests.
   * Useful for testing, custom request handling, or when running in environments
   * where the global fetch is not available.
   */
  fetch?: typeof fetch;
}

interface ServiceConfig {
  host: string;
  jwt?: string;
  apiKey?: Record<string, string>;
}

// Service client types
type ServiceClient =
  | ReturnType<typeof createAuthClient>
  | ReturnType<typeof createHiveClient>
  | ReturnType<typeof createTradeClient>
  | ReturnType<typeof createPayClient>
  | ReturnType<typeof createMetricsClient>
  | ReturnType<typeof createDexClient>
  | ReturnType<typeof createNotificationClient>
  | ReturnType<typeof createIndicatorClient>;

type ServiceClientFactory = (
  host: string,
  headers: Record<string, string>,
  fetchImpl?: typeof fetch,
) => ServiceClient;

interface ServiceDefinition {
  factory: ServiceClientFactory;
  path: string;
}

/**
 * The official async TypeScript client for interacting with the Crypticorn API.
 * It consists of multiple microservices covering the whole stack of the Crypticorn project.
 */
class AsyncClient {
  protected _baseUrl: string;
  protected _apiKey?: string;
  protected _jwt?: string;
  protected _refreshToken?: string;
  protected _fetch?: typeof fetch;
  protected _services: Record<ServiceName, ServiceClient>;

  private readonly _serviceDefinitions: Record<ServiceName, ServiceDefinition> =
    {
      hive: { factory: createHiveClient, path: 'v1/hive' },
      trade: { factory: createTradeClient, path: 'v2/trade' },
      pay: { factory: createPayClient, path: 'v1/pay' },
      metrics: { factory: createMetricsClient, path: 'v1/metrics' },
      auth: { factory: createAuthClient, path: 'v1/auth' },
      dex: { factory: createDexClient, path: 'v2/dex' },
      notification: {
        factory: createNotificationClient,
        path: 'v1/notification',
      },
      indicator: {
        factory: createIndicatorClient,
        path: 'v1/indicator',
      },
    };

  constructor(config: ClientConfig = {}) {
    // Ensure baseUrl does not end with a trailing slash
    const baseUrl = config.baseUrl || 'https://api.crypticorn.com';
    this._baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    this._apiKey = config.apiKey;
    this._jwt = config.jwt;
    this._refreshToken = config.refreshToken;
    this._fetch = config.fetch;

    this._services = this._createServices();
  }

  private _createServices(): Record<ServiceName, ServiceClient> {
    const services = {} as Record<ServiceName, ServiceClient>;

    for (const [name, definition] of Object.entries(
      this._serviceDefinitions,
    ) as [ServiceName, ServiceDefinition][]) {
      const serviceUrl = this._getServiceUrl(definition.path);
      const headers = this._getHeaders();
      services[name] = definition.factory(serviceUrl, headers, this._fetch);
    }

    return services;
  }

  private _getServiceUrl(path: string): string {
    return `${this._baseUrl}/${path}`;
  }

  protected _getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this._jwt) {
      headers['Authorization'] = `Bearer ${this._jwt}`;
    }

    if (this._refreshToken) {
      headers['X-Refresh-Token'] = this._refreshToken;
    }

    if (this._apiKey) {
      headers['X-API-Key'] = this._apiKey;
    }

    return headers;
  }

  // Getters
  get baseUrl(): string {
    return this._baseUrl;
  }

  get apiKey(): string | undefined {
    return this._apiKey;
  }

  get jwt(): string | undefined {
    return this._jwt;
  }

  get refreshToken(): string | undefined {
    return this._refreshToken;
  }

  // Service accessors
  get hive(): ReturnType<typeof createHiveClient> {
    return this._services.hive as ReturnType<typeof createHiveClient>;
  }

  get trade(): ReturnType<typeof createTradeClient> {
    return this._services.trade as ReturnType<typeof createTradeClient>;
  }

  get pay(): ReturnType<typeof createPayClient> {
    return this._services.pay as ReturnType<typeof createPayClient>;
  }

  get metrics(): ReturnType<typeof createMetricsClient> {
    return this._services.metrics as ReturnType<typeof createMetricsClient>;
  }

  get auth(): ReturnType<typeof createAuthClient> {
    return this._services.auth as ReturnType<typeof createAuthClient>;
  }

  get dex(): ReturnType<typeof createDexClient> {
    return this._services.dex as ReturnType<typeof createDexClient>;
  }

  get notification(): ReturnType<typeof createNotificationClient> {
    return this._services.notification as ReturnType<
      typeof createNotificationClient
    >;
  }

  get indicator(): ReturnType<typeof createIndicatorClient> {
    return this._services.indicator as ReturnType<typeof createIndicatorClient>;
  }

  /**
   * Configure a specific service with custom settings.
   * Useful for testing against local servers or different environments.
   */
  configure(service: ServiceName, config: Partial<ServiceConfig>): void {
    if (!(service in this._serviceDefinitions)) {
      throw new Error(
        `Invalid service: ${service}. Must be one of ${Object.keys(this._serviceDefinitions).join(', ')}`,
      );
    }

    const definition = this._serviceDefinitions[service];
    const serviceUrl = config.host || this._getServiceUrl(definition.path);
    const headers = this._getHeaders();

    // Update headers with custom config
    if (config.jwt) {
      headers['Authorization'] = `Bearer ${config.jwt}`;
    }
    if (config.apiKey) {
      Object.assign(headers, config.apiKey);
    }

    this._services[service] = definition.factory(
      serviceUrl,
      headers,
      this._fetch,
    );
  }
}

export { AsyncClient };
