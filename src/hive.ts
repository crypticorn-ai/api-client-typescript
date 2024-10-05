export interface ErrorResponse {
  error: string;
  type?: string;
}

export interface AccountInfoResponse {
  api_key: boolean;
  joined: string;
  models: ModelInfoShortResponse[];
  user_id: string;
  username: string;
}

export interface ModelInfoResponse {
  coin_id: number;
  correlation: number;
  correlations: number[];
  created: string;
  id: number;
  name: string;
  status: string;
  target: string;
  updated: string;
  ranks: Record<string, string>;
}

export interface ModelInfoShortResponse {
  b_correlation: number;
  a_name: string;
  coin: number;
  target: string;
}

export interface GenerateApiKeyResponse {
  api_key: string;
  message: string;
}

export interface EvaluateModelResponse {
  metrics: Record<string, number>;
  model_id: number;
}

export interface HelpResponse {
  dashboard: string;
  documentation: string;
  support: string;
}

export type DataInfoResponse = Record<string, Record<string, string[]>>;

export interface CreateModelResponse {
  id: number;
  name: string;
  coin_id: number;
  target: string;
  status: string;
  created: string;
}

export type HiveApiResponse<T> = T | ErrorResponse;

export function createHiveClient(
  apiRoot: string,
  headers: Record<string, string>,
  fetch = globalThis.fetch
) {
  const baseUrl = apiRoot;

  return {
    createAccount: (username: string): Promise<HiveApiResponse<number>> => {
      return fetch(`${baseUrl}/account?username=${username}`, {
        method: "POST",
        headers: headers,
      }).then((res) => res.json());
    },

    updateUsername: (username: string): Promise<HiveApiResponse<number>> => {
      return fetch(`${baseUrl}/account?username=${username}`, {
        method: "PATCH",
        headers: headers,
      }).then((res) => res.json());
    },

    getAccountInfo: (
      username: string
    ): Promise<HiveApiResponse<AccountInfoResponse>> => {
      return fetch(
        `${baseUrl}/account?username=${encodeURIComponent(username)}`,
        {
          method: "GET",
          headers: headers,
        }
      ).then((res) => res.json());
    },

    getModel: (modelId: number): Promise<HiveApiResponse<ModelInfoResponse>> => {
      return fetch(`${baseUrl}/model?id=${modelId}`, {
        method: "GET",
        headers: headers,
      }).then((res) => res.json());
    },

    getLeaderboard: (): Promise<HiveApiResponse<ModelInfoShortResponse[]>> => {
      return fetch(`${baseUrl}/leaderboard`, {
        method: "GET",
        headers: headers,
      }).then((res) => res.json());
    },

    generateApiKey: (): Promise<HiveApiResponse<GenerateApiKeyResponse>> => {
      return fetch(`${baseUrl}/apikey`, {
        method: "POST",
        headers: headers,
      }).then((res) => res.json());
    },

    deleteApiKey: (): Promise<HiveApiResponse<number>> => {
      return fetch(`${baseUrl}/apikey`, {
        method: "DELETE",
        headers: headers,
      }).then((res) => res.json());
    },

    getHelp: (): Promise<HiveApiResponse<HelpResponse>> => {
      return fetch(`${baseUrl}/help`, {
        method: "GET",
        headers: headers,
      }).then((res) => res.json());
    },

    getDataInfo: (): Promise<HiveApiResponse<DataInfoResponse>> => {
      return fetch(`${baseUrl}/data-version`, {
        method: "GET",
        headers: headers,
      }).then((res) => res.json());
    },

    createModel: (
      coin_id: number,
      target: string
    ): Promise<HiveApiResponse<CreateModelResponse>> => {
      return fetch(`${baseUrl}/model/creation`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ coin_id, target }),
      }).then((res) => res.json());
    },

    evaluateModel: (
      id: number,
      data: any
    ): Promise<HiveApiResponse<EvaluateModelResponse>> => {
      return fetch(`${baseUrl}/model/evaluation?id=${id}`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((res) => res.json());
    },

    downloadData: (
      model_id: number,
      version?: number,
      feature_size?: string
    ): Promise<HiveApiResponse<number>> => {
      const params = new URLSearchParams({
        model_id: model_id.toString(),
        ...(version && { version: version.toString() }),
        ...(feature_size && { feature_size }),
      });
      return fetch(`${baseUrl}/data?${params}`, {
        method: "GET",
        headers: headers,
      }).then((res) => res.status);
    },

    getDataVersion: (): Promise<HiveApiResponse<DataInfoResponse>> => {
      return fetch(`${baseUrl}/data-version`, {
        method: "GET",
        headers: headers,
      }).then((res) => res.json());
    },
  };
}
