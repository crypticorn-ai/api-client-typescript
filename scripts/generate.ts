import { createClient } from '@hey-api/openapi-ts'
import prettier from 'prettier'
// @ts-ignore
import fs from 'fs/promises'

async function main() {
  try {
    // get path from args
    // @ts-ignore
    const path = process.argv[2] || 'http://localhost/v1/trade/openapi.json'
    const res = await createClient({
      client: '@hey-api/client-fetch',
      input: path,
      output: 'src/trade',
    });

    // @ts-ignore
    const ops = res[0].operations.map((op) => op.name)

    // read sdk.gen.ts
    let sdkGen = await fs.readFile('src/trade/sdk.gen.ts', 'utf8')

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
    await fs.writeFile('src/trade/sdk.gen.ts', tsTemplate)

    // format files with prettier
    const files = ['src/trade/sdk.gen.ts', 'src/trade/schemas.gen.ts', 'src/trade/types.gen.ts']
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