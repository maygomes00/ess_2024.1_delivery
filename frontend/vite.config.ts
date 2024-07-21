// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import istanbul from "vite-plugin-istanbul";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     istanbul({
//       cypress: true,
//       requireEnv: false,
//     }),
//   ],
//   server: {
//     port: 3000,
//   },
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import istanbul from "vite-plugin-istanbul";
import history from "connect-history-api-fallback";
import { Plugin } from 'vite';

// Crie um plugin para o history fallback
const historyFallback = (): Plugin => {
  return {
    name: 'single-page-application-middleware',
    configureServer(server) {
      server.middlewares.use(
        history({
          // Verifique se a solicitação não é um arquivo estático
          disableDotRule: true,
          // Redirecione todas as solicitações para o index.html
          htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
        })
      );
    }
  };
};

export default defineConfig({
  plugins: [
    react(),
    istanbul({
      cypress: true,
      requireEnv: false,
    }),
    historyFallback()  // Adicione o plugin personalizado aqui
  ],
  server: {
    port: 3000,
  },
});

