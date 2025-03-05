import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '')
	
	return {
		define: {
			'process.env.PORT': env.VITE_PORT,
		},
		preview: {
			port: env.VITE_PORT || 80,
			allowedHosts: true
		},
		server: {
			port: env.VITE_PORT || 3001, 
			allowedHosts: true	
		},
		plugins: [
			react(),
			tailwindcss()
		],
	}
})
