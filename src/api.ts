import { createClient as createAuthClient } from "@crypticorn-ai/auth-service";
import { client as tradeClient } from "./trade/client.gen";
import { client as hiveClient } from "./hive/client.gen";
import { client as payClient } from "./pay/client.gen";
import { client as metricsClient } from "./metrics/client.gen";
import { client as dexClient } from "./dex/client.gen";
import { client as notificationClient } from "./notification/client.gen";
import { EconomicsNewsData, Kline, Prediction, Trend } from "./types";

// Internal types
type ServiceName = 
  | "hive" 
  | "trade" 
  | "pay" 
  | "metrics" 
  | "auth" 
  | "dex" 
  | "notification";

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
type ServiceClient = typeof hiveClient | 
  typeof tradeClient | 
  typeof payClient | 
  typeof metricsClient | 
  typeof dexClient | 
  typeof notificationClient;

interface ServiceDefinition {
  client: ServiceClient;
  path: string;
}

/**
 * Base class for Crypticorn API clients containing shared functionality.
 */
class BaseClient {
  protected _baseUrl: string;
  protected _apiKey?: string;
  protected _jwt?: string;
  protected _refreshToken?: string;
  protected _fetch?: typeof fetch;
  protected _services: Record<ServiceName, ServiceClient>;

  private readonly _serviceDefinitions: Record<ServiceName, ServiceDefinition> = {
    hive: { client: hiveClient, path: "v1/hive" },
    trade: { client: tradeClient, path: "v2/trade" },
    pay: { client: payClient, path: "v1/pay" },
    metrics: { client: metricsClient, path: "v1/metrics" },
    auth: { client: createAuthClient(), path: "v1/auth/trpc" },
    dex: { client: dexClient, path: "v1/dex" },
    notification: { client: notificationClient, path: "v1/notification" },
  };

  constructor(config: ClientConfig = {}) {
    // Ensure baseUrl does not end with a trailing slash
    const baseUrl = config.baseUrl || "https://api.crypticorn.com";
    this._baseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    this._apiKey = config.apiKey;
    this._jwt = config.jwt;
    this._refreshToken = config.refreshToken;
    this._fetch = config.fetch;

    this._services = this._createServices();
  }

  private _createServices(): Record<ServiceName, ServiceClient> {
    const services = {} as Record<ServiceName, ServiceClient>;
    
    for (const [name, definition] of Object.entries(this._serviceDefinitions) as [ServiceName, ServiceDefinition][]) {
      const serviceUrl = this._getServiceUrl(definition.path);
      const headers = this._getHeaders();
      
      // Configure the client with the service URL and headers
      if (name === 'auth') {
        // Auth service has a different structure
        services[name] = definition.client;
      } else {
        (definition.client as ReturnType<typeof createAuthClient>).setConfig({
          baseUrl: serviceUrl,
          headers,
          fetch: this._fetch
        });
        services[name] = definition.client;
      }
    }
    
    return services;
  }

  private _getServiceUrl(path: string): string {
    return `${this._baseUrl}/${path}`;
  }

  protected _getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (this._jwt) {
      headers["Authorization"] = `Bearer ${this._jwt}`;
    }

    if (this._refreshToken) {
      headers["X-Refresh-Token"] = this._refreshToken;
    }

    if (this._apiKey) {
      headers["X-API-Key"] = this._apiKey;
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
  get hive() {
    return this._services.hive;
  }

  get trade() {
    return this._services.trade;
  }

  get pay() {
    return this._services.pay;
  }

  get metrics() {
    return this._services.metrics;
  }

  get auth(): ReturnType<typeof createAuthClient> {
    return this._services.auth as ReturnType<typeof createAuthClient>;
  }

  get dex(): typeof dexClient {
    return this._services.dex as typeof dexClient;
  }

  get notification(): typeof notificationClient {
    return this._services.notification as typeof notificationClient;
  }

  /**
   * Configure a specific service with custom settings.
   * Useful for testing against local servers or different environments.
   */
  configure(service: ServiceName, config: Partial<ServiceConfig>): void {
    if (!(service in this._serviceDefinitions)) {
      throw new Error(`Invalid service: ${service}. Must be one of ${Object.keys(this._serviceDefinitions).join(", ")}`);
    }

    const definition = this._serviceDefinitions[service];
    const serviceUrl = config.host || this._getServiceUrl(definition.path);
    const headers = this._getHeaders();

    // Update headers with custom config
    if (config.jwt) {
      headers["Authorization"] = `Bearer ${config.jwt}`;
    }
    if (config.apiKey) {
      Object.assign(headers, config.apiKey);
    }

    // Configure the client with the service URL and headers
    if (service === 'auth') {
      // Auth service has a different structure
      this._services[service] = definition.client;
    } else {
      (definition.client as any).setConfig({
        baseUrl: serviceUrl,
        headers,
        fetch: this._fetch
      });
      this._services[service] = definition.client;
    }
  }
}

/**
 * The official async TypeScript client for interacting with the Crypticorn API.
 * It consists of multiple microservices covering the whole stack of the Crypticorn project.
 */
class AsyncClient extends BaseClient {
  public readonly api: {
    getLatestPredictions: (params?: {
      version?: string;
      klines?: number;
    }) => Promise<{
      predictions: Prediction[];
      klines: Record<string, Kline[]>;
    }>;
    getLatestTrends: () => Promise<Trend[]>;
    getEconomicsNewsData: (params?: {
      entries?: number;
      reverse?: boolean;
    }) => Promise<EconomicsNewsData>;
  };

  constructor(config: ClientConfig = {}) {
    super(config);
    
    // Create the api namespace with the required methods
    this.api = {
      getLatestPredictions: async ({
        version = "v1",
        klines = 20,
      }: {
        version?: string;
        klines?: number;
      } = {}) => {
        const headers = this._getHeaders();
        const response = await (this._fetch || globalThis.fetch)(
          `${this._baseUrl}/v1/predictions/latest?version=${version}&klines=${klines}`,
          { headers }
        );
        return response.json() as Promise<{
          predictions: Prediction[];
          klines: Record<string, Kline[]>;
        }>;
      },

      getLatestTrends: async () => {
        const headers = this._getHeaders();
        const response = await (this._fetch || globalThis.fetch)(
          `${this._baseUrl}/v1/trends/`,
          { headers }
        );
        return response.json() as Promise<Trend[]>;
      },

      getEconomicsNewsData: async ({
        entries = 100,
        reverse = false,
      }: {
        entries?: number;
        reverse?: boolean;
      } = {}): Promise<EconomicsNewsData> => {
        const headers = this._getHeaders();
        const response = await (this._fetch || globalThis.fetch)(
          `${this._baseUrl}/v1/miners/ec?entries=${entries}&reverse=${reverse}`,
          { headers }
        );
        const res = await response.json() as { data: any[] };
        
        // Cast the data array to the actual type
        const data = res.data.map((item) => {
          const [
            timestamp,
            country,
            event,
            currency,
            previous,
            estimate,
            actual,
            change,
            impact,
            changePercentage,
          ] = item;
          return {
            timestamp,
            country,
            event,
            currency,
            previous,
            estimate,
            actual,
            change,
            impact,
            changePercentage,
          };
        });
        return { data };
      },
    };
  }
}

export { AsyncClient };
