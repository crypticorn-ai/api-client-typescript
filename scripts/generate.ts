/// <reference types="node" />
import { createClient } from "@hey-api/openapi-ts";
import minimist from "minimist";

const args = minimist(process.argv.slice(2));
const service = args["service"];
const services = [
  "trade",
  "pay",
  // "auth", npm package
  "metrics",
  "hive",
  "dex",
  "notification",
  "all",
];
if (!service || !services.includes(service)) {
  console.error(`Invalid service: ${service}`);
  console.error("Valid services are:");
  services.forEach((s) => console.error(`  - ${s}`));
  process.exit(1);
}
const environment = args["env"] || "local";
const environments = ["local", "dev", "prod"];
if (!environment || !environments.includes(environment)) {
  console.error(`Invalid environment: ${environment}`);
  console.error("Valid environments are:");
  environments.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}
const version = args["version"] || "v1";
const versions = ["v1", "v2"];
if (!version || !versions.includes(version)) {
  console.error(`Invalid version: ${version}`);
  console.error("Valid versions are:");
  versions.forEach((v) => console.error(`  - ${v}`));
  process.exit(1);
}
const host =
  environment === "local"
    ? "http://localhost"
    : environment === "dev"
      ? "https://api.crypticorn.dev"
      : "https://api.crypticorn.com";

// if you run this script the first time for a service, comment out lines 20-62 (might not be needed)

async function generateForService(serviceName: string) {
  try {
    // get path from args
    // @ts-ignore
    const path = `${host}/${version}/${serviceName}/openapi.json`;
    await createClient({
      input: {
        path,
      },
      output: {
        lint: null,
        path: `src/${serviceName}`,
      },
      plugins: [
        '@hey-api/sdk',
        '@hey-api/typescript',
        '@hey-api/schemas'
      ],
    }).catch((err) => {
      console.error("Could not find openapi.json file at path:", path);
      throw err;
    });


    console.log(`Client generation complete for ${serviceName}!`);
  } catch (error) {
    console.error(`Error generating client for ${serviceName}:`, error);
    throw error;
  }
}

async function main() {
  try {
    if (service === "all") {
      // Generate for all services except "all"
      const servicesToGenerate = services.filter(s => s !== "all");
      for (const serviceName of servicesToGenerate) {
        console.log(`Generating client for ${serviceName}...`);
        await generateForService(serviceName);
      }
    } else {
      await generateForService(service);
    }
    
    
    console.log(
      `
=========================================================
If you are adding a new module, you need to do the following:
- Edit the generated src/index.ts file to export the new module.
- Edit the src/api.ts file to add the new module to the return type of the createClient function.
=========================================================
`
    );
  } catch (error) {
    console.error("Error generating client:", error);
  }
}

main();
