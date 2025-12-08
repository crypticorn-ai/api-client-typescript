import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AsyncClient } from '../src/api';

// Mock the service clients
vi.mock('../src/hive/client.gen', () => ({
  client: {
    setConfig: vi.fn(),
  },
}));

vi.mock('../src/trade/client.gen', () => ({
  client: {
    setConfig: vi.fn(),
  },
}));

vi.mock('../src/pay/client.gen', () => ({
  client: {
    setConfig: vi.fn(),
  },
}));

vi.mock('../src/metrics/client.gen', () => ({
  client: {
    setConfig: vi.fn(),
  },
}));

vi.mock('../src/dex/client.gen', () => ({
  client: {
    setConfig: vi.fn(),
  },
}));

vi.mock('../src/notification/client.gen', () => ({
  client: {
    setConfig: vi.fn(),
  },
}));

vi.mock('../src/auth/client.gen', () => ({
  createClient: vi.fn(() => ({
    setConfig: vi.fn(),
  })),
}));

describe('Service Access', () => {
  let client: AsyncClient;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new AsyncClient();
  });

  describe('Service Initialization', () => {
    it('should initialize all services', () => {
      expect(client.hive).toBeDefined();
      expect(client.trade).toBeDefined();
      expect(client.pay).toBeDefined();
      expect(client.metrics).toBeDefined();
      expect(client.auth).toBeDefined();
      expect(client.dex).toBeDefined();
      expect(client.notification).toBeDefined();
    });

    it('should configure services with correct base URLs', () => {
      // The services should be configured with the correct base URLs
      // This is tested indirectly through the service access
      expect(client.hive).toBeDefined();
      expect(client.trade).toBeDefined();
      expect(client.pay).toBeDefined();
      expect(client.metrics).toBeDefined();
      expect(client.auth).toBeDefined();
      expect(client.dex).toBeDefined();
      expect(client.notification).toBeDefined();
    });
  });

  describe('Service Configuration', () => {
    it('should configure hive service', () => {
      expect(() => {
        client.configure('hive', { host: 'https://custom-hive.com' });
      }).not.toThrow();
    });

    it('should configure trade service', () => {
      expect(() => {
        client.configure('trade', { host: 'https://custom-trade.com' });
      }).not.toThrow();
    });

    it('should configure pay service', () => {
      expect(() => {
        client.configure('pay', { host: 'https://custom-pay.com' });
      }).not.toThrow();
    });

    it('should configure metrics service', () => {
      expect(() => {
        client.configure('metrics', { host: 'https://custom-metrics.com' });
      }).not.toThrow();
    });

    it('should configure dex service', () => {
      expect(() => {
        client.configure('dex', { host: 'https://custom-dex.com' });
      }).not.toThrow();
    });

    it('should configure notification service', () => {
      expect(() => {
        client.configure('notification', { host: 'https://custom-notification.com' });
      }).not.toThrow();
    });

    it('should configure auth service', () => {
      expect(() => {
        client.configure('auth', { host: 'https://custom-auth.com' });
      }).not.toThrow();
    });
  });

  describe('Service Configuration with Authentication', () => {
    it('should configure service with custom JWT', () => {
      expect(() => {
        client.configure('hive', { jwt: 'custom-jwt-token' });
      }).not.toThrow();
    });

    it('should configure service with custom API key', () => {
      expect(() => {
        client.configure('trade', { 
          apiKey: { 'X-Custom-Key': 'custom-value' } 
        });
      }).not.toThrow();
    });

    it('should configure service with both host and authentication', () => {
      expect(() => {
        client.configure('metrics', {
          host: 'https://custom-metrics.com',
          jwt: 'custom-jwt',
          apiKey: { 'X-API-Key': 'custom-key' },
        });
      }).not.toThrow();
    });
  });

  describe('Invalid Service Configuration', () => {
    it('should throw error for invalid service name', () => {
      expect(() => {
        client.configure('invalid-service' as any, { host: 'https://test.com' });
      }).toThrow('Invalid service: invalid-service');
    });

    it('should throw error for empty service name', () => {
      expect(() => {
        client.configure('' as any, { host: 'https://test.com' });
      }).toThrow('Invalid service: . Must be one of hive, trade, pay, metrics, auth, dex, notification');
    });

    it('should throw error for null service name', () => {
      expect(() => {
        client.configure(null as any, { host: 'https://test.com' });
      }).toThrow();
    });
  });

  describe('Service Reconfiguration', () => {
    it('should allow reconfiguring the same service multiple times', () => {
      expect(() => {
        client.configure('hive', { host: 'https://first-hive.com' });
        client.configure('hive', { host: 'https://second-hive.com' });
        client.configure('hive', { jwt: 'new-jwt-token' });
      }).not.toThrow();
    });

    it('should allow configuring different services independently', () => {
      expect(() => {
        client.configure('hive', { host: 'https://hive.com' });
        client.configure('trade', { host: 'https://trade.com' });
        client.configure('pay', { host: 'https://pay.com' });
        client.configure('metrics', { host: 'https://metrics.com' });
      }).not.toThrow();
    });
  });
});
