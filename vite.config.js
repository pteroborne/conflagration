import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from "path";

const config = {
	resolve: {
		alias: {
			'$lib': path.resolve('./src/lib/'),
			'$base': path.resolve('./src/baseApp'),
		},
	},
	plugins: [sveltekit()]
};

export default config;