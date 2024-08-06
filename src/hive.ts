export function createHiveClient(apiRoot: string, headers: any, fetch = globalThis.fetch) {
  return {
    createDevAccount: () => {
      return fetch(`${apiRoot}/create-dev-account`, {
        method: 'POST',
        headers: headers,
      }).then((res) => res.json());
    },
    getAccountInfo: () => {
      return fetch(`${apiRoot}/get-acc-info`, {
        method: 'POST',
        headers: headers,
      }).then((res) => res.json());
    },
    // add more endpoints here
  }
}