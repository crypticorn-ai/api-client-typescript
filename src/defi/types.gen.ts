export interface Envelope<T> {
  items: T[];
  next_cursor: string | null;
  as_of: string;
  meta: Record<string, unknown>;
}

export interface DefiProtocolQuery {
  chain?: string;
  category?: string;
  from?: string;
  to?: string;
  limit?: number;
  cursor?: string;
}

export interface DefiYieldQuery {
  chain?: string;
  asset?: string;
  min_apy?: number;
  max_apy?: number;
  limit?: number;
}
