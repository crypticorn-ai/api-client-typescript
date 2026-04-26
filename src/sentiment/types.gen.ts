export interface Envelope<T> {
  items: T[];
  next_cursor: string | null;
  as_of: string;
  meta: Record<string, unknown>;
}

export interface SentimentSignalQuery {
  min_confidence?: number;
  min_articles?: number;
  limit?: number;
}

export interface AssetSentimentQuery {
  from?: string;
  to?: string;
  limit?: number;
}
