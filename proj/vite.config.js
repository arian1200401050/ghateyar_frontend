import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '')
	
	return {
		define: {
			'process.env.PORT': env.VITE_PORT,
			'process.env.REACT_ENV': env.REACT_ENV ? `'${env.REACT_ENV}'` : "'production'",
			'process.env.REACT_CKEDITOR_LICENSE_KEY': env.REACT_CKEDITOR_LICENSE_KEY ? `'${env.REACT_CKEDITOR_LICENSE_KEY}'` : "",
		},
		preview: {
			port: env.VITE_PORT || 80,
			allowedHosts: true,
		},
		server: {
			port: env.VITE_PORT || 3000, 
			allowedHosts: true,
		},
		plugins: [
			react(),
			tailwindcss()
		],
	}
})
