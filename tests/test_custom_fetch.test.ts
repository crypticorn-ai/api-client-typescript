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

  // All tests that used .api methods have been removed
  // Custom fetch is now only used by service clients (hive, trade, pay, etc.)
  
  it('should create client with custom fetch', () => {
    expect(client).toBeDefined();
    // Custom fetch is passed to service clients internally
    expect(client.hive).toBeDefined();
  });
});
