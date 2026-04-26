import type {
  Envelope,
  FundingIntervalsQuery,
  FundingOpportunitiesQuery,
  FundingRatesHistoryQuery,
  FundingRatesLatestQuery,
} from './types.gen';

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
    getFundingRatesLatest: (query: FundingRatesLatestQuery = {}) =>
      fetchImpl(`${baseUrl}/funding-rates/latest${buildQuery(query)}`, { headers }).then(
        (res) => res.json() as Promise<Envelope<Record<string, unknown>>>,
      ),
    getFundingRatesHistory: (query: FundingRatesHistoryQuery = {}) =>
      fetchImpl(`${baseUrl}/funding-rates/history${buildQuery(query)}`, { headers }).then(
        (res) => res.json() as Promise<Envelope<Record<string, unknown>>>,
      ),
    getFundingIntervals: (query: FundingIntervalsQuery = {}) =>
      fetchImpl(`${baseUrl}/funding-intervals${buildQuery(query)}`, { headers }).then(
        (res) => res.json() as Promise<Envelope<Record<string, unknown>>>,
      ),
    getFundingOpportunities: (query: FundingOpportunitiesQuery = {}) =>
      fetchImpl(`${baseUrl}/funding-opportunities${buildQuery(query)}`, { headers }).then(
        (res) => res.json() as Promise<Envelope<Record<string, unknown>>>,
      ),
    getExchangesStatus: () =>
      fetchImpl(`${baseUrl}/exchanges/status`, { headers }).then(
        (res) => res.json() as Promise<Envelope<Record<string, unknown>>>,
      ),
  };
}
