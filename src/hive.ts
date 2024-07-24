export function createHiveClient(apiRoot: string, headers: any) {
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