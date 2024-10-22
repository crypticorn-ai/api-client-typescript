export type AccountInfo = {
  api_key: boolean;
  models: SingleModel[];
  user_id: string;
  username: string;
  updated: string;
  created: string;
}

export type SingleModel = {
  coin_id: number;
  correlation: number;
  correlations: number[];
  created: string;
  id: number;
  name: string;
  status: string;
  target: string;
  updated: string;
  dev_id: string;
}

export type AllModels = {
  models: SingleModel[];
}

export type ApiKeyGeneration = {
  api_key: string;
}

export type ModelEvaluation = {
  metrics: Record<string, number>;
  model_id: number;
}

export type DataInfo = {
  data: Record<string, Record<string, string[]>>;
  coins: number[];
  targets: string[];
}

export type DataDownload = {
  coin: number;
  feature_size: string;
  version: number;
  target: string;
  X_train: string;
  X_test: string;
  y_test: string;
}

export function createHiveClient(
  apiRoot: string,
  headers: Record<string, string>,
  fetch = globalThis.fetch
) {
  const baseUrl = apiRoot;

  return {
    createAccount: (username?: string): Promise<number> => {
      const params = new URLSearchParams({
        ...(username && { username: encodeURIComponent(username) }),
      });
      return fetch(`${baseUrl}/account?${params}`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
      }).then((res) => res.json());
    },

    updateUsername: (username: string): Promise<number> => {
      return fetch(`${baseUrl}/account?username=${username}`, {
        method: "PATCH",
        headers: headers,
      }).then((res) => res.json());
    },

    getAccountInfo: (
      username?: string,
      id?: string
    ): Promise<AccountInfo> => {
      const params = new URLSearchParams({
        ...(username && { username: encodeURIComponent(username) }),
        ...(id && { id: id }),
      });
      return fetch(`${baseUrl}/account?${params}`, {
        method: "GET",
        headers: headers,
      }).then((res) => res.json());
    },

    getModel: (modelId: number): Promise<SingleModel> => {
      return fetch(`${baseUrl}/model?id=${modelId}`, {
        method: "GET",
        headers: headers,
      }).then((res) => res.json());
    },

    getModels: (): Promise<AllModels> => {
      return fetch(`${baseUrl}/model`, {
        method: "GET",
        headers: headers,
      }).then((res) => res.json());
    },

    deleteModel: (modelId: number): Promise<number> => {
      return fetch(`${baseUrl}/model?id=${modelId}`, {
        method: "DELETE",
        headers: headers,
      }).then((res) => res.json());
    },

    generateApiKey: (): Promise<ApiKeyGeneration> => {
      return fetch(`${baseUrl}/apikey`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
      }).then((res) => res.json());
    },

    deleteApiKey: (): Promise<number> => {
      return fetch(`${baseUrl}/apikey`, {
        method: "DELETE",
        headers: headers,
      }).then((res) => res.json());
    },

    getDataInfo: (): Promise<DataInfo> => {
      return fetch(`${baseUrl}/data/info`, {
        method: "GET",
        headers: headers,
      }).then((res) => res.json());
    },

    createModel: (
      coin_id: number,
      target: string
    ): Promise<SingleModel> => {
      return fetch(`${baseUrl}/model/creation?coin_id=${coin_id}&target=${target}`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
      }).then((res) => res.json());
    },

    evaluateModel: (
      id: number,
      data: any
    ): Promise<ModelEvaluation> => {
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
    ): Promise<DataDownload> => {
      const params = new URLSearchParams({
        model_id: model_id.toString(),
        ...(version && { version: version.toString() }),
        ...(feature_size && { feature_size: feature_size }),
      });
      return fetch(`${baseUrl}/data?${params}`, {
        method: "GET",
        headers: headers,
      }).then((res) => res.json());
    },
  };
}
