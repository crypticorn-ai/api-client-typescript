export interface Envelope<T> {
  items: T[];
  next_cursor: string | null;
  as_of: string;
  meta: Record<string, unknown>;
}

export interface NewsArticle {
  id: string;
  source: string;
  source_key: string;
  link: string;
  title: string;
  description: string | null;
  lang: string;
  category: string;
  tags: string[];
  published_at: string;
}

export interface NewsFilterParams {
  from?: string;
  to?: string;
  asset?: string;
  source?: string;
  category?: string;
  lang?: string;
  limit?: number;
  cursor?: string;
}

export interface NewsSearchParams extends NewsFilterParams {
  q: string;
  mode?: 'fts' | 'semantic';
}
