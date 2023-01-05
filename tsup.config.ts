import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/index.ts'],
	splitting: true,
	silent: true,
	format: ['esm', 'cjs'],
	target: 'node18',
	sourcemap: true,
	clean: true,
})
