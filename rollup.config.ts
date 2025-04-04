import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import { dts } from 'rollup-plugin-dts'

import packageJson from './package.json'

const config = [
  {
    input: 'index.ts', // Your main entry file
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      // Resolve node modules
      resolve(),

      // Convert CommonJS modules to ES6
      commonjs(),

      // Compile TypeScript
      typescript({
        tsconfig: './tsconfig.json',
      }),

      // Minify the output
      terser(),
    ],
    // Mark these as external dependencies
    external: ['react', 'react-dom', 'next'],
  },
  // Generate TypeScript declaration files
  {
    input: 'index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
]

export default config
