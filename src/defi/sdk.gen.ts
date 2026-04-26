import type { DefiProtocolQuery, DefiYieldQuery, Envelope } from './types.gen';

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
    getProtocols: (query: DefiProtocolQuery = {}) =>
      fetchImpl(`${baseUrl}/protocols${buildQuery(query)}`, { headers }).then((res) => res.json() as Promise<Envelope<Record<string, unknown>>>),
    getYields: (query: DefiYieldQuery = {}) =>
      fetchImpl(`${baseUrl}/yields${buildQuery(query)}`, { headers }).then((res) => res.json() as Promise<Envelope<Record<string, unknown>>>),
    getChain: (chain: string) =>
      fetchImpl(`${baseUrl}/chains/${chain}`, { headers }).then((res) => res.json() as Promise<Record<string, unknown>>),
  };
}
