import { describe, it, expect } from 'vitest';
import { AsyncClient } from '../src/api';

describe('Client Configuration', () => {
  describe('Base URL Configuration', () => {
    it('should use default base URL when not provided', () => {
      const client = new AsyncClient();
      expect(client.baseUrl).toBe('https://api.crypticorn.com');
    });

    it('should use custom base URL when provided', () => {
      const client = new AsyncClient({
        baseUrl: 'https://staging.api.crypticorn.com',
      });
      expect(client.baseUrl).toBe('https://staging.api.crypticorn.com');
    });

    it('should remove trailing slash from base URL', () => {
      const client = new AsyncClient({
        baseUrl: 'https://api.crypticorn.com/',
      });
      expect(client.baseUrl).toBe('https://api.crypticorn.com');
    });

    it('should handle base URL with path', () => {
      const client = new AsyncClient({
        baseUrl: 'https://api.crypticorn.com/v1',
      });
      expect(client.baseUrl).toBe('https://api.crypticorn.com/v1');
    });
  });

  describe('Authentication Configuration', () => {
    it('should store API key', () => {
      const client = new AsyncClient({
        apiKey: 'test-api-key-123',
      });
      expect(client.apiKey).toBe('test-api-key-123');
    });

    it('should store JWT token', () => {
      const client = new AsyncClient({
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test',
      });
      expect(client.jwt).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test');
    });

    it('should store refresh token', () => {
      const client = new AsyncClient({
        refreshToken: 'refresh-token-123',
      });
      expect(client.refreshToken).toBe('refresh-token-123');
    });

    it('should handle all authentication methods together', () => {
      const client = new AsyncClient({
        apiKey: 'test-api-key',
        jwt: 'test-jwt',
        refreshToken: 'test-refresh',
      });
      expect(client.apiKey).toBe('test-api-key');
      expect(client.jwt).toBe('test-jwt');
      expect(client.refreshToken).toBe('test-refresh');
    });
  });

  describe('Custom Fetch Configuration', () => {
    it('should store custom fetch function', () => {
      const customFetch = () => Promise.resolve(new Response());
      const client = new AsyncClient({
        fetch: customFetch,
      });
      expect(client['_fetch']).toBe(customFetch);
    });

    it('should work without custom fetch (use global fetch)', () => {
      const client = new AsyncClient();
      expect(client['_fetch']).toBeUndefined();
    });
  });

  describe('Environment-specific Configuration', () => {
    it('should work with localhost configuration', () => {
      const client = new AsyncClient({
        baseUrl: 'http://localhost:3000',
        apiKey: 'local-dev-key',
      });
      expect(client.baseUrl).toBe('http://localhost:3000');
      expect(client.apiKey).toBe('local-dev-key');
    });

    it('should work with staging configuration', () => {
      const client = new AsyncClient({
        baseUrl: 'https://staging-api.crypticorn.com',
        jwt: 'staging-jwt-token',
      });
      expect(client.baseUrl).toBe('https://staging-api.crypticorn.com');
      expect(client.jwt).toBe('staging-jwt-token');
    });

    it('should work with production configuration', () => {
      const client = new AsyncClient({
        baseUrl: 'https://api.crypticorn.com',
        apiKey: 'prod-api-key',
        jwt: 'prod-jwt-token',
        refreshToken: 'prod-refresh-token',
      });
      expect(client.baseUrl).toBe('https://api.crypticorn.com');
      expect(client.apiKey).toBe('prod-api-key');
      expect(client.jwt).toBe('prod-jwt-token');
      expect(client.refreshToken).toBe('prod-refresh-token');
    });
  });
});
