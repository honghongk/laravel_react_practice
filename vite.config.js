import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';



// https://laravel.com/docs/10.x/vite#installing-node
export default defineConfig({
    server:{
        host: '0.0.0.0',
        // host: false,
        port: 30373,

        https: false,
        // https: { 
        //     key: fs.readFileSync(`/path/to/${host}.key`), 
        //     cert: fs.readFileSync(`/path/to/${host}.crt`), 
        // }, 
        strictPort: true,
        hmr: {
            host: '192.168.40.163',
            protocol: 'ws'
        },

        // watch: {
        //     usePolling: true
        // }
        
    },
    // build: {
    //     rollupOptions:{
    //         output: {
    //             entryFileNames: `[name]` + hash + `.js`,
    //             chunkFileNames: `[name]` + hash + `.js`,
    //             assetFileNames: `[name]` + hash + `.[ext]`
    //         }
    //     }
    // },
    plugins: [
        laravel({
            buildDirectory: "js",
            input: [
                'resources/sass/app.scss',
                'resources/js/app.js',
                'resources/js/components/Example.jsx',
            ],
            refresh: [{
                paths: ['resources/**'],
                delay: 300,
            }],
        }),
        react(),
    ],
});
