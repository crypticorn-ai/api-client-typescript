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

});
