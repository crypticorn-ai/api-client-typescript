import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AsyncClient } from '../src/api';

describe('Custom Fetch Integration', () => {
  let mockFetch: ReturnType<typeof vi.fn>;
  let client: AsyncClient;

  beforeEach(() => {
    mockFetch = vi.fn();
    client = new AsyncClient({
      fetch: mockFetch,
    });
  });

  describe('Custom Fetch Usage', () => {
    it('should use custom fetch for getLatestPredictions', async () => {
      const mockResponse = {
        predictions: [],
        klines: {},
      };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      await client.api.getLatestPredictions();

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.crypticorn.com/v1/predictions/latest?version=v1&klines=20',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    });

    it('should use custom fetch for getLatestTrends', async () => {
      const mockResponse = [];
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      await client.api.getLatestTrends();

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.crypticorn.com/v1/trends/',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    });

    it('should use custom fetch for getEconomicsNewsData', async () => {
      const mockResponse = { data: [] };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      await client.api.getEconomicsNewsData();

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.crypticorn.com/v1/miners/ec?entries=100&reverse=false',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    });
  });

  describe('Custom Fetch Error Handling', () => {
    it('should propagate custom fetch errors', async () => {
      const customError = new Error('Custom fetch error');
      mockFetch.mockRejectedValueOnce(customError);

      await expect(client.api.getLatestPredictions()).rejects.toThrow(
        'Custom fetch error'
      );
    });

    it('should handle custom fetch timeout', async () => {
      const timeoutError = new Error('Request timeout');
      mockFetch.mockRejectedValueOnce(timeoutError);

      await expect(client.api.getLatestTrends()).rejects.toThrow(
        'Request timeout'
      );
    });

    it('should handle custom fetch network errors', async () => {
      const networkError = new Error('Network error');
      mockFetch.mockRejectedValueOnce(networkError);

      await expect(client.api.getEconomicsNewsData()).rejects.toThrow(
        'Network error'
      );
    });
  });

  describe('Custom Fetch with Authentication', () => {
    it('should use custom fetch with JWT authentication', async () => {
      const clientWithJwt = new AsyncClient({
        fetch: mockFetch,
        jwt: 'test-jwt-token',
      });
      const mockResponse = { predictions: [], klines: {} };
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

    it('should use custom fetch with API key authentication', async () => {
      const clientWithApiKey = new AsyncClient({
        fetch: mockFetch,
        apiKey: 'test-api-key',
      });
      const mockResponse = [];
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      await clientWithApiKey.api.getLatestTrends();

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.crypticorn.com/v1/trends/',
        {
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': 'test-api-key',
          },
        }
      );
    });

    it('should use custom fetch with all authentication methods', async () => {
      const clientWithAllAuth = new AsyncClient({
        fetch: mockFetch,
        jwt: 'test-jwt',
        apiKey: 'test-api-key',
        refreshToken: 'test-refresh',
      });
      const mockResponse = { data: [] };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      await clientWithAllAuth.api.getEconomicsNewsData();

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.crypticorn.com/v1/miners/ec?entries=100&reverse=false',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer test-jwt',
            'X-API-Key': 'test-api-key',
            'X-Refresh-Token': 'test-refresh',
          },
        }
      );
    });
  });

  describe('Custom Fetch with Custom Base URL', () => {
    it('should use custom fetch with custom base URL', async () => {
      const clientWithCustomUrl = new AsyncClient({
        fetch: mockFetch,
        baseUrl: 'https://staging.api.crypticorn.com',
      });
      const mockResponse = { predictions: [], klines: {} };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      await clientWithCustomUrl.api.getLatestPredictions();

      expect(mockFetch).toHaveBeenCalledWith(
        'https://staging.api.crypticorn.com/v1/predictions/latest?version=v1&klines=20',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    });
  });

  describe('Custom Fetch Response Handling', () => {
    it('should handle custom fetch returning non-JSON response', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.reject(new Error('Invalid JSON')),
      });

      await expect(client.api.getLatestPredictions()).rejects.toThrow(
        'Invalid JSON'
      );
    });

    it('should handle custom fetch returning empty response', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(null),
      });

      const result = await client.api.getLatestPredictions();
      expect(result).toBeNull();
    });

    it('should handle custom fetch returning undefined response', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(undefined),
      });

      const result = await client.api.getLatestTrends();
      expect(result).toBeUndefined();
    });
  });
});
