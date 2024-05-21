export type EnvironmentType = "local" | "dev" | "prod";

export const environments: Record<EnvironmentType, string> = {
  // local development
  local: "localhost",
  // development
  dev: "api.crypticorn.dev",
  // production
  prod: "api.crypticorn.com",
};

export function getHosts({
  environment,
  host = environments[environment],
  version,
}: {
  environment: EnvironmentType;
  host?: string;
  version?: string;
}) {
  let apiRoot = `https://${host}/${version}`;
  let wsRoot = `wss://${host}/${version}/ws`;

  if (host.includes("localhost")) {
    apiRoot = `http://${host}/${version}`;
    wsRoot = `ws://${host}/${version}/ws`;
  }

  return { apiRoot, wsRoot };
}
