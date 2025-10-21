import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { AsyncClient } from '../src/api';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('AsyncClient', () => {
  let client: AsyncClient;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new AsyncClient();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic Instantiation', () => {
    it('should create client without errors', () => {
      expect(client).toBeDefined();
      expect(client.baseUrl).toBe('https://api.crypticorn.com');
    });

    it('should create client with custom baseUrl', () => {
      const customClient = new AsyncClient({
        baseUrl: 'https://custom.api.com',
      });
      expect(customClient.baseUrl).toBe('https://custom.api.com');
    });

    it('should create client with API key', () => {
      const clientWithKey = new AsyncClient({
        apiKey: 'test-api-key',
      });
      expect(clientWithKey.apiKey).toBe('test-api-key');
    });

    it('should create client with JWT token', () => {
      const clientWithJwt = new AsyncClient({
        jwt: 'test-jwt-token',
      });
      expect(clientWithJwt.jwt).toBe('test-jwt-token');
    });

    it('should create client with refresh token', () => {
      const clientWithRefresh = new AsyncClient({
        refreshToken: 'test-refresh-token',
      });
      expect(clientWithRefresh.refreshToken).toBe('test-refresh-token');
    });

    it('should create client with custom fetch', () => {
      const customFetch = vi.fn();
      const clientWithFetch = new AsyncClient({
        fetch: customFetch,
      });
      expect(clientWithFetch['_fetch']).toBe(customFetch);
    });
  });

  describe('Service Access', () => {
    it('should provide access to hive service', () => {
      expect(client.hive).toBeDefined();
    });

    it('should provide access to trade service', () => {
      expect(client.trade).toBeDefined();
    });

    it('should provide access to pay service', () => {
      expect(client.pay).toBeDefined();
    });

    it('should provide access to metrics service', () => {
      expect(client.metrics).toBeDefined();
    });

    it('should provide access to auth service', () => {
      expect(client.auth).toBeDefined();
    });

    it('should provide access to dex service', () => {
      expect(client.dex).toBeDefined();
    });

    it('should provide access to notification service', () => {
      expect(client.notification).toBeDefined();
    });
  });

  describe('API Methods', () => {
    it('should have getLatestPredictions method', () => {
      expect(client.api.getLatestPredictions).toBeDefined();
      expect(typeof client.api.getLatestPredictions).toBe('function');
    });

    it('should have getLatestTrends method', () => {
      expect(client.api.getLatestTrends).toBeDefined();
      expect(typeof client.api.getLatestTrends).toBe('function');
    });

    it('should have getEconomicsNewsData method', () => {
      expect(client.api.getEconomicsNewsData).toBeDefined();
      expect(typeof client.api.getEconomicsNewsData).toBe('function');
    });
  });

  describe('getLatestPredictions', () => {
    it('should call correct endpoint with default parameters', async () => {
      const mockResponse = {
        predictions: [],
        klines: {},
      };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await client.api.getLatestPredictions();

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.crypticorn.com/v1/predictions/latest?version=v1&klines=20',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should call correct endpoint with custom parameters', async () => {
      const mockResponse = {
        predictions: [],
        klines: {},
      };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await client.api.getLatestPredictions({
        version: 'v2',
        klines: 50,
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.crypticorn.com/v1/predictions/latest?version=v2&klines=50',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should include authorization headers when JWT is provided', async () => {
      const clientWithJwt = new AsyncClient({
        jwt: 'test-jwt-token',
      });
      const mockResponse = {
        predictions: [],
        klines: {},
      };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      await clientWithJwt.api.getLatestPredictions();

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.crypticorn.com/v1/predictions/latest?version=v1&klines=20',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer test-jwt-token',
          },
        }
      );
    });

    it('should include API key headers when API key is provided', async () => {
      const clientWithApiKey = new AsyncClient({
        apiKey: 'test-api-key',
      });
      const mockResponse = {
        predictions: [],
        klines: {},
      };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      await clientWithApiKey.api.getLatestPredictions();

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.crypticorn.com/v1/predictions/latest?version=v1&klines=20',
        {
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': 'test-api-key',
          },
        }
      );
    });
  });

  describe('getLatestTrends', () => {
    it('should call correct endpoint', async () => {
      const mockResponse = [];
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await client.api.getLatestTrends();

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.crypticorn.com/v1/trends/',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getEconomicsNewsData', () => {
    it('should call correct endpoint with default parameters', async () => {
      const mockResponse = {
        data: [
          [
            '2023-01-01T00:00:00Z',
            'US',
            'GDP',
            'USD',
            100,
            101,
            102,
            2,
            'High',
            2.0,
          ],
        ],
      };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await client.api.getEconomicsNewsData();

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.crypticorn.com/v1/miners/ec?entries=100&reverse=false',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      expect(result).toEqual({
        data: [
          {
            timestamp: '2023-01-01T00:00:00Z',
            country: 'US',
            event: 'GDP',
            currency: 'USD',
            previous: 100,
            estimate: 101,
            actual: 102,
            change: 2,
            impact: 'High',
            changePercentage: 2.0,
          },
        ],
      });
    });

    it('should call correct endpoint with custom parameters', async () => {
      const mockResponse = { data: [] };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await client.api.getEconomicsNewsData({
        entries: 50,
        reverse: true,
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.crypticorn.com/v1/miners/ec?entries=50&reverse=true',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      expect(result).toEqual({ data: [] });
    });
  });

  describe('Service Configuration', () => {
    it('should configure service with custom host', () => {
      expect(() => {
        client.configure('hive', { host: 'https://custom-hive.com' });
      }).not.toThrow();
    });

    it('should configure service with custom JWT', () => {
      expect(() => {
        client.configure('trade', { jwt: 'custom-jwt' });
      }).not.toThrow();
    });

    it('should configure service with custom API key', () => {
      expect(() => {
        client.configure('metrics', { apiKey: { 'X-Custom-Key': 'value' } });
      }).not.toThrow();
    });

    it('should throw error for invalid service', () => {
      expect(() => {
        client.configure('invalid' as any, { host: 'https://test.com' });
      }).toThrow('Invalid service: invalid');
    });
  });

  describe('Error Handling', () => {
    it('should handle fetch errors gracefully', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(client.api.getLatestPredictions()).rejects.toThrow(
        'Network error'
      );
    });

    it('should handle JSON parsing errors', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.reject(new Error('Invalid JSON')),
      });

      await expect(client.api.getLatestTrends()).rejects.toThrow('Invalid JSON');
    });
  });
});
