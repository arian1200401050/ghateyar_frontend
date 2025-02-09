import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '')
	
	return {
		define: {
			'process.env.PUBLIC_DIR': JSON.stringify(env.VITE_PUBLIC_DIR),
			'process.env.PORT': env.VITE_PORT,
		},
		preview: {
			port: env.VITE_PORT || 80,
		},
		server: {
			port: env.VITE_PORT || 3001, 
		},
		plugins: [react()],
	}
})
