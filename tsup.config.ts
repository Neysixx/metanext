import { defineConfig } from 'tsup';

export default defineConfig({
	entry: {
		index: 'src/index.ts',
		next: 'src/next/index.ts',
		cli: 'src/cli/index.ts',
	},
	format: ['cjs', 'esm'],
	dts: true,
	clean: true,
	sourcemap: true,
	minify: false,
	target: 'es2022',
	external: ['next', 'react'],
});
