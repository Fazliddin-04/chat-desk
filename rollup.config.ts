import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import alias from '@rollup/plugin-alias'
import path from 'path'

const config = {
  input: './index.ts',
  output: {
    file: './dist/index.js',
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    alias({
      entries: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    }),
    typescript({
      tsconfig: './tsconfig.json',
    }),
    resolve(),
    commonjs(),
    terser(),
  ],
  external: ['react', 'react-dom'],
}

export default config
