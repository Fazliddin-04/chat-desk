import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'

const config = {
  input: './src/main.js',
  output: {
    file: './build/bundle.min.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [resolve(), commonjs(), terser()],
}

export default config
