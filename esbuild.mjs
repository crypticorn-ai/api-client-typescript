import esbuild from 'esbuild'

// build client
await esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  platform: 'browser',
  outfile: 'dist/index.js',
  format: 'esm',
  define: {
  },
})
