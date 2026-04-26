import type { AssetSentimentQuery, Envelope, SentimentSignalQuery } from './types.gen';

const buildQuery = (query: object): string => {
  const entries = Object.entries(query as Record<string, unknown>);
  const params = new URLSearchParams();
  entries.forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    params.set(key, String(value));
  });
  const queryString = params.toString();
  return queryString.length > 0 ? `?${queryString}` : '';
};

export function createClient(
  baseUrl: string,
  headers: Record<string, string>,
  fetchImpl: typeof fetch = globalThis.fetch,
) {
  return {
    getAssetSentiment: (asset: string, query: AssetSentimentQuery = {}) =>
      fetchImpl(`${baseUrl}/assets/${asset}${buildQuery(query)}`, { headers }).then((res) => res.json() as Promise<Envelope<Record<string, unknown>>>),
    getArticleSentiment: (articleId: string) =>
      fetchImpl(`${baseUrl}/articles/${articleId}`, { headers }).then((res) => res.json() as Promise<Record<string, unknown>>),
    getSignals: (query: SentimentSignalQuery = {}) =>
      fetchImpl(`${baseUrl}/signals${buildQuery(query)}`, { headers }).then((res) => res.json() as Promise<Envelope<Record<string, unknown>>>),
  };
}
