import type { Envelope, SocialFilterParams } from './types.gen';

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
    getPosts: (query: SocialFilterParams = {}) =>
      fetchImpl(`${baseUrl}/posts${buildQuery(query)}`, { headers }).then((res) => res.json() as Promise<Envelope<Record<string, unknown>>>),
    getMetrics: (query: Omit<SocialFilterParams, 'cursor'> = {}) =>
      fetchImpl(`${baseUrl}/metrics${buildQuery(query)}`, { headers }).then((res) => res.json() as Promise<Envelope<Record<string, unknown>>>),
    getTrending: (query: { window_hours?: number; limit?: number } = {}) =>
      fetchImpl(`${baseUrl}/trending${buildQuery(query)}`, { headers }).then((res) => res.json() as Promise<Envelope<Record<string, unknown>>>),
  };
}
