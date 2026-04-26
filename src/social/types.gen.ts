export interface Envelope<T> {
  items: T[];
  next_cursor: string | null;
  as_of: string;
  meta: Record<string, unknown>;
}

export interface SocialFilterParams {
  from?: string;
  to?: string;
  asset?: string;
  source?: string;
  limit?: number;
  cursor?: string;
}
