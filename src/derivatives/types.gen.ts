export interface Envelope<T> {
  items: T[];
  next_cursor: string | null;
  as_of: string;
  meta: Record<string, unknown>;
}

export interface FundingRatesLatestQuery {
  asset?: string;
  exchange?: string;
  min_abs_rate?: number;
  stale_after_minutes?: number;
  limit?: number;
}

export interface FundingRatesHistoryQuery {
  asset?: string;
  exchange?: string;
  venue_symbol?: string;
  from?: string;
  to?: string;
  limit?: number;
  cursor?: string;
}

export interface FundingIntervalsQuery {
  asset?: string;
  exchange?: string;
  only_verified?: boolean;
  limit?: number;
}

export interface FundingOpportunitiesQuery {
  asset?: string;
  exchange?: string;
  settlement_type?: 'both' | 'long_only' | 'long_only_reversed' | 'short_only' | 'short_only_reversed';
  min_net_profit?: number;
  from?: string;
  to?: string;
  limit?: number;
  cursor?: string;
}
