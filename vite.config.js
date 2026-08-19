import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "VITE_");

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api/countries": {
          target: "https://api.restcountries.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/countries/, "/countries/v5"),
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyRequest) => {
              proxyRequest.setHeader(
                "Authorization",
                `Bearer ${env.VITE_COUNTRIES_API_KEY}`,
              );
            });
          },
        },
      },
    },
  };
});
