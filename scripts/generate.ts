/// <reference types="node" />
import { createClient } from '@hey-api/openapi-ts'
import prettier from 'prettier'
import fs from 'fs/promises'

const service = process.argv[2]
if (!service) {
  console.error('Usage: pnpm run generate <service>')
  process.exit(1)
}

// if you run this script the first time for a service, comment out lines 20-62

async function main() {
  try {
    // get path from args
    // @ts-ignore
    const path = `http://localhost/v1/${service}/openapi.json`
    const res = await createClient({
      // @ts-ignore
      client: '@hey-api/client-fetch',
      // plugins: ['@hey-api/client-fetch'], 
      input: path,
      output: `src/${service}`,
    });

    // @ts-ignore
    const ops = res[0].operations.map((op) => op.name)

    // read sdk.gen.ts
    let sdkGen = await fs.readFile(`src/${service}/sdk.gen.ts`, 'utf8')

    // remove line export const client = createClient(createConfig());
    sdkGen = sdkGen.replace("export const client = createClient(createConfig());\n", '')

    // replace "import { createClient" with "import { createClient as createNativeClient"
    sdkGen = sdkGen.replace("import { createClient", "import { createClient as createNativeClient")

    // replace all "export " with ""
    sdkGen = sdkGen.replace(/export /g, '')

    // split into imports (first 4 lines) and rest
    const imports = sdkGen.split('\n').slice(0, 4).join('\n')
    const rest = sdkGen.split('\n').slice(4).join('\n')

    const tsTemplate = /*ts*/`
    ${imports}
export function createClient(
  baseUrl: string,
  headers: any,
  fetch = globalThis.fetch
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
${ops.map((op) => `    ${op},`).join('\n')}
  }
}
  `
    await fs.writeFile(`src/${service}/sdk.gen.ts`, tsTemplate)

    // format files with prettier
    const files = [`src/${service}/sdk.gen.ts`, `src/${service}/schemas.gen.ts`, `src/${service}/types.gen.ts`]
    for (const file of files) {
      const formatted = await prettier.format(await fs.readFile(file, 'utf8'), { parser: 'typescript' })
      await fs.writeFile(file, formatted)
    }

    console.log('Client generation complete!')
  } catch (error) {
    console.error('Error generating client:', error)
  }
}

main()
