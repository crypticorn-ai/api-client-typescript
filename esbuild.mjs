import esbuild from 'esbuild'

// build client
await esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  platform: 'browser',
  outfile: 'dist/index.js',
  format: 'esm',
  target: 'es2020', // Explicitly set target for better compatibility
  define: {
  },
  // Add source map for better debugging (optional)
  // sourcemap: true,
  // Add legal comments preservation (optional)
  // legalComments: 'none',
})
