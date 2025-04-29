/// <reference types="node" />
import { createClient } from "@hey-api/openapi-ts";
import prettier from "prettier";
import fs from "fs/promises";
import minimist from "minimist";

const args = minimist(process.argv.slice(2));
const service = args["service"];
const services = [
  "klines",
  "trade",
  "pay",
  "auth",
  "token",
  "sentiment",
  "metrics",
  "hive",
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
const host =
  environment === "local"
    ? "http://localhost"
    : environment === "dev"
      ? "https://api.crypticorn.dev"
      : "https://api.crypticorn.com";

// if you run this script the first time for a service, comment out lines 20-62 (might not be needed)

async function main() {
  try {
    // get path from args
    // @ts-ignore
    const path = `${host}/v1/${service}/openapi.json`;
    const res = await createClient({
      // @ts-ignore
      client: "@hey-api/client-fetch",
      input: {
        path,
      },
      output: {
        path: `src/${service}`,
      },
    }).catch((err) => {
      console.error("Could not find openapi.json file at path:", path);
      process.exit(1);
    });

    // @ts-ignore
    const ops = res[0].operations.map((op) => op.name);

    // read sdk.gen.ts
    let sdkGen = await fs.readFile(`src/${service}/sdk.gen.ts`, "utf8");

    // remove line export const client = createClient(createConfig());
    sdkGen = sdkGen.replace(
      "export const client = createClient(createConfig());\n",
      ""
    );

    // replace "import { createClient" with "import { createClient as createNativeClient"
    sdkGen = sdkGen.replace(
      "createClient,",
      "createClient as createNativeClient,"
    );

    // Remove all "export " keywords (but preserve named functions/consts)
    sdkGen = sdkGen.replace(/\bexport\s+/g, "");

    // Now find all import statements robustly
    const importRegex = /^import[\s\S]+?from\s+["'][^"']+["'];?/gm;
    const imports = sdkGen.match(importRegex)?.join("\n\n").trim() ?? "";
    const rest = sdkGen.replace(importRegex, "").trim();

    const tsTemplate = /* ts */ `
${imports}

export function createClient(
  baseUrl: string,
  headers: any,
  fetch = globalThis.fetch,
) {
  const client = createNativeClient(
    createConfig({
      baseUrl,
      fetch,
      headers,
    })
  );

  ${rest}

  return {
${ops.map((op) => `    ${op},`).join("\n")}
  };
}
`;

    await fs.writeFile(`src/${service}/sdk.gen.ts`, tsTemplate);

    // format files with prettier
    const files = [
      `src/${service}/sdk.gen.ts`,
      `src/${service}/schemas.gen.ts`,
      `src/${service}/types.gen.ts`,
    ];
    for (const file of files) {
      const formatted = await prettier.format(await fs.readFile(file, "utf8"), {
        parser: "typescript",
      });
      await fs.writeFile(file, formatted);
    }

    console.log("Client generation complete!");
    console.log(`!!! Remember to run: pnpm run build`);
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
