import { sveltekit } from '@sveltejs/kit/vite';

const config = {
	plugins: [sveltekit()],
	kit: {
		// ...
		vite: {
			ssr: {
				noExternal: ['chart.js/**']
			}
		}
	}
};

export default config;
